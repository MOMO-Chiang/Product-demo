using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using PaymentFlowAnalysis.Common.Constants;
using PaymentFlowAnalysis.Common.Securities;
using PaymentFlowAnalysis.Common.Utilities;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Core.UnitOfWork;
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
using System.Text;
using System.Web.Http;
using System.Web.UI;

namespace PaymentFlowAnalysis.Web.Controllers
{
    [RoutePrefix("api/PersonalInfoSearch")]
    public class PersonalInfoSearchController : ApiController
    {
        private readonly IPersonalInfoSearchService _personalInfoSearchService;
        private readonly ISysUserListService _userListService;
        private readonly IUserFileService _userFileService;
        private readonly IUnitOfWork _unitOfWork;
        public PersonalInfoSearchController(IPersonalInfoSearchService personalInfoSearchService, ISysUserListService userListService, IUserFileService userFileService, IUnitOfWork unitOfWork)
        {
            _personalInfoSearchService = personalInfoSearchService;
            _userListService = userListService;
            _userFileService = userFileService;
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult PostAsync([FromBody] PersonalInfoSearchCreationAPIQueryParams reqParams)
        {
            try
            {
                string resMsg = "";
                string url = "";
                string postBody = "";
                string userId = Request.GetUserIdFromToken();
                var sysuserList = _userListService.Get(userId);
                var File = _userFileService.GetByFileNo(reqParams.CaseNo);
                int DetailIndex = 1; //QueryDetail序號


                DateTime GetNowDateTimeDetail = new DateTime(0001, 01, 01, 01, 01, 01, 01);
                GetNowDateTimeDetail = DateTime.Now;
                string strTime = GetNowDateTimeDetail.ToString("yyyyMMddhhmmssfff");
                string[] QueryConditionInfo = reqParams.QueryConditionInfo.Split('\n').Where(x => !string.IsNullOrEmpty(x)).ToArray();
                int DetailCount = QueryConditionInfo.Count() * 4;
                PersonalInfoSearch PersonalInfoSearch = new PersonalInfoSearch
                {
                    CaseNo = String.IsNullOrEmpty(reqParams.CaseNo) ? "" : reqParams.CaseNo,
                    CaseName = (File.Count() > 0) ? File.First().FileName : "",
                    OrderMasterNumber = "MJIB-" + strTime,
                    OrderDetailCount = DetailCount,
                    QueryConditionType = reqParams.QueryConditionType,
                    QueryUserId = reqParams.ActionUserId ?? userId,
                    QueryName = sysuserList.OrderUserName,
                    QueryPhone = sysuserList.OrderUserPhone,
                    QueryEmail = sysuserList.OrderUserEmail,
                    QueryRank = sysuserList.OrderUserRank,
                    QueryUnit = sysuserList.OrderUserUnit,
                    ProjectCategory = sysuserList.OrderUserProjectCategory,
                    SearchType = reqParams.SearchType,
                    ActionUserId = reqParams.ActionUserId != null ? reqParams.QueryUserId : null
                };

                //新增主序號 Master
                _personalInfoSearchService.InsertMaster(PersonalInfoSearch);

                for (int Agency = 1; Agency <= 4; Agency++)
                {
                    foreach (var item in QueryConditionInfo.Select((value, index) => new { value, index }))
                    {
                        PersonalInfoDetail DetailInfo = new PersonalInfoDetail
                        {
                            QueryUserId = userId,
                            RequestAgency = Agency,
                            QueryValue = item.value,
                            QueryConditionType = reqParams.QueryConditionType,
                            QueryStatus = 1,
                            OrderMasterNumber = PersonalInfoSearch.OrderMasterNumber,
                            OrderDetailNumber = PersonalInfoSearch.OrderMasterNumber + "-" + DetailIndex,
                            QueryName = sysuserList.OrderUserName,
                            QueryPhone = sysuserList.OrderUserPhone,
                            QueryEmail = sysuserList.OrderUserEmail,
                            QueryRank = sysuserList.OrderUserRank,
                            QueryUnit = sysuserList.OrderUserUnit,
                            ProjectCategory = sysuserList.OrderUserProjectCategory,
                            SearchType = reqParams.SearchType,
                        };

                        //新增序號 Detail

                        var InsertCount = _personalInfoSearchService.InsertDetail(DetailInfo);

                        if (InsertCount > 0) //明細有插入再處理後續
                        {
                            DetailIndex++;
                            string orderNumber = DetailInfo.OrderDetailNumber;


                            if (reqParams.SearchType == 1)  //type=1,個資拋查
                            {
                                PersonalInfoSearchAPI PersonalInfoSearchAPI = new PersonalInfoSearchAPI
                                {
                                    OrderNumber = DetailInfo.OrderDetailNumber,
                                    AccountInfo = new AccountInfo
                                    {
                                        Name = sysuserList.OrderUserName,
                                        Phone = sysuserList.OrderUserPhone,
                                        Email = sysuserList.OrderUserEmail,
                                        Rank = sysuserList.OrderUserRank,
                                        Unit = sysuserList.OrderUserUnit,
                                        Organization = "MJIB",
                                        CallbackUrl = "https://www.mjib.com.tw:8001/personalInfo"
                                    },
                                    ProjectCategory = sysuserList.OrderUserProjectCategory,
                                };
                                switch (DetailInfo.QueryConditionType)
                                {
                                    case 1:
                                        PersonalInfoSearchAPI.WalletAddress = item.value;
                                        break;
                                    case 2:
                                        PersonalInfoSearchAPI.InternalAccount = item.value;
                                        break;
                                    case 3:
                                        PersonalInfoSearchAPI.TransactionSquence = item.value;
                                        break;
                                    case 4:
                                        PersonalInfoSearchAPI.IdCardNumber = item.value;
                                        break;
                                    case 5:
                                        PersonalInfoSearchAPI.BankAccount = item.value;
                                        break;
                                    case 6:
                                        PersonalInfoSearchAPI.TxID = item.value;
                                        break;
                                    case 7:
                                        PersonalInfoSearchAPI.Phone = item.value;
                                        break;
                                    case 8:
                                        PersonalInfoSearchAPI.Email = item.value;
                                        break;
                                }
                                string PersonalInfoIP = ConfigurationManager.AppSettings["SearchURL"];
                                url = PersonalInfoIP + "personalInfo/_search";

                                //postBody = JsonConvert.SerializeObject(PersonalInfoSearchAPI);
                                postBody = JsonConvert.SerializeObject(PersonalInfoSearchAPI,
                               Newtonsoft.Json.Formatting.None,
                               new JsonSerializerSettings
                               {
                                   NullValueHandling = NullValueHandling.Ignore
                               });
                            }
                            else if (reqParams.SearchType == 2) //type=2,相關帳戶拋查(錢包地址反查)
                            {
                                PersonalInfoSearchAPI RelevantPersonalInfoSearchAPI = new PersonalInfoSearchAPI
                                {
                                    WalletAddress = reqParams.QueryConditionInfo,
                                    OrderNumber = DetailInfo.OrderDetailNumber,
                                    AccountInfo = new AccountInfo
                                    {
                                        Name = sysuserList.OrderUserName,
                                        Phone = sysuserList.OrderUserPhone,
                                        Email = sysuserList.OrderUserEmail,
                                        Rank = sysuserList.OrderUserRank,
                                        Unit = sysuserList.OrderUserUnit,
                                        Organization = "MJIB",
                                        CallbackUrl = "https://www.mjib.com.tw:8001/personalInfo"
                                    },
                                    ProjectCategory = sysuserList.OrderUserProjectCategory,
                                };

                                string PersonalInfoIP = ConfigurationManager.AppSettings["SearchURL"];
                                url = PersonalInfoIP + "personalInfo/_search_walletAddress";

                                //postBody = JsonConvert.SerializeObject(RelevantPersonalInfoSearchAPI);
                                postBody = JsonConvert.SerializeObject(RelevantPersonalInfoSearchAPI,
                               Newtonsoft.Json.Formatting.None,
                               new JsonSerializerSettings
                               {
                                   NullValueHandling = NullValueHandling.Ignore
                               });
                            }
                            else //type=3,交易拋查
                            {
                                PersonalInfoSearchAPI TransactionInfoSearchAPI = new PersonalInfoSearchAPI
                                {
                                    OrderNumber = DetailInfo.OrderDetailNumber,
                                    AccountInfo = new AccountInfo
                                    {
                                        Name = sysuserList.OrderUserName,
                                        Phone = sysuserList.OrderUserPhone,
                                        Email = sysuserList.OrderUserEmail,
                                        Rank = sysuserList.OrderUserRank,
                                        Unit = sysuserList.OrderUserUnit,
                                        Organization = "MJIB",
                                        CallbackUrl = "https://www.mjib.com.tw:8001/transactionInfo"
                                    },
                                    ProjectCategory = sysuserList.OrderUserProjectCategory,
                                };
                                switch (DetailInfo.QueryConditionType)
                                {
                                    case 1:
                                        TransactionInfoSearchAPI.WalletAddress = item.value;
                                        break;
                                    case 2:
                                        TransactionInfoSearchAPI.InternalAccount = item.value;
                                        break;
                                    case 3:
                                        TransactionInfoSearchAPI.TransactionSquence = item.value;
                                        break;
                                    case 4:
                                        TransactionInfoSearchAPI.IdCardNumber = item.value;
                                        break;
                                    case 5:
                                        TransactionInfoSearchAPI.BankAccount = item.value;
                                        break;
                                    case 6:
                                        TransactionInfoSearchAPI.TxID = item.value;
                                        break;
                                    case 7:
                                        TransactionInfoSearchAPI.Phone = item.value;
                                        break;
                                    case 8:
                                        TransactionInfoSearchAPI.Email = item.value;
                                        break;
                                }

                                string PersonalInfoIP = ConfigurationManager.AppSettings["SearchURL"];
                                url = PersonalInfoIP + "transactionInfo/_search";

                                //postBody = JsonConvert.SerializeObject(TransactionInfoSearchAPI);
                                postBody = JsonConvert.SerializeObject(TransactionInfoSearchAPI,
                               Newtonsoft.Json.Formatting.None,
                               new JsonSerializerSettings
                               {
                                   NullValueHandling = NullValueHandling.Ignore
                               });
                            }

                            //拋查API
                            try
                            {

                                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                                request.Method = "POST";
                                request.ContentType = "application/json";
                                byte[] byteArray = Encoding.UTF8.GetBytes(postBody);
                                request.Headers["exchange_code"] = Agency.ToString();
                                using (Stream reqStream = request.GetRequestStream())
                                {
                                    reqStream.Write(byteArray, 0, byteArray.Length);
                                }

                                //API回傳的字串
                                string responseStr = "";
                                //發出Request
                                using (WebResponse response = request.GetResponse())
                                {
                                    using (StreamReader sr = new StreamReader(response.GetResponseStream(), Encoding.UTF8))
                                    {
                                        responseStr = sr.ReadToEnd();
                                    }
                                }
                                if (responseStr.Contains("success"))
                                {
                                    resMsg = "已拋查成功";
                                }
                                else
                                {
                                    resMsg = "拋查失敗";
                                    _personalInfoSearchService.UpdateDetail(orderNumber, 3, responseStr);
                                    //更新錯誤狀態 (未完成)
                                    //var postData = JsonConvert.DeserializeObject(postBody);
                                    //_unitOfWork.CryptoQueryDetailRepository.UpdateQueryStatus("", 3);
                                }
                            }
                            catch (Exception ex)
                            {

                                _personalInfoSearchService.UpdateDetail(orderNumber, 3, ex.Message);
                            }
                        }
                    }
                }
                return Ok(resMsg);
            }
            catch (Exception ex)
            {
                throw (ex);
            }

        }
    }
}