using PaymentFlowAnalysis.Common.Constants;
using PaymentFlowAnalysis.Common.Securities;
using PaymentFlowAnalysis.Common.Utilities;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Service.Models;
using PaymentFlowAnalysis.Service.Services.Interfaces;
using PaymentFlowAnalysis.Web.Helpers;
using PaymentFlowAnalysis.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PaymentFlowAnalysis.Web.Controllers
{
    [RoutePrefix("api/sysuserlist")]
    public class SysUserListController : ApiController
    {
        private readonly ISysUserListService _userListService;
        public SysUserListController(ISysUserListService userListService)
        {
            _userListService = userListService;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get([FromUri] SysUserListAPIQueryParams queryParams)
        {
            SysUserListSearchModel queryModel = new SysUserListSearchModel
            {
                UserId = queryParams.UserId,
                OrderUserName = queryParams.OrderUserName,
                UnitCode = queryParams.UnitCode,
                UnitName = queryParams.UnitName,
                OrderUserEmail = queryParams.OrderUserEmail,
                OrderUserPhone = queryParams.OrderUserPhone,
            };
            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };

            var result = _userListService.GetPaginatedResult(queryModel, paginated);

            return Ok(result);
        }

        [HttpGet]
        [Route("current")]
        public IHttpActionResult Get()
        {
            try
            {
                string userId = Request.GetUserIdFromToken();
                var sysuserList = _userListService.Get(userId);

                return Ok(sysuserList);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }
        
        [HttpGet]
        [Route("{userId}")]
        public IHttpActionResult Get(string userId)
        {
            try
            {
                if (userId == null)
                {
                    throw new OperationalException(
                            ErrorType.INVALID_ID,
                            "識別碼不得為空");
                }
                var sysuserList = _userListService.Get(userId);

                return Ok(sysuserList);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        //[HttpPost]
        //[Route("")]
        //public IHttpActionResult Post([FromBody] SysUserListCreationAPIQueryParams reqParams)
        //{
        //    SysUserList sysUserList = new SysUserList
        //    {
        //        UserId = reqParams.UserId,
        //        UserName = reqParams.UserName,
        //        UnitCode = reqParams.UnitCode,
        //        UnitName = reqParams.UnitName,
        //        UserEmail = reqParams.UserEmail,
        //        UserPhone = reqParams.UserPhone,
        //        IsValid = reqParams.IsValid,
        //        CreateTime = DateTime.Now,
        //        UpdateUserId = reqParams.UpdateUserId,
        //        UpdateUserName = reqParams.UpdateUserName,
        //        UpdateTime = reqParams.UpdateTime,
        //    };
        //    _userListService.Insert(sysUserList);

        //    return Ok();
        //}

        [HttpPut]
        [Route("{userId}")]
        public IHttpActionResult Put(string userId, [FromBody] SysUserListUpdateAPIQueryParams reqParams)
        {
            try
            {
                SysUserList sysUserList = new SysUserList
                {
                    UserId = userId,
                    OrderUserName = reqParams.OrderUserName,
                    UnitCode = reqParams.UnitCode,
                    UnitName = reqParams.UnitName,
                    OrderUserEmail = reqParams.OrderUserEmail,
                    OrderUserPhone = reqParams.OrderUserPhone,
                    IsValid = reqParams.IsValid,
                    CreateTime = DateTime.Now,
                    UpdateUserId = reqParams.UpdateUserId,
                    UpdateUserName = reqParams.UpdateUserName,
                    UpdateTime = reqParams.UpdateTime,
                };
                _userListService.Update(sysUserList);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }

            return Ok();
        }

        [HttpPatch]
        [Route("{userId}")]
        public IHttpActionResult Patch(string userId, [FromBody] SysUserListPatchAPIModel patchModel)
        {
            try
            {
                SysUserListUpdateServiceModel sysUserListUpdateServiceModel = new SysUserListUpdateServiceModel
                {
                    OrderUserName = patchModel.OrderUserName,
                    OrderUserEmail = patchModel.OrderUserEmail,
                    OrderUserPhone = patchModel.OrderUserPhone,
                    OrderUserRank = patchModel.OrderUserRank,
                    OrderUserUnit = patchModel.OrderUserUnit,
                    OrderUserProjectCategory = patchModel.OrderUserProjectCategory,
                    IsValid = patchModel.IsValid,
                    UpdateUserId = Request.GetUserIdFromToken(),
                };
                _userListService.Update(userId, sysUserListUpdateServiceModel);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }

            return Ok();
        }

        //[HttpDelete]
        //[Route("{userId}")]
        //public IHttpActionResult Delete(string userId)
        //{
        //    try
        //    {
        //        _userListService.Delete(userId);
        //    }
        //    catch (OperationalException ex)
        //    {
        //        return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}
    }
}