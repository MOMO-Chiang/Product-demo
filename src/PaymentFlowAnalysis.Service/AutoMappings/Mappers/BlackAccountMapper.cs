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
    public class BlackAccountMapper : Profile
    {
        public BlackAccountMapper()
        {
            CreateMap<BlackAccountPageInfo, BlackAccountPageInfoDTO>()
                .ForMember(v => v.ExchangeTypeCodeStr, v => v.MapFrom(o => Enum.GetValues(typeof(AgencyTypeEnum)).Cast<AgencyTypeEnum>().FirstOrDefault(s=>(short)s == o.ExchangeTypeCode)))
                .ForMember(v => v.RisklevelStr, v => v.MapFrom(o => Enum.GetValues(typeof(RiskLevel)).Cast<RiskLevel>().FirstOrDefault(s => (short)s == o.Risklevel)))
                .ForMember(v => v.UpdateTime,v=>v.MapFrom(o => DateTimeHelper.ConvertToDateTimeString(o.UpdateTime)))
                .ReverseMap();
        }
    }
}
