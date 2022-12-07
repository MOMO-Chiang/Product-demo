using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using System;
using System.Collections.Generic;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface INotificationInfoRepository : IRepositoryBase<NotificationInfo>
    {
        IEnumerable<NotificationInfo> GetByUserId(string userId);
        Tuple<IEnumerable<NotificationInfo>, int> GetPaginatedByUserId(string userId, PaginationWithSortedQueryModel paginated);
        int UpdateReadStatusByUserId(string userId, bool isRead);
        int GetUnReadCount(string userId);
    }
}
