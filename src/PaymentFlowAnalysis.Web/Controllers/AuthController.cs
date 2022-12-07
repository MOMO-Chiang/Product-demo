using PaymentFlowAnalysis.Common.Constants;
using PaymentFlowAnalysis.Common.Utilities;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Service.Models;
using PaymentFlowAnalysis.Service.Services.Interfaces;
using PaymentFlowAnalysis.Web.Helpers;
using PaymentFlowAnalysis.Web.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Security.Principal;
using System.DirectoryServices.AccountManagement;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace PaymentFlowAnalysis.Web.Controllers
{
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        private readonly IAuthService _authService;
        private readonly IUserFileService _userFileService;
        private readonly ISysUserListService _sysUserListService;
        public AuthController(IAuthService authService, IUserFileService userFileService, ISysUserListService sysUserListService)
        {
            _authService = authService;
            _userFileService = userFileService;
            _sysUserListService = sysUserListService;
        }

        /// <summary>
        /// 驗證來源網址
        /// </summary>
        /// <param name="referrer"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("referrer/validate")]
        [AllowAnonymous]
        public IHttpActionResult ValidateReferrer([FromBody] string referrer)
        {
            return Ok(true);
        }

        /// <summary>
        /// SSO登入跳轉
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="userName"></param>
        /// <param name="unitId"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("login/sso")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> LoginSSO(AuthLoginSSOAPIQueryParams queryParams)
        {
            try
            {
                string adDomain = "";
                string adUser = "";
                string userDescription = "";
                IPrincipal principal = HttpContext.Current.User;
                try
                {
                    string adServer = ConfigurationManager.AppSettings["ADServer"] ?? @"10.39.11.31";

                    Request.Properties.TryGetValue("MS_HttpContext", out object reqProperty);
                    var context = (HttpContextWrapper)reqProperty;
                    adUser = context.Request.LogonUserIdentity.Name;
                    var adData = adUser.Split(new char[] { '\\' });
                    if (adData.Length == 2)
                    {
                        adDomain = adData[0];
                        adUser = adData[1];
                    }

                    using (PrincipalContext domainContext = new PrincipalContext(ContextType.Domain, adServer))
                    using (UserPrincipal userPrinciple = UserPrincipal.FindByIdentity(domainContext, adUser))
                    {
                        adUser = userPrinciple.Name;
                        userDescription = userPrinciple.Description;
                    }
                }
                catch (Exception ex)
                {
                    throw new OperationalException(
                    ErrorType.INVALID_OPERATION,
                    $@"AD驗證錯誤: {ex.Message} {ex.StackTrace} {adDomain} {adUser} {principal.Identity.Name}");
                }

                AuthLoginInfo authLoginInfo = await _authService.LoginSSO(queryParams.UserId);

                return Ok(authLoginInfo);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        /// <summary>
        /// 登入
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<IHttpActionResult> Login([FromBody] AuthLoginAPIQueryParams queryParams)
        {
            #region 檢核參數
            if (string.IsNullOrEmpty(queryParams.Account))
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ErrorType.INVALID_REQUEST_PARAMETERS, $"帳號未輸入"));
            }

            if (string.IsNullOrEmpty(queryParams.Password))
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ErrorType.INVALID_REQUEST_PARAMETERS, $"密碼未輸入"));
            }
            #endregion

            try
            {
                AuthLoginInfo authLoginInfo = await _authService.LoginAD(queryParams.Account, queryParams.Password);

                return Ok(authLoginInfo);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }
    }
}