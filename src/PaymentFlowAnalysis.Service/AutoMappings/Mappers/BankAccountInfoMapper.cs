using System;
using AutoMapper;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Service.Models;
using PaymentFlowAnalysis.Common.Enums;
using System.Linq;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Common.Helpers;

namespace PaymentFlowAnalysis.Service.AutoMappings.Mappers
{
    public class BankAccountInfoMapper : Profile
    {
        public BankAccountInfoMapper()
        {
            CreateMap<BankAccountInfo, BankAccountInfoDTO>()
                .ForMember(v => v.DataProvidedDate_Cov, v=>v.MapFrom(o => o.DataProvidedDate_Cov == null ? "" : DateTimeHelper.ConvertToDateTimeString((DateTime)o.DataProvidedDate_Cov)))
                .ForMember(v => v.AccountOpeningDate_Cov, v => v.MapFrom(o => o.AccountOpeningDate_Cov == null ? "" : DateTimeHelper.ConvertToDateTimeString((DateTime)o.AccountOpeningDate_Cov)))
                .ForMember(v => v.AccountClosingDate_Cov, v => v.MapFrom(o => o.AccountClosingDate_Cov == null ? "" : DateTimeHelper.ConvertToDateTimeString((DateTime)o.AccountClosingDate_Cov)))
                .ForMember(v => v.CreateTime, v => v.MapFrom(o => DateTimeHelper.ConvertToDateTimeString(o.CreateTime)))
                .ReverseMap();
        }
    }
}
