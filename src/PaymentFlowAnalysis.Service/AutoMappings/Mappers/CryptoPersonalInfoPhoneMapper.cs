using System;
using AutoMapper;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Service.Models;
using PaymentFlowAnalysis.Common.Enums;
using System.Linq;
using PaymentFlowAnalysis.Common.Helpers;

namespace PaymentFlowAnalysis.Service.AutoMappings.Mappers
{
    public class CryptoPersonalInfoPhoneMapper : Profile
    {
        public CryptoPersonalInfoPhoneMapper()
        {
            CreateMap<CryptoPersonalInfoPhone_API, CryptoPersonalInfoPhoneDTO>()
                .ForMember(v => v.CreateTime, v => v.MapFrom(o => DateTimeHelper.ConvertToDateTimeString(o.CreateTime)))
                .ReverseMap();
        }
    }
}
