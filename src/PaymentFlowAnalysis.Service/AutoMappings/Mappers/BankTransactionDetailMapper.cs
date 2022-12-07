using System;
using AutoMapper;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Service.Models;
using PaymentFlowAnalysis.Common.Enums;
using System.Linq;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Common.Helpers;
using PaymentFlowAnalysis.Core.UnitOfWork;
using System.Collections.Generic;

namespace PaymentFlowAnalysis.Service.AutoMappings.Mappers
{
    public class BankTransactionDetailMapper : Profile
    {
        public BankTransactionDetailMapper()
        {
            CreateMap<BankTransactionDetail, BankTransactionDetailDTO>()
                .ForMember(v => v.PayoutMoneyAmount, v => v.MapFrom(o => o.PayoutMoneyAmount == "" ? "" : Convert.ToDouble(o.PayoutMoneyAmount).ToString("N0")))
                .ForMember(v => v.DepositMoneyAmount, v => v.MapFrom(o => o.DepositMoneyAmount == "" ? "" : Convert.ToDouble(o.DepositMoneyAmount).ToString("N0")))
                .ForMember(v => v.Balance, v => v.MapFrom(o => o.Balance == "" ? "" : Convert.ToDouble(o.Balance).ToString("N0")))
                .ReverseMap();
        }
    }
}
