using System;
using AutoMapper;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Service.Models;
using PaymentFlowAnalysis.Common.Enums;
using System.Linq;
using PaymentFlowAnalysis.Common.Helpers;
using PaymentFlowAnalysis.Core.UnitOfWork;

namespace PaymentFlowAnalysis.Service.AutoMappings.Mappers
{
    public class CryptoTransactionInfoMapper : Profile
    {
        private readonly IUnitOfWork _unitOfWork;
        public CryptoTransactionInfoMapper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            CreateMap<CryptoTransactionInfo, CryptoTransactionInfoDTO>()
                .ForMember(v => v.TransactionMode, v => v.MapFrom(o => Enum.GetValues(typeof(TransactionMode)).Cast<TransactionMode>().FirstOrDefault(s => (short)s == o.TransactionMode)))
                .ForMember(v => v.ExchangeTypeCode, v => v.MapFrom(o => Enum.GetValues(typeof(AgencyTypeEnum)).Cast<AgencyTypeEnum>().FirstOrDefault(s => (short)s == o.ExchangeTypeCode)))
                .ForMember(v => v.QueryStatus, v => v.MapFrom(o => Enum.GetValues(typeof(QueryStatusType)).Cast<QueryStatusType>().FirstOrDefault(s => (short)s == o.QueryStatus)))
                .ForMember(v => v.RemittanceBankName, v => v.MapFrom(o => o.RemittanceBank != null ? GetBankName(o.RemittanceBank) : null))
                .ForMember(v => v.RemittanceBranchName, v => v.MapFrom(o => o.RemittanceBranch != null ? GetBankBranchName(o.RemittanceBank + o.RemittanceBranch) : null))
                .ForMember(v => v.BeneficiaryBankName, v => v.MapFrom(o => o.BeneficiaryBank != null ? GetBankName(o.BeneficiaryBank) : null))
                .ForMember(v => v.BeneficiaryBranchName, v => v.MapFrom(o => o.BeneficiaryBranch != null ? GetBankBranchName(o.BeneficiaryBank + o.BeneficiaryBranch) : null))
                .ForMember(v => v.TransactionTime_Cov, v => v.MapFrom(o => o.TransactionTime_Cov != null ? DateTimeHelper.ConvertToDateTimeString(o.TransactionTime_Cov) : null))
                .ForMember(v => v.CreateTime, v => v.MapFrom(o => o.CreateTime != null ? DateTimeHelper.ConvertToDateTimeString(o.CreateTime) : null))
                .ReverseMap();
        }

        public string GetBankName(string code)
        {
            return _unitOfWork.BankCodeRepository.GetBankName(code).FirstOrDefault().BankName;
        }

        public string GetBankBranchName(string code)
        {
            return _unitOfWork.BankCodeRepository.GetBankBranchName(code).FirstOrDefault().BankBranchName;
        }
    }
}
