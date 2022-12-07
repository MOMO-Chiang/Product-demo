using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.UnitOfWork;
using PaymentFlowAnalysis.Service.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Service.Services
{
    public class MainLogService : IMainLogService
    {
        private readonly IUnitOfWork _unitOfWork;
        public MainLogService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public void Insert(MainLog mainLog)
        {
            _unitOfWork.MainLogRepository.Insert(mainLog, _unitOfWork);
        }
    }
}
