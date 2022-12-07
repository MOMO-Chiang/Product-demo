using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Service.Models;
using System.Collections.Generic;

namespace PaymentFlowAnalysis.Service.Services.Interfaces
{
    public interface INotificationInfoService
    {
        IEnumerable<NotificationInfoDTO> GetByUserId(string userId);
        PaginatedResult<NotificationInfoDTO> GetPaginatedResult(string userId, PaginationWithSortedQueryModel paginated);
        void MarkAllNotifcationAsReadByUserId(string userId);
        int GetUnReadCount(string userId);
    }
}
