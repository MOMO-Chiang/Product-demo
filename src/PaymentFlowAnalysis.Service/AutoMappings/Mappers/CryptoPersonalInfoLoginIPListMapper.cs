using System;
using AutoMapper;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Service.Models;
using PaymentFlowAnalysis.Common.Enums;
using System.Linq;
using PaymentFlowAnalysis.Common.Helpers;

namespace PaymentFlowAnalysis.Service.AutoMappings.Mappers
{
    public class CryptoPersonalInfoLoginIPListMapper : Profile
    {
        public CryptoPersonalInfoLoginIPListMapper()
        {
            CreateMap<CryptoPersonalInfoLoginIPList_API, CryptoPersonalInfoLoginIPListDTO>()
                .ForMember(v => v.LoginTime_Cov, v => v.MapFrom(o => DateTimeHelper.ConvertToDateTimeString(o.LoginTime_Cov)))
                .ForMember(v => v.CreateTime, v => v.MapFrom(o => DateTimeHelper.ConvertToDateTimeString(o.CreateTime)))
                .ReverseMap();
        }
    }
}
