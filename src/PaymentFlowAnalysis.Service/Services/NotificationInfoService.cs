using Newtonsoft.Json;
using PaymentFlowAnalysis.Common.Helpers;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Core.UnitOfWork;
using PaymentFlowAnalysis.Service.Models;
using PaymentFlowAnalysis.Service.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Service.Services
{
    public class NotificationInfoService : INotificationInfoService
    {
        private readonly IUnitOfWork _unitOfWork;
        public NotificationInfoService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<NotificationInfoDTO> GetByUserId(string userId)
        {
            IEnumerable<NotificationInfo> notificationInfos = _unitOfWork.NotificationInfoRepository.GetByUserId(userId);

            // 取得主表的查詢條件
            List<string> orderMasterNumbers = notificationInfos.Where(s => s.OrderMasterNumber != null).Select(s => s.OrderMasterNumber).ToList();
            IEnumerable<CryptoQueryMaster> cryptoQueryMasters = _unitOfWork.CryptoQueryMasterRepository.GetByOrderMasterNumber(orderMasterNumbers);

            IEnumerable<NotificationInfoDTO> notificationInfoDTOs =
                from notification in notificationInfos
                join cryptoQueryMaster in cryptoQueryMasters
                on notification.OrderMasterNumber equals cryptoQueryMaster.OrderMasterNumber
                select new NotificationInfoDTO
                {
                    NotificationSeq = notification.NotificationSeq,
                    Message = notification.Message,
                    CreateTime = DateTimeHelper.ConvertToDateTimeString(notification.CreateTime),
                    OrderMasterNumber = notification.OrderMasterNumber,
                    IsRead = notification.IsRead,
                    QueryParameter = JsonConvert.SerializeObject(cryptoQueryMaster),
                };

            return notificationInfoDTOs;
        }

        public PaginatedResult<NotificationInfoDTO> GetPaginatedResult(string userId, PaginationWithSortedQueryModel paginated)
        {
            Tuple<IEnumerable<NotificationInfo>, int> tuple = _unitOfWork.NotificationInfoRepository.GetPaginatedByUserId(userId, paginated);
            IEnumerable<NotificationInfo> notificationInfos = tuple.Item1;
            int totalCount = tuple.Item2;

            // 取得主表的查詢條件
            List<string> orderMasterNumbers = notificationInfos.Where(s => s.OrderMasterNumber != null).Select(s => s.OrderMasterNumber).ToList();
            IEnumerable<CryptoQueryMaster> cryptoQueryMasters = _unitOfWork.CryptoQueryMasterRepository.GetByOrderMasterNumber(orderMasterNumbers);
            
            IEnumerable<NotificationInfoDTO> notificationInfoDTOs =
                from notification in notificationInfos
                join cryptoQueryMaster in cryptoQueryMasters
                on notification.OrderMasterNumber equals cryptoQueryMaster.OrderMasterNumber
                select new NotificationInfoDTO
                {
                    NotificationSeq = notification.NotificationSeq,
                    Message = notification.Message,
                    CreateTime = DateTimeHelper.ConvertToDateTimeString(notification.CreateTime),
                    OrderMasterNumber = notification.OrderMasterNumber,
                    IsRead = notification.IsRead,
                    QueryParameter = cryptoQueryMaster,
                };

            PaginatedResult<NotificationInfoDTO> pageResult = new PaginatedResult<NotificationInfoDTO>
            {
                PaginatedInfo = new PaginatedInfo
                {
                    Page = paginated.Page,
                    PageSize = paginated.PageSize,
                    TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                    PageCount = notificationInfos.Count(),
                    TotalCount = totalCount
                },
                Data = notificationInfoDTOs.ToList(),
            };
            return pageResult;
        }

        public int GetUnReadCount(string userId)
        {
            return _unitOfWork.NotificationInfoRepository.GetUnReadCount(userId);
        }

        public void MarkAllNotifcationAsReadByUserId(string userId)
        {
            _unitOfWork.NotificationInfoRepository.UpdateReadStatusByUserId(userId, true);
        }
    }
}
