using System;
using AutoMapper;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Service.Models;
using PaymentFlowAnalysis.Common.Enums;
using System.Linq;
using PaymentFlowAnalysis.Common.Helpers;

namespace PaymentFlowAnalysis.Service.AutoMappings.Mappers
{
    public class CryptoWallertInfoReceiveMapper : Profile
    {
        public CryptoWallertInfoReceiveMapper()
        {
            CreateMap<CryptoWallertInfoReceive, CryptoWallertInfoReceiveDTO>()
                .ForMember(v => v.ExchangeTypeCodeStr, v => v.MapFrom(o => Enum.GetValues(typeof(AgencyTypeEnum)).Cast<AgencyTypeEnum>().FirstOrDefault(s=>(short)s == o.ExchangeTypeCode)))
                .ForMember(v => v.PublishTime_Cov, v => v.MapFrom(o => DateTimeHelper.ConvertToDateTimeString(o.PublishTime_Cov)))
                .ForMember(v => v.DistributionTime_Cov, v => v.MapFrom(o => DateTimeHelper.ConvertToDateTimeString(o.DistributionTime_Cov)))
                .ForMember(v => v.CreateTime, v => v.MapFrom(o => DateTimeHelper.ConvertToDateTimeString(o.CreateTime)))
                .ReverseMap();
        }
    }
}
