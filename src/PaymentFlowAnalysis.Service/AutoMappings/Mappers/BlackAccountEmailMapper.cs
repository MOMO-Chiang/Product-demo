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
    public class BlackAccountEmailMapper : Profile
    {
        public BlackAccountEmailMapper()
        {
            CreateMap<BlackAccountEmail, BlackAccountEmailDTO>()
                .ForMember(v => v.UpdateTime, v => v.MapFrom(o => DateTimeHelper.ConvertToDateTimeString(o.UpdateTime)))
                .ReverseMap();
        }
    }
}
