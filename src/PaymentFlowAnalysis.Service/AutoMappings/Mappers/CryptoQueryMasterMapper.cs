using System;
using AutoMapper;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Service.Models;
using PaymentFlowAnalysis.Common.Enums;
using System.Linq;
using PaymentFlowAnalysis.Common.Helpers;

namespace PaymentFlowAnalysis.Service.AutoMappings.Mappers
{
    public class CryptoQueryMasterMapper : Profile
    {
        public CryptoQueryMasterMapper()
        {
            CreateMap<CryptoQueryMaster, CryptoQueryMasterDTO>()
                .ForMember(v => v.RequestAgency, v => v.MapFrom(o => Enum.GetValues(typeof(AgencyTypeEnum)).Cast<AgencyTypeEnum>().FirstOrDefault(s=>(short)s == o.RequestAgency)))
                .ForMember(v => v.QueryConditionType, v => v.MapFrom(o => Enum.GetValues(typeof(QueryConditionType)).Cast<QueryConditionType>().FirstOrDefault(s => (short)s == o.QueryConditionType)))
                .ForMember(v => v.QueryOrderTime, v => v.MapFrom(o => DateTimeHelper.ConvertToDateTimeString(o.QueryOrderTime)))
                .ReverseMap();
        }
    }
}
