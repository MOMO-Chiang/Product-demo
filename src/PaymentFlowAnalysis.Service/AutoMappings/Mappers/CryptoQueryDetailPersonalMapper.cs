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
    public class CryptoQueryDetailPersonalMapper : Profile
    {
        private readonly IUnitOfWork _unitOfWork;
        public CryptoQueryDetailPersonalMapper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            CreateMap<CryptoQueryDetail, CryptoQueryDetailPersonalDTO>()
                .ForMember(v => v.RequestAgency, v => v.MapFrom(o => Enum.GetValues(typeof(AgencyTypeEnum)).Cast<AgencyTypeEnum>().FirstOrDefault(s => (short)s == o.RequestAgency)))
                .ForMember(v => v.ExchangeTypeCode, v => v.MapFrom(o => Enum.GetValues(typeof(AgencyTypeEnum)).Cast<AgencyTypeEnum>().FirstOrDefault(s => (short)s == o.ExchangeTypeCode)))
                .ForMember(v => v.QueryConditionType, v => v.MapFrom(o => Enum.GetValues(typeof(QueryConditionType)).Cast<QueryConditionType>().FirstOrDefault(s => (short)s == o.QueryConditionType)))
                .ForMember(v => v.QueryStatus, v => v.MapFrom(o => Enum.GetValues(typeof(QueryStatusType)).Cast<QueryStatusType>().FirstOrDefault(s => (short)s == o.QueryStatus)))
                .ForMember(v => v.Bank_Name, v => v.MapFrom(o => o.Bank_Name != null ? GetBankName(o.BankName) : null))
                .ForMember(v => v.VerifiedbankName, v => v.MapFrom(o => o.VerifiedbankName != null ? GetBankName(o.Verifiedbank) : null))
                .ForMember(v => v.BranchName, v => v.MapFrom(o => o.BranchName != null ? GetBankBranchName(o.BankName + o.Branch) : null))
                .ForMember(v => v.Birthday_Cov, v => v.MapFrom(o => DateTimeHelper.ConvertToDateTimeString(o.Birthday_Cov)))
                .ForMember(v => v.RegisterDate_Cov, v => v.MapFrom(o => DateTimeHelper.ConvertToDateTimeString(o.RegisterDate_Cov)))
                .ForMember(v => v.VerifyDate_Cov, v => v.MapFrom(o => DateTimeHelper.ConvertToDateTimeString(o.VerifyDate_Cov)))
                .ForMember(v => v.CreateTime, v => v.MapFrom(o => DateTimeHelper.ConvertToDateTimeString(o.CreateTime)))
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
