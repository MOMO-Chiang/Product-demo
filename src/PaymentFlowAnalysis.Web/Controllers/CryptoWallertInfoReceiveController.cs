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
    [RoutePrefix("api/cryptowallertinforeceive")]
    public class CryptoWallertInfoReceiveController : ApiController
    {
        private readonly ICryptoWallertInfoReceiveService _CryptoWallertInfoReceiveService;
        public CryptoWallertInfoReceiveController(ICryptoWallertInfoReceiveService CryptoWallertInfoReceiveService)
        {
            _CryptoWallertInfoReceiveService = CryptoWallertInfoReceiveService;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get([FromUri] CryptoWallertInfoReceiveQueryParams queryParams)
        {
            CryptoWallertInfoReceiveSearchModel queryModel = new CryptoWallertInfoReceiveSearchModel
            {
                ExchangeTypeCode = queryParams.ExchangeTypeCode,
                WalletAddress = queryParams.WalletAddress,
                CurrencyType = queryParams.CurrencyType,
                HotWallet = queryParams.HotWallet,
                CreateTimeStart = !string.IsNullOrEmpty(queryParams.CreateTimeStart) ? Convert.ToDateTime(queryParams.CreateTimeStart) : (DateTime?)null,
                CreateTimeEnd = !string.IsNullOrEmpty(queryParams.CreateTimeEnd) ? Convert.ToDateTime(queryParams.CreateTimeEnd) : (DateTime?)null,
            };
            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };

            var result = _CryptoWallertInfoReceiveService.GetPaginatedResult(queryModel, paginated);

            return Ok(result);
        }

        ///// <summary>
        ///// 匯出定期接收帳戶資料excel
        ///// </summary>
        ///// <param name="queryParams"></param>
        ///// <returns></returns>
        [Route("exportexcel")]
        [HttpPost]
        public IHttpActionResult ExportCryptoWallertInfoReceiveExcel([FromBody] CryptoWallertInfoReceiveQueryParams queryParams)
        {
            CryptoWallertInfoReceiveSearchModel queryModel = new CryptoWallertInfoReceiveSearchModel
            {
                ExchangeTypeCode = queryParams.ExchangeTypeCode,
                WalletAddress = queryParams.WalletAddress,
                CurrencyType = queryParams.CurrencyType,
                HotWallet = queryParams.HotWallet,
                CreateTimeStart = !string.IsNullOrEmpty(queryParams.CreateTimeStart) ? Convert.ToDateTime(queryParams.CreateTimeStart) : (DateTime?)null,
                CreateTimeEnd = !string.IsNullOrEmpty(queryParams.CreateTimeEnd) ? Convert.ToDateTime(queryParams.CreateTimeEnd) : (DateTime?)null,
            };
            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };
            var stream = _CryptoWallertInfoReceiveService.ExportFile(queryModel, paginated);

            var res = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(stream.ToArray())
            };
            res.Content.Headers.ContentDisposition =
                new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = HttpUtility.UrlEncode("定期接受帳戶資料.xlsx")
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
        [Route("options")]
        [HttpGet]
        public IHttpActionResult GetOptions()
        {
            //var option = Enum.GetValues(typeof(Common.Enums.AgencyTypeEnum)).ToList().Select();
            var option = Enum.GetValues(typeof(Common.Enums.AgencyTypeEnum)).Cast<Common.Enums.AgencyTypeEnum>().Select(v => new Option {
                Value = ((short)v).ToString(),
                Text = v.ToString()
            });

            return Ok(option);
        }
    }
}