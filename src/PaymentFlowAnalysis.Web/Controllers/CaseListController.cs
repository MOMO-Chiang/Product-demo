using PaymentFlowAnalysis.Service.Services.Interfaces;
using PaymentFlowAnalysis.Web.Securities;
using System.Web.Http;

namespace PaymentFlowAnalysis.Web.Controllers
{
    [RoutePrefix("api/caselist")]
    public class CaseListController : ApiController
    {
        private readonly ICaseListService _caseListService;
        public CaseListController(ICaseListService caseListService)
        {
            _caseListService = caseListService;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            string handManId = JwtManager.GetPersonId(Request.Headers.Authorization.Parameter);            
            var result = _caseListService.GetByHandManId(handManId);

            return Ok(result);
        }
    }
}