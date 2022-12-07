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
    public class CryptoPersonalInfoWalletService : ICryptoPersonalInfoWalletService
    {
        private readonly IUnitOfWork _unitOfWork;
        public CryptoPersonalInfoWalletService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IEnumerable<CryptoPersonalInfoWallet_API> GetAll()
        {
            return _unitOfWork.CryptoPersonalInfoWalletRepository.GetAll();
        }

        public IEnumerable<CryptoPersonalInfoWallet_API> GetPaginatedResult(CryptoPersonalInfoWalletSearchModel queryModel, PaginationWithSortedQueryModel paginated)
        {
            IEnumerable<CryptoPersonalInfoWallet_API> tuple = _unitOfWork.CryptoPersonalInfoWalletRepository.SearchPaginated(queryModel, paginated);

            return tuple;
        }

        /// <summary>
        /// 取得錢包彈窗資料
        /// </summary>
        /// <returns></returns>
        public PaginatedResult<CryptoPersonalInfoWallet_API> GetWallerAddressResult(string PersonalInfoId, PaginationWithSortedQueryModel paginated)
        {
            Tuple<IEnumerable<CryptoPersonalInfoWallet_API>, int> tuple = _unitOfWork.CryptoPersonalInfoWalletRepository.SearchWallerAddress(PersonalInfoId, paginated);
            IEnumerable<CryptoPersonalInfoWallet_API> DetailLists = tuple.Item1;
            var totalCount = tuple.Item2;

            PaginatedResult<CryptoPersonalInfoWallet_API> pageResult = new PaginatedResult<CryptoPersonalInfoWallet_API>
            {
                PaginatedInfo = new PaginatedInfo
                {
                    Page = paginated.Page,
                    PageSize = paginated.PageSize,
                    TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                    PageCount = DetailLists.Count(),
                    TotalCount = totalCount
                },
                Data = DetailLists.ToList(),
            };
            return pageResult;
        }
    }
}
