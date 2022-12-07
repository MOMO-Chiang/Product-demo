using PaymentFlowAnalysis.Common.Securities;
using PaymentFlowAnalysis.Service.Services.Interfaces;
using PaymentFlowAnalysis.Web.Helpers;
using System.Web.Http;

namespace PaymentFlowAnalysis.Web.Controllers
{
    [RoutePrefix("api/userfile")]
    public class UserFileController : ApiController
    {
        private readonly IUserFileService _userFileService;
        public UserFileController(IUserFileService userFileService)
        {
            _userFileService = userFileService;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            string handManId = Request.GetUserIdFromToken();            
            var result = _userFileService.GetByHandManId(handManId);

            return Ok(result);
        }
    }
}