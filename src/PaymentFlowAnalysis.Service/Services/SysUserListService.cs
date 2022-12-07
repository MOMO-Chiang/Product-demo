using PaymentFlowAnalysis.Common.Constants;
using PaymentFlowAnalysis.Common.Utilities;
using PaymentFlowAnalysis.Core.DbConnectionFactory;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Core.Repositories.Interfaces;
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
    public class SysUserListService : ISysUserListService
    {
        private readonly IUnitOfWork _unitOfWork;
        public SysUserListService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<SysUserList> GetAll()
        {
            return _unitOfWork.SysUserListRepository.GetAll();
        }

        public PaginatedResult<SysUserList> GetPaginatedResult(SysUserListSearchModel queryModel, PaginationWithSortedQueryModel paginated)
        {
            Tuple<IEnumerable<SysUserList>, int> tuple = _unitOfWork.SysUserListRepository.SearchPaginated(queryModel, paginated);
            IEnumerable<SysUserList> userLists = tuple.Item1;
            var totalCount = tuple.Item2;

            PaginatedResult<SysUserList> pageResult = new PaginatedResult<SysUserList>
            {
                PaginatedInfo = new PaginatedInfo
                {
                    Page = paginated.Page,
                    PageSize = paginated.PageSize,
                    TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                    PageCount = userLists.Count(),
                    TotalCount = totalCount
                },
                Data = userLists.ToList(),
            };
            return pageResult;
        }

        public SysUserList Get(string userId)
        {
            var sysUserList = _unitOfWork.SysUserListRepository.Get(userId);
            if (sysUserList == null)
            {
                throw new OperationalException(
                    ErrorType.INSTANCE_NOT_FOUND,
                    $"查無此帳號: {userId}");
            }

            return sysUserList;
        }

        public void Insert(SysUserList sysUserList)
        {
            _unitOfWork.SysUserListRepository.Insert(sysUserList, _unitOfWork);
        }

        public void Update(SysUserList sysUserList)
        {
            if (_unitOfWork.SysUserListRepository.Get(sysUserList.UserId) == null)
            {
                throw new OperationalException(
                    ErrorType.INSTANCE_NOT_FOUND,
                    $"查無此帳號: {sysUserList.UserId}");
            }

            _unitOfWork.SysUserListRepository.Update(sysUserList, _unitOfWork);
        }

        public void Update(string userId, SysUserListUpdateServiceModel sysUserListUpdateServiceModel)
        {
            SysUserList sysUserList = _unitOfWork.SysUserListRepository.Get(userId);
            if (sysUserList == null)
            {
                throw new OperationalException(
                    ErrorType.INSTANCE_NOT_FOUND,
                    $"查無此帳號: {sysUserList.UserId}");
            }

            sysUserList.OrderUserName = sysUserListUpdateServiceModel.OrderUserName;
            sysUserList.OrderUserPhone = sysUserListUpdateServiceModel.OrderUserPhone;
            sysUserList.OrderUserEmail = sysUserListUpdateServiceModel.OrderUserEmail;
            sysUserList.OrderUserRank = sysUserListUpdateServiceModel.OrderUserRank;
            sysUserList.OrderUserUnit = sysUserListUpdateServiceModel.OrderUserUnit;
            sysUserList.OrderUserProjectCategory = sysUserListUpdateServiceModel.OrderUserProjectCategory;
            sysUserList.IsValid = sysUserListUpdateServiceModel.IsValid;
            sysUserList.UpdateUserId = sysUserListUpdateServiceModel.UpdateUserId;
            sysUserList.UpdateTime = DateTime.Now;

            _unitOfWork.SysUserListRepository.Update(sysUserList, _unitOfWork);
        }

        public void Delete(string userId)
        {
            var sysUserList = _unitOfWork.SysUserListRepository.Get(userId);
            if (sysUserList == null)
            {
                throw new OperationalException(
                    ErrorType.INSTANCE_NOT_FOUND,
                    $"查無此帳號: {userId}");
            }

            _unitOfWork.SysUserListRepository.Delete(sysUserList, _unitOfWork);
        }
    }
}
