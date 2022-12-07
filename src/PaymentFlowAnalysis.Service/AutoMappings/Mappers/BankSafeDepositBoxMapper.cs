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
    public class BankSafeDepositBoxMapper : Profile
    {
        public BankSafeDepositBoxMapper()
        {
            CreateMap<BankSafeDepositBox, BankSafeDepositBoxDTO>()
                .ForMember(v => v.DataProvidedTime_Cov, v => v.MapFrom(o => o.DataProvidedTime_Cov == null ? "" : DateTimeHelper.ConvertToDateTimeString((DateTime)o.DataProvidedTime_Cov)))
                .ForMember(v => v.RentDate_Cov, v => v.MapFrom(o => o.RentDate_Cov == null ? "" : DateTimeHelper.ConvertToDateTimeString((DateTime)o.RentDate_Cov)))
                .ForMember(v => v.LeaseCancellationDate_Cov, v => v.MapFrom(o => o.LeaseCancellationDate_Cov == null ? "" : DateTimeHelper.ConvertToDateTimeString((DateTime)o.LeaseCancellationDate_Cov)))
                .ForMember(v => v.CreateTime, v => v.MapFrom(o => DateTimeHelper.ConvertToDateTimeString(o.CreateTime)))
                .ReverseMap();
        }
    }
}
