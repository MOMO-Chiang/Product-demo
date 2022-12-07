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
    public class CryptoPersonalInfoService : ICryptoPersonalInfoService
    {
        private readonly IUnitOfWork _unitOfWork;
        public CryptoPersonalInfoService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        
        /// <summary>
        /// 取得個資資料
        /// </summary>
        /// <returns></returns>
        public IEnumerable<CryptoPersonalInfo_API> GetPersonalInfoResult(CryptoQueryDetailSearchModel queryModel)
        {
            IEnumerable<CryptoPersonalInfo_API>tuple = _unitOfWork.CryptoPersonalInfoRepository.SearchPersonalInfo(queryModel);
            return tuple;
        }
    }
}
