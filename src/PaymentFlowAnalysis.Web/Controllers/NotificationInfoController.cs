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
using System.Web;
using System.Web.Http;

namespace PaymentFlowAnalysis.Web.Controllers
{
    [RoutePrefix("api/notification-info")]
    public class NotificationInfoController : ApiController
    {
        private readonly INotificationInfoService _notificationInfoService;
        public NotificationInfoController(INotificationInfoService notificationInfoService)
        {
            _notificationInfoService = notificationInfoService;
        }

        [HttpGet, Route("")]
        public IHttpActionResult Get([FromUri] NotificationInfoAPIQueryParams queryParams)
        {
            string userId = Request.GetUserIdFromToken();
            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };

            PaginatedResult<NotificationInfoDTO> result = _notificationInfoService.GetPaginatedResult(userId, paginated);

            return Ok(result);
        }

        [HttpPatch, Route("read")]
        public IHttpActionResult Read()
        {
            string userId = Request.GetUserIdFromToken();
            _notificationInfoService.MarkAllNotifcationAsReadByUserId(userId);

            return Ok();
        }

        [HttpGet, Route("unread/count")]
        public IHttpActionResult GetUnReadCount()
        {
            string userId = Request.GetUserIdFromToken();
            int unReadCount = _notificationInfoService.GetUnReadCount(userId);

            return Ok(unReadCount);
        }

    }
}