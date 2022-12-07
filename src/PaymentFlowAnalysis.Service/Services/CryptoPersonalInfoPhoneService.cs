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
    public class CryptoPersonalInfoPhoneService : ICryptoPersonalInfoPhoneService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CryptoPersonalInfoPhoneService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public IEnumerable<CryptoPersonalInfoPhone_API> GetAll()
        {
            return _unitOfWork.CryptoPersonalInfoPhoneRepository.GetAll();
        }

        public IEnumerable<CryptoPersonalInfoPhone_API> GetPaginatedResult(CryptoPersonalInfoPhoneSearchModel queryModel)
        {
            IEnumerable<CryptoPersonalInfoPhone_API> tuple = _unitOfWork.CryptoPersonalInfoPhoneRepository.SearchPaginated(queryModel);

            return tuple;
        }
        /// <summary>
        /// 取得電話彈窗資料
        /// </summary>
        /// <returns></returns>
        public PaginatedResult<CryptoPersonalInfoPhoneDTO> GetPhoneResult(string PersonalInfoId, PaginationWithSortedQueryModel paginated)
        {
            Tuple<IEnumerable<CryptoPersonalInfoPhone_API>, int> tuple = _unitOfWork.CryptoPersonalInfoPhoneRepository.SearchPhone(PersonalInfoId, paginated);
            IEnumerable<CryptoPersonalInfoPhone_API> DetailLists = tuple.Item1;
            var totalCount = tuple.Item2;

            PaginatedResult<CryptoPersonalInfoPhoneDTO> pageResult = new PaginatedResult<CryptoPersonalInfoPhoneDTO>
            {
                PaginatedInfo = new PaginatedInfo
                {
                    Page = paginated.Page,
                    PageSize = paginated.PageSize,
                    TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                    PageCount = DetailLists.Count(),
                    TotalCount = totalCount
                },
                Data = _mapper.Map<List<CryptoPersonalInfoPhone_API>, List<CryptoPersonalInfoPhoneDTO>>(DetailLists.ToList()),

            };
            return pageResult;
        }
    }
}
