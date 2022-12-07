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
    public class PersonalInfoSearchService : IPersonalInfoSearchService
    {
        private readonly IUnitOfWork _unitOfWork;
        public PersonalInfoSearchService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public int InsertMaster(PersonalInfoSearch PersonalInfoSearch)
        {
            return _unitOfWork.PersonalInfoSearchRepository.Insert(PersonalInfoSearch, _unitOfWork);
        }

        public int InsertDetail(PersonalInfoDetail PersonalInfoDetail)
        {
            return _unitOfWork.PersonalInfoDetailRepository.Insert(PersonalInfoDetail, _unitOfWork);
        }

        public int UpdateDetail(string orderNumber, int status, string message)
        {
            return _unitOfWork.PersonalInfoDetailRepository.UpdateDetailByOrderNumber(orderNumber, status, message);
        }
    }
}
