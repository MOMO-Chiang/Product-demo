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
    public class CryptoPersonalInfoPictureService : ICryptoPersonalInfoPictureService
    {
        private readonly IUnitOfWork _unitOfWork;
        public CryptoPersonalInfoPictureService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        
        /// <summary>
        /// 取得錢包彈窗資料
        /// </summary>
        /// <returns></returns>
        public PaginatedResult<CryptoPersonalInfoPicture> GetPictureResult(string PersonalInfoId, PaginationWithSortedQueryModel paginated)
        {
            Tuple<IEnumerable<CryptoPersonalInfoPicture>, int> tuple = _unitOfWork.CryptoPersonalInfoPictureRepository.SearchPicture(PersonalInfoId, paginated);
            IEnumerable<CryptoPersonalInfoPicture> DetailLists = tuple.Item1;
            var totalCount = tuple.Item2;

            PaginatedResult<CryptoPersonalInfoPicture> pageResult = new PaginatedResult<CryptoPersonalInfoPicture>
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
