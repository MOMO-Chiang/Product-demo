using PaymentFlowAnalysis.Common.Constants;
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
using System.Text;
using System.Web;
using System.Web.Http;
using FromBodyAttribute = System.Web.Http.FromBodyAttribute;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;
using RouteAttribute = System.Web.Http.RouteAttribute;

namespace PaymentFlowAnalysis.Web.Controllers
{
    [RoutePrefix("api/cryptoquery")]
    public class CryptoQueryController : ApiController
    {
        private readonly ICryptoQueryDetailService _CryptoQueryService;
        public CryptoQueryController(ICryptoQueryDetailService CryptoQueryService)
        {
            _CryptoQueryService = CryptoQueryService;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get([FromUri] CryptoQueryQueryParams queryParams)
        {
            CryptoQuerySearchModel queryModel = new CryptoQuerySearchModel
            {
                QueryUserId = queryParams.QueryUserId,
                RequestAgency = queryParams.RequestAgency,
                QueryConditionType = queryParams.QueryConditionType,
                QueryValue = queryParams.QueryValue,
                OrderDetailNumber = queryParams.OrderDetailNumber,
                QueryOrderTimeStart = !string.IsNullOrEmpty(queryParams.QueryOrderTimeStart) ? Convert.ToDateTime(queryParams.QueryOrderTimeStart) : (DateTime?)null,
                QueryOrderTimeEnd = !string.IsNullOrEmpty(queryParams.QueryOrderTimeEnd) ? Convert.ToDateTime(queryParams.QueryOrderTimeEnd) : (DateTime?)null,
            };
            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };

            var result = _CryptoQueryService.GetPaginatedResult(queryModel, paginated);

            return Ok(result);
        }

        ///// <summary>
        ///// 匯出資料調閱excel
        ///// </summary>
        ///// <param name="queryParams"></param>
        ///// <returns></returns>
        [Route("exportexcel")]
        [HttpPost]
        public IHttpActionResult ExportCryptoQueryExcel([FromBody] CryptoQueryQueryParams queryParams)
        {
            CryptoQuerySearchModel queryModel = new CryptoQuerySearchModel
            {
                QueryUserId = queryParams.QueryUserId,
                RequestAgency = queryParams.RequestAgency,
                QueryConditionType = queryParams.QueryConditionType,
                QueryValue = queryParams.QueryValue,
                OrderDetailNumber = queryParams.OrderDetailNumber,
                QueryOrderTimeStart = !string.IsNullOrEmpty(queryParams.QueryOrderTimeStart) ? Convert.ToDateTime(queryParams.QueryOrderTimeStart) : (DateTime?)null,
                QueryOrderTimeEnd = !string.IsNullOrEmpty(queryParams.QueryOrderTimeEnd) ? Convert.ToDateTime(queryParams.QueryOrderTimeEnd) : (DateTime?)null,
            };
            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };
            var stream = _CryptoQueryService.ExportFile(queryModel, paginated);

            var res = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(stream.ToArray())
            };
            res.Content.Headers.ContentDisposition =
                new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = HttpUtility.UrlEncode("使用者調閱紀錄.xlsx")
                };
            res.Content.Headers.ContentType =
                new MediaTypeHeaderValue("application/vnd.ms-excel");

            return ResponseMessage(res);
        }

        /// <summary>
        /// 取得下拉選單
        /// </summary>
        /// <param name="type">資料來源機構下拉選單</param>
        /// <returns></returns>
        [Route("agencytype/options")]
        [HttpGet]
        public IHttpActionResult GetAgencyTypeOptions()
        {
            var option = Enum.GetValues(typeof(Common.Enums.AgencyTypeEnum)).Cast<Common.Enums.AgencyTypeEnum>().Select(v => new Option {
                Value = ((short)v).ToString(),
                Text = v.ToString()
            });

            return Ok(option);
        }
        /// <summary>
        /// 取得下拉選單
        /// </summary>
        /// <param name="type">拋查條件下拉選單</param>
        /// <returns></returns>
        [Route("conditiontype/options")]
        [HttpGet]
        public IHttpActionResult GetQueryConditionTypeOptions()
        {
            var option = Enum.GetValues(typeof(Common.Enums.QueryConditionType)).Cast<Common.Enums.QueryConditionType>().Select(v => new Option
            {
                Value = ((short)v).ToString(),
                Text = v.ToString()
            });

            return Ok(option);
        }
    }
}