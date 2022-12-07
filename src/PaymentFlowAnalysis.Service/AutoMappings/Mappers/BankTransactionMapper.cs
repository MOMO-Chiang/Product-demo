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
    public class BankTransactionMapper : Profile
    {
        private readonly IUnitOfWork _unitOfWork;
        public BankTransactionMapper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            CreateMap<BankTransaction, BankTransactionDTO>()
                .ForMember(v => v.CreateTime, v => v.MapFrom(o => DateTimeHelper.ConvertToDateTimeString(o.CreateTime)))
                .ForMember(v => v.BankName, v => v.MapFrom(o => GetBankName(o.TransactionAccountId.Substring(0, 3))))
                .ForMember(v => v.BankBranchName, v => v.MapFrom(o => GetBankBranchName(o.TransactionAccountId.Substring(0, 7))))
                .ForMember(v => v.PayoutMoneyAmount, v => v.MapFrom(o => o.PayoutMoneyAmount == "" ? "" : Convert.ToDouble(o.PayoutMoneyAmount).ToString("N0")))
                .ForMember(v => v.DepositMoneyAmount, v => v.MapFrom(o => o.DepositMoneyAmount == "" ? "" : Convert.ToDouble(o.DepositMoneyAmount).ToString("N0")))
                .ForMember(v => v.Balance, v => v.MapFrom(o => o.Balance == "" ? "" : Convert.ToDouble(o.Balance).ToString("N0")))
                .ReverseMap();
        }

        public string GetBankName(string code)
        {
            return _unitOfWork.BankCodeRepository.GetBankName(code).FirstOrDefault().BankName;
        }

        public string GetBankBranchName(string code)
        {
            return _unitOfWork.BankCodeRepository.GetBankBranchName(code).FirstOrDefault().BankBranchName;
        }
    }
}
