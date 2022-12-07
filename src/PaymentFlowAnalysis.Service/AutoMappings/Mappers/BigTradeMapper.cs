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
    public class BigTradeMapper : Profile
    {
        public BigTradeMapper()
        {
            CreateMap<BigTrade, BigTradeDTO>()
                .ForMember(v => v.RemitTime, v => v.MapFrom(o => o.RemitTime == null ? "" : DateTimeHelper.ConvertToDateTimeString((DateTime)o.RemitTime)))
                .ForMember(v => v.DeclarationTime, v => v.MapFrom(o => o.DeclarationTime == null ? "" : DateTimeHelper.ConvertToDateTimeString((DateTime)o.DeclarationTime)))
                .ForMember(v => v.OpenAccountDate, v => v.MapFrom(o => o.OpenAccountDate == null ? "" : DateTimeHelper.ConvertToDateTimeString((DateTime)o.OpenAccountDate)))
                .ForMember(v => v.RemitAmount, v => v.MapFrom(o => Convert.ToDouble(o.RemitAmount).ToString("N0")))
                .ReverseMap();
        }
    }
}
