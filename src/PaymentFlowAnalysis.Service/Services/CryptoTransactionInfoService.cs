using AutoMapper;
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
    public class CryptoTransactionInfoService : ICryptoTransactionInfoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CryptoTransactionInfoService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public IEnumerable<CryptoTransactionInfo> GetAll()
        {
            return _unitOfWork.CryptoTransactionInfoRepository.GetAll();
        }

        public PaginatedResult<CryptoTransactionInfoDTO> GetPaginatedResult(CryptoTransactionInfoSearchModel queryModel, PaginationWithSortedQueryModel paginated)
        {
            Tuple<IEnumerable<CryptoTransactionInfo>, int> tuple = _unitOfWork.CryptoTransactionInfoRepository.SearchPaginated(queryModel, paginated);
            IEnumerable<CryptoTransactionInfo> userLists = tuple.Item1;
            var totalCount = tuple.Item2;

            PaginatedResult<CryptoTransactionInfoDTO> pageResult = new PaginatedResult<CryptoTransactionInfoDTO>
            {
                PaginatedInfo = new PaginatedInfo
                {
                    Page = paginated.Page,
                    PageSize = paginated.PageSize,
                    TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                    PageCount = userLists.Count(),
                    TotalCount = totalCount
                },
                Data = _mapper.Map<List<CryptoTransactionInfo>, List<CryptoTransactionInfoDTO>>(userLists.ToList()),
            };
            return pageResult;
        }

        public CryptoTransactionInfo Get(string userId)
        {
            var sysUserList = _unitOfWork.CryptoTransactionInfoRepository.Get(userId);
            if (sysUserList == null)
            {
                throw new OperationalException(
                    ErrorType.INSTANCE_NOT_FOUND,
                    $"查無此帳號: {userId}");
            }

            return sysUserList;
        }
    }
}
