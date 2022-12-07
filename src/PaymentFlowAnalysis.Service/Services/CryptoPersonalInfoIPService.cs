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
    public class CryptoPersonalInfoIPService : ICryptoPersonalInfoIPService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CryptoPersonalInfoIPService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        
        /// <summary>
        /// 取得錢包彈窗資料
        /// </summary>
        /// <returns></returns>
        public PaginatedResult<CryptoPersonalInfoLoginIPListDTO> GetIPResult(string Uid, PaginationWithSortedQueryModel paginated)
        {
            Tuple<IEnumerable<CryptoPersonalInfoLoginIPList_API>, int> tuple = _unitOfWork.CryptoPersonalInfoIPRepository.SearchIP(Uid, paginated);
            IEnumerable<CryptoPersonalInfoLoginIPList_API> DetailLists = tuple.Item1;
            var totalCount = tuple.Item2;

            PaginatedResult<CryptoPersonalInfoLoginIPListDTO> pageResult = new PaginatedResult<CryptoPersonalInfoLoginIPListDTO>
            {
                PaginatedInfo = new PaginatedInfo
                {
                    Page = paginated.Page,
                    PageSize = paginated.PageSize,
                    TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                    PageCount = DetailLists.Count(),
                    TotalCount = totalCount
                },
                Data = _mapper.Map<List<CryptoPersonalInfoLoginIPList_API>, List<CryptoPersonalInfoLoginIPListDTO>>(DetailLists.ToList()),
            };
            return pageResult;
        }
    }
}
