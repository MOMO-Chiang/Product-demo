using Newtonsoft.Json;
using NPOI.Util;
using PaymentFlowAnalysis.Common.Constants;
using PaymentFlowAnalysis.Common.Securities;
using PaymentFlowAnalysis.Common.Utilities;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Core.UnitOfWork;
using PaymentFlowAnalysis.Service.Models;
using PaymentFlowAnalysis.Service.Services.Interfaces;
using PaymentFlowAnalysis.Web.Helpers;
using PaymentFlowAnalysis.Web.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace PaymentFlowAnalysis.Web.Controllers
{
    [RoutePrefix("api/cryptopersonalinfo")]
    public class CryptoPersonalInfoController : ApiController
    {
        private readonly ICryptoQueryMasterService _cryptoQueryMasterService;
        private readonly ICryptoQueryDetailService _cryptoQueryDetailService;
        private readonly ICryptoPersonalInfoPhoneService _cryptoPersonalInfoPhoneService;
        private readonly ICryptoPersonalInfoWalletService _cryptoPersonalInfoWalletService;
        private readonly ICryptoPersonalInfoIPService _cryptoPersonalInfoIPService;
        private readonly ICryptoPersonalInfoPictureService _cryptoPersonalInfoPictureService;
        private readonly ICryptoPersonalInfoService _cryptoPersonalInfoService;
        private readonly IUnitOfWork _unitOfWork;
        public CryptoPersonalInfoController(ICryptoQueryMasterService cryptoQueryMasterService, ICryptoQueryDetailService cryptoQueryDetailService, ICryptoPersonalInfoPhoneService cryptoPersonalInfoPhoneService, ICryptoPersonalInfoWalletService cryptoPersonalInfoWalletService, ICryptoPersonalInfoIPService cryptoPersonalInfoIPService, ICryptoPersonalInfoPictureService cryptoPersonalInfoPictureService, ICryptoPersonalInfoService cryptoPersonalInfoService, IUnitOfWork unitOfWork)
        {
            _cryptoQueryMasterService = cryptoQueryMasterService;
            _cryptoQueryDetailService = cryptoQueryDetailService;
            _cryptoPersonalInfoPhoneService = cryptoPersonalInfoPhoneService;
            _cryptoPersonalInfoWalletService = cryptoPersonalInfoWalletService;
            _cryptoPersonalInfoIPService = cryptoPersonalInfoIPService;
            _cryptoPersonalInfoPictureService = cryptoPersonalInfoPictureService;
            _cryptoPersonalInfoService = cryptoPersonalInfoService;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("normal")]
        public IHttpActionResult Get([FromUri] CryptoQueryMasterAPIQueryParams queryParams)
        {
            CryptoQueryMasterSearchModel queryModel = new CryptoQueryMasterSearchModel
            {
                CaseNo = queryParams.CaseNo,
                SearchType = queryParams.SearchType,
                _OrderMasterNumber = queryParams.OrderMasterNumber
            };

            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };


            var totalList = new List<CryptoQueryDetailSearchModel>();
            string[] MasterNumberArr;
            int detailDataCount;

            //有輸入條件
            if (queryParams.Phone != null || queryParams.WallerAddress != null || queryParams.AccountID != null || queryParams.BankAccount != null || queryParams.Name != null || queryParams.Email != null || queryParams.IdCardNum != null || queryParams.IsCaseMark != null)
            {
                //條件有電話
                if (queryParams.Phone != null)
                {
                    CryptoPersonalInfoPhoneSearchModel queryModel_phone = new CryptoPersonalInfoPhoneSearchModel
                    {
                        Phone = queryParams.Phone
                    };
                    //先去找有這筆電話的OrderNumber
                    var PhoneList = _cryptoPersonalInfoPhoneService.GetPaginatedResult(queryModel_phone);

                    //把結果存入totalList
                    foreach (var phone in PhoneList)
                    {
                        CryptoQueryDetailSearchModel PhoneToDetail = new CryptoQueryDetailSearchModel
                        {
                            OrderNumber = phone.OrderNumber,
                            Phone = phone.Phone,

                        };
                        totalList.Add(PhoneToDetail);
                    }
                }
                //條件有錢包地址
                if (queryParams.WallerAddress != null)
                {
                    CryptoPersonalInfoWalletSearchModel queryModel_wallerAddress = new CryptoPersonalInfoWalletSearchModel
                    {
                        WallerAddress = queryParams.WallerAddress
                    };
                    //先去找有這筆錢包地址的OrderNumber
                    var WalletList = _cryptoPersonalInfoWalletService.GetPaginatedResult(queryModel_wallerAddress, paginated);

                    foreach (var wallet in WalletList)
                    {
                        CryptoQueryDetailSearchModel WalletToDetail = new CryptoQueryDetailSearchModel
                        {
                            OrderNumber = wallet.OrderNumber,
                            WallerAddress = wallet.WallerAddress,
                        };
                        totalList.Add(WalletToDetail);
                    }
                }

                //個資搜尋條件
                CryptoQueryDetailSearchModel queryModel_PersonalInfo = new CryptoQueryDetailSearchModel
                {
                    AccountID = queryParams.AccountID,
                    Name = queryParams.Name,
                    BankAccount = queryParams.BankAccount,
                    Email = queryParams.Email,
                    IdCardNum = queryParams.IdCardNum,
                    IsCaseMark = queryParams.IsCaseMark
                };

                //先去找PersonalInfo有這些條件的OrderNumber
                var PersonalInfoList = _cryptoPersonalInfoService.GetPersonalInfoResult(queryModel_PersonalInfo);

                foreach (var personalInfo in PersonalInfoList)
                {
                    CryptoQueryDetailSearchModel PersonalinfoToDetail = new CryptoQueryDetailSearchModel
                    {
                        OrderNumber = personalInfo.OrderNumber
                    };
                    totalList.Add(PersonalinfoToDetail);
                }


                //過濾重複MasterNumber
                var distinctOrderNumber = totalList.GroupBy(x => x.OrderNumber).Select(y => y.First());

                string[] DetailNumberArr = distinctOrderNumber.Select(p => p.OrderNumber).ToArray(); //這邊的是明細的

                List<string> list = new List<string>();
                foreach (var item in DetailNumberArr)
                {
                    if (item.Length >= 22)
                    {
                        list.Add(item.Substring(0, 22));
                    }
                    else list.Add(item);
                }
                MasterNumberArr = list.ToArray(); //主調閱單號
                //    MasterNumberArr = string.Join(",", distinctItems.Select(x => x.OrderMasterNumber.Split('-')[0])).Split(','); //做成陣列 //MJIB-20220906084202744-1 

                CryptoQueryMasterSearchModel queryModel_ParamsMaster = new CryptoQueryMasterSearchModel
                {
                    CaseNo = queryParams.CaseNo,
                    SearchType = queryParams.SearchType,
                    OrderMasterNumber = MasterNumberArr
                };

                //查詢主序號
                var HasParamsResult = _cryptoQueryMasterService.GetSearchParams(queryModel_ParamsMaster, paginated);

                CryptoQueryDetailSearchModel OnlyDetailNumber = new CryptoQueryDetailSearchModel
                {
                    OrderDetailNumber = DetailNumberArr
                };

                //查詢調閱單號(以OrderDetailNumber)
                var PersonalResult = _cryptoQueryDetailService.GetParamsResult(OnlyDetailNumber, paginated);

                //整理照片路徑加檔案名稱
                string PersonalInfoIP = ConfigurationManager.AppSettings["PictureURL"];
                foreach (var info in PersonalResult.Data)
                {
                    info.PictureSubPath = PersonalInfoIP + "image/" + info.PictureSubPath + "/" + info.PictureFileName;
                }

                //依照MasterNumber來塞入對應的DetailData
                foreach (var item in HasParamsResult.Data)
                {
                    item.QueryStatusCount = PersonalResult.Data.Where(x => x.OrderMasterNumber == item.OrderMasterNumber && x.QueryStatus == "資料已回覆").Count();
                    item.DetailData = JsonConvert.SerializeObject(PersonalResult.Data.Where(x => x.OrderMasterNumber == item.OrderMasterNumber && x.IdCardNum != null).ToArray());
                }

                return Ok(HasParamsResult);
            }
            else
            {
                //先查詢主序號 
                var result = _cryptoQueryMasterService.GetPaginatedResult(queryModel, paginated);
                foreach (var data in result.Data)
                {
                    CryptoQueryDetailSearchModel queryModel_D = new CryptoQueryDetailSearchModel
                    {
                        OrderMasterNumber = data.OrderMasterNumber,
                        AccountID = queryParams.AccountID,
                        Phone = queryParams.Phone,
                        Name = queryParams.Name,
                        Email = queryParams.Email,
                        BankAccount = queryParams.BankAccount,
                        WallerAddress = queryParams.WallerAddress,
                        IdCardNum = queryParams.IdCardNum,
                    };
                    //查詢主序號底下的序號
                    var personalInfo = _cryptoQueryDetailService.SearchPaginatedQuery(queryModel_D, paginated);
                    string PersonalInfoIP = ConfigurationManager.AppSettings["PictureURL"];
                    foreach (var info in personalInfo.Data)
                    {
                        info.PictureSubPath = PersonalInfoIP + "image/" + info.PictureSubPath + "/" + info.PictureFileName;
                    }
                    data.QueryStatusCount = personalInfo.Data.Where(x => x.QueryStatus == "資料已回覆").Count(); //資料回覆比數type=2
                    data.DetailData = JsonConvert.SerializeObject(personalInfo.Data.ToArray());
                }
                if (result.Data.Count() == 0)
                {
                    result.Data = null;
                    return Ok(result);
                }
                //detailDataCount = result.Data.FirstOrDefault().DetailData.Length; //無資料,DetailData長度為2。 (2個字元)
                //if (detailDataCount != 0 && detailDataCount == 2)
                //{
                //    result.Data = null;
                //}
                return Ok(result);
            }
        }

        [HttpGet, Route("normal/export/excel")]
        public IHttpActionResult ExportExcel([FromUri] CryptoQueryMasterAPIQueryParams queryParams)
        {
            CryptoQueryMasterServiceModel queryServiceModel = new CryptoQueryMasterServiceModel
            {
                CaseNo = queryParams.CaseNo,
                SearchType = queryParams.SearchType,
                AccountID = queryParams.AccountID,
                Name = queryParams.Name,
                Phone = queryParams.Phone,
                Email = queryParams.Email,
                BankAccount = queryParams.BankAccount,
                WallerAddress = queryParams.WallerAddress,
                QueryUserId = queryParams.QueryUserId,
                IsCaseMark = queryParams.IsCaseMark,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };

            MemoryStream stream = _cryptoQueryMasterService.ExportExcel(queryServiceModel);
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(stream.ToArray())
            };

            httpResponseMessage.Content.Headers.ContentDisposition =
                new ContentDispositionHeaderValue("attachment")
                {
                    FileName = HttpUtility.UrlEncode("個資資料調閱.xlsx")
                };
            httpResponseMessage.Content.Headers.ContentType =
                new MediaTypeHeaderValue("application/vnd.ms-excel");

            return ResponseMessage(httpResponseMessage);
        }

        ///// <summary>
        ///// 取得歷史資料
        ///// </summary>
        ///// <param name="queryParams"></param>
        ///// <returns></returns>
        [HttpGet]
        [Route("history")]
        public IHttpActionResult History([FromUri] CryptoQueryMasterAPIQueryParams queryParams)
        {
            string userId = Request.GetUserIdFromToken();
            CryptoQueryMasterSearchModel queryModel = new CryptoQueryMasterSearchModel
            {
                CaseNo = queryParams.CaseNo,
                SearchType = "1",
                QueryUserId = userId
            };

            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };

            //先查詢主序號 
            var result = _cryptoQueryMasterService.GetPaginatedResult(queryModel, paginated);
            foreach (var data in result.Data)
            {
                CryptoQueryDetailSearchModel queryModel_D = new CryptoQueryDetailSearchModel
                {
                    OrderMasterNumber = data.OrderMasterNumber,
                    AccountID = queryParams.AccountID,
                    Phone = queryParams.Phone,
                    Name = queryParams.Name,
                    Email = queryParams.Email,
                    BankAccount = queryParams.BankAccount,
                    WallerAddress = queryParams.WallerAddress
                };
                //查詢主序號底下的序號
                var personalInfo = _cryptoQueryDetailService.SearchHistory(queryModel_D, paginated);
                data.QueryStatusCount = personalInfo.Data.Where(x => x.QueryStatus == "資料已回覆").Count(); //資料回覆比數type=2
                data.DetailData = JsonConvert.SerializeObject(personalInfo.Data.ToArray());
            }
            if (result.Data.Count() == 0)
            {
                result.Data = null;
                return Ok(result);
            }
            return Ok(result);
        }

        ///// <summary>
        ///// 取得彈窗資料
        ///// </summary>
        ///// <param name="queryParams"></param>
        ///// <returns></returns>
        [HttpPost]
        [Route("showmodal/{PersonalInfoId}/{type}")]
        public IHttpActionResult ShowModal(string PersonalInfoId, string type, CryptoQueryMasterAPIQueryParams queryParams)
        {
            try
            {
                if (PersonalInfoId == null)
                {
                    throw new OperationalException(
                            ErrorType.INVALID_ID,
                            "識別碼不得為空");
                }
                PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
                {
                    Page = queryParams.Page,
                    PageSize = queryParams.PageSize,
                    IsAll = queryParams.IsAll,
                    SortedType = queryParams.SortedType,
                    SortedColumn = queryParams.SortedColumn,
                };
                if (type == "phone")
                {
                    var phone = _cryptoPersonalInfoPhoneService.GetPhoneResult(PersonalInfoId, paginated);
                    return Ok(phone);
                }
                else if (type == "wallerAddress")
                {
                    var wallerAddress = _cryptoPersonalInfoWalletService.GetWallerAddressResult(PersonalInfoId, paginated);
                    return Ok(wallerAddress);
                }
                else if (type == "picture")
                {
                    var picture = _cryptoPersonalInfoPictureService.GetPictureResult(PersonalInfoId, paginated);
                    string PersonalInfoIP = ConfigurationManager.AppSettings["PictureURL"];
                    foreach (var data in picture.Data)
                    {
                        data.SubPath = PersonalInfoIP + "image/" + data.SubPath + "/" + data.FileName;
                    }
                    return Ok(picture);
                }
                else //type == "IP"
                {
                    var blackAccount = _cryptoPersonalInfoIPService.GetIPResult(PersonalInfoId, paginated);
                    return Ok(blackAccount);
                }
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        ///// <summary>
        ///// 取得調閱序號資料
        ///// </summary>
        ///// <param name="queryParams"></param>
        ///// <returns></returns>
        [HttpGet]
        [Route("SearchDetailNumber/{seq}")]
        public IHttpActionResult Get(string seq)
        {
            try
            {
                if (seq == null)
                {
                    throw new OperationalException(
                            ErrorType.INVALID_ID,
                            "識別碼不得為空");
                }
                var QueryDetail = _cryptoQueryDetailService.Get(seq);

                return Ok(QueryDetail);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        ///// <summary>
        ///// 本案相關帳戶
        ///// </summary>
        ///// <param name="queryParams"></param>
        ///// <returns></returns>
        [Route("{PersonalInfoId}/iscasemark")]
        [HttpPatch]
        public IHttpActionResult UpdateIsAccountMark([FromBody] bool IsCaseMark, string PersonalInfoId)
        {
            IsCaseMark = IsCaseMark ? true : false;
            _unitOfWork.CryptoPersonalInfoRepository.UpdateIsCaseMark(PersonalInfoId, IsCaseMark);
            return Ok();
        }
    }
}