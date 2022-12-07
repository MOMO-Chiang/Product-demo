using Newtonsoft.Json;
using PaymentFlowAnalysis.Common.Constants;
using PaymentFlowAnalysis.Common.Securities;
using PaymentFlowAnalysis.Common.Utilities;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Service.Services.Interfaces;
using PaymentFlowAnalysis.Web.Helpers;
using PaymentFlowAnalysis.Web.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace PaymentFlowAnalysis.Web.Controllers
{
    [RoutePrefix("api/cryptotransactioninfo")]
    public class CryptoTransactionInfoController : ApiController
    {
        private readonly ICryptoTransactionInfoService _cryptoTransactionInfoService;
        private readonly ICryptoQueryMasterService _cryptoQueryMasterService;
        private readonly ICryptoQueryDetailService _cryptoQueryDetailService;
        public CryptoTransactionInfoController(ICryptoTransactionInfoService cryptoTransactionInfoService, ICryptoQueryMasterService cryptoQueryMasterService, ICryptoQueryDetailService cryptoQueryDetailService)
        {
            _cryptoTransactionInfoService = cryptoTransactionInfoService;
            _cryptoQueryMasterService = cryptoQueryMasterService;
            _cryptoQueryDetailService = cryptoQueryDetailService;
        }

        [HttpGet]
        [Route("normal")]
        public IHttpActionResult Get([FromUri] CryptoTransactionInfoAPIQueryParams queryParams)
        {
            int detailDataCount;

            CryptoQueryMasterSearchModel queryModel = new CryptoQueryMasterSearchModel
            {
                CaseNo = queryParams.CaseNo,
                SearchType = queryParams.SearchType,
                _OrderMasterNumber = queryParams.OrderMasterNumber,
            };
            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };
            if (queryParams.TxID != null || queryParams.Account != null || queryParams.BankCode != null || queryParams.BrunchCode != null
                || queryParams.Currency != null || queryParams.AmountMax != null || queryParams.AmountMin != null
                || queryParams.TransactionTimeStart != null || queryParams.TransactionTimeEnd != null)
            {


                #region 查詢需要條件篩選
                // 如果是使用交易明細表進行查詢(資料在交易明細中)直接取得要查詢分頁表的全部資料
                paginated.IsAll = true;
                var MasterNumList = _cryptoQueryMasterService.GetPaginatedResult(queryModel, paginated);
                var DetailList = _cryptoQueryDetailService.GetDetailNumber(MasterNumList.Data.Select(x => x.OrderMasterNumber).ToList());

                // 取得明細資料
                CryptoTransactionInfoSearchModel queryModel_Transaction = new CryptoTransactionInfoSearchModel
                {
                    OrderNumber = DetailList.Select(x=>x.OrderDetailNumber).ToList(),
                    TxID = queryParams.TxID,
                    Account = queryParams.Account,
                    BankCode = queryParams.BankCode,
                    BrunchCode = queryParams.BrunchCode,
                    Currency = queryParams.Currency,
                    AmountMin = queryParams.AmountMin,
                    AmountMax = queryParams.AmountMax,
                    TransactionTimeStart = queryParams.TransactionTimeStart,
                    TransactionTimeEnd = queryParams.TransactionTimeEnd,
                };
                PaginationWithSortedQueryModel paginated_D = new PaginationWithSortedQueryModel
                {
                    Page = queryParams.Page,
                    PageSize = queryParams.PageSize,
                    IsAll = true,   //目前摺疊表格沒有分頁
                    SortedType = queryParams.SortedType,
                    SortedColumn = null,
                };
                var TransactrionInfo = _cryptoTransactionInfoService.GetPaginatedResult(queryModel_Transaction, paginated_D);
                TransactrionInfo.Data = TransactrionInfo.Data.Where(x => x.OrderMasterNumber != null).ToList();
                var TransactrionInfoMasterList = TransactrionInfo.Data.Where(x=>x.OrderMasterNumber!=null).Select(x => x.OrderMasterNumber).Distinct().ToList();
                var result = new Service.Models.PaginatedResult<Service.Models.CryptoQueryMasterDTO>
                {
                    PaginatedInfo = TransactrionInfo.PaginatedInfo,
                    Data = MasterNumList.Data.Where(x=>TransactrionInfoMasterList.Contains(x.OrderMasterNumber)).ToList()
                };
                for (int i = 0; i < result.Data.Count(); i++)
                {
                    var data = result.Data[i];
                    var queryResult = TransactrionInfo.Data.Where(x => x.OrderMasterNumber.Equals(data.OrderMasterNumber));
                    if (queryResult != null)
                    {
                        data.QueryStatusCount = queryResult.Where(x => x.QueryStatus == "資料已回覆").Count(); //資料回覆比數type=2
                        data.DetailData = JsonConvert.SerializeObject(queryResult.ToArray());
                    }
                    else
                    {
                        data.DetailData = null;
                    }
                }
                if (result.Data.Count() == 0)
                {
                    result.Data = null;
                    return Ok(result);
                }
                return Ok(result);
                #endregion
            }
            else
            {
                #region 查詢預設頁面
                // 取得應於頁面顯示的調閱主序號
                var result = _cryptoQueryMasterService.GetPaginatedResult(queryModel, paginated);
                var OrderMasterNumList = result.Data.Select(x => x.OrderMasterNumber).ToList();

                for (int i = 0; i < result.Data.Count(); i++)
                {
                    var data = result.Data[i];
                    // 依據取得的調閱主序號，取得需查詢的調閱明細單號,取得要查詢的detail資料
                    var cryptoQueryDetail = _cryptoQueryDetailService.GetDetailNumber(new List<string>() { data.OrderMasterNumber });
                    var QueryDetailList = cryptoQueryDetail.Select(x => x.OrderDetailNumber).ToList();
                    CryptoTransactionInfoSearchModel queryModel_Transaction = new CryptoTransactionInfoSearchModel
                    {
                        OrderNumber = QueryDetailList,
                        TxID = queryParams.TxID,
                        Account = queryParams.Account,
                        BankCode = queryParams.BankCode,
                        BrunchCode = queryParams.BrunchCode,
                        Currency = queryParams.Currency,
                        AmountMin = queryParams.AmountMin,
                        AmountMax = queryParams.AmountMax,
                        TransactionTimeStart = queryParams.TransactionTimeStart,
                        TransactionTimeEnd = queryParams.TransactionTimeEnd,
                    };
                    PaginationWithSortedQueryModel paginated_D = new PaginationWithSortedQueryModel
                    {
                        Page = queryParams.Page,
                        PageSize = queryParams.PageSize,
                        IsAll = true,   //目前摺疊表格沒有分頁
                        SortedType = queryParams.SortedType,
                        SortedColumn = null,
                    };
                    //如果沒有要調閱的單號(沒有QueryDetailNumber)則不查
                    if (QueryDetailList[0] != null)
                    {
                        var TransactrionInfo = _cryptoTransactionInfoService.GetPaginatedResult(queryModel_Transaction, paginated_D);

                        data.QueryStatusCount = TransactrionInfo.Data.Where(x => x.QueryStatus == "資料已回覆").Count(); //資料回覆比數type=2
                        data.DetailData = JsonConvert.SerializeObject(TransactrionInfo.Data.ToArray());
                    }
                    else
                    {
                        data.DetailData = null;
                    }
                }
                if (result.Data.Count() == 0)
                {
                    result.Data = null;
                    return Ok(result);
                }
                return Ok(result);
                #endregion
            }
            //detailDataCount = result.Data.FirstOrDefault().DetailData.Length; //無資料,DetailData長度為2。 (2個字元)
            //if (detailDataCount == 2)
            //{
            //    result.Data = null;
            //}
            return Ok();
        }

        [HttpGet]
        [Route("normal/export/excel")]
        public IHttpActionResult ExportExcel([FromUri] CryptoQueryMasterAPIQueryParams queryParams)
        {
            MemoryStream stream = new MemoryStream();
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(stream.ToArray())
            };

            httpResponseMessage.Content.Headers.ContentDisposition =
                new ContentDispositionHeaderValue("attachment")
                {
                    FileName = HttpUtility.UrlEncode("相關帳戶個資調閱.xlsx")
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
                SearchType = "3",
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
                    WallerAddress = queryParams.WallerAddress,
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
    }
}