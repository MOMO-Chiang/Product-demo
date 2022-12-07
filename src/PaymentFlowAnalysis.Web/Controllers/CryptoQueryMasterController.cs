using Newtonsoft.Json;
using PaymentFlowAnalysis.Common.Constants;
using PaymentFlowAnalysis.Common.Utilities;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Service.Services.Interfaces;
using PaymentFlowAnalysis.Web.Helpers;
using PaymentFlowAnalysis.Web.Models;
using System.Net;
//using PaymentFlowAnalysis.Web.Securities;
using System.Web.Http;

namespace PaymentFlowAnalysis.Web.Controllers
{
    [RoutePrefix("api/cryptoquerymaster")]
    public class CryptoQueryMasterController : ApiController
    {
        private readonly ICryptoQueryMasterService _cryptoQueryMasterService;
        private readonly ICryptoQueryDetailService _cryptoQueryDetailService;
        public CryptoQueryMasterController(ICryptoQueryMasterService cryptoQueryMasterService, ICryptoQueryDetailService cryptoQueryDetailService)
        {
            _cryptoQueryMasterService = cryptoQueryMasterService;
            _cryptoQueryDetailService = cryptoQueryDetailService;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get([FromUri] CryptoQueryMasterAPIQueryParams queryParams)
        {
            CryptoQueryMasterSearchModel queryModel = new CryptoQueryMasterSearchModel
            {
                CaseNo = queryParams.CaseNo,
                SearchType = queryParams.SearchType
            };
            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };
            var result = _cryptoQueryMasterService.GetPaginatedResult(queryModel, paginated);
            foreach(var data in result.Data)
            {
                CryptoQueryDetailSearchModel queryModel_D = new CryptoQueryDetailSearchModel
                {
                    OrderMasterNumber = data.OrderMasterNumber
                };
                PaginationWithSortedQueryModel paginated_D = new PaginationWithSortedQueryModel
                {
                    Page = queryParams.Page,
                    PageSize = queryParams.PageSize,
                    IsAll = queryParams.IsAll,
                    SortedType = queryParams.SortedType,
                    SortedColumn = queryParams.SortedColumn,
                };
                var personalInfo=_cryptoQueryDetailService.SearchPaginatedQuery(queryModel_D, paginated);
                //data.DetailData = JsonConvert.SerializeObject(personalInfo.Data.ToArray());
            }

            return Ok(result);
        }
        
    }
}