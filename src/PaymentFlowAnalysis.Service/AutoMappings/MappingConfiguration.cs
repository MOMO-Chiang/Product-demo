using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using PaymentFlowAnalysis.Core.UnitOfWork;
using PaymentFlowAnalysis.Service.AutoMappings.Mappers;

namespace PaymentFlowAnalysis.Service.AutoMappings
{
    public class MappingConfiguration
    {
        public static IMapper CreateMapper(IUnitOfWork unitOfWork)
        {
            var mappingConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new CryptoWallertInfoReceiveMapper());
                cfg.AddProfile(new BlackAccountMapper());
                cfg.AddProfile(new BlackAccountPhoneMapper());
                cfg.AddProfile(new BlackAccountEmailMapper());
                cfg.AddProfile(new BlackAccountIPMapper());
                cfg.AddProfile(new BankAccountInfoMapper());
                cfg.AddProfile(new BankTransactionMapper(unitOfWork));
                cfg.AddProfile(new BankSafeDepositBoxMapper());
                cfg.AddProfile(new BigTradeMapper());
                cfg.AddProfile(new CryptoQueryMapper());
                cfg.AddProfile(new BankTransactionDetailMapper());
                cfg.AddProfile(new CryptoQueryMasterMapper());
                cfg.AddProfile(new CryptoQueryDetailPersonalMapper(unitOfWork));
                cfg.AddProfile(new CryptoPersonalInfoLoginIPListMapper());
                cfg.AddProfile(new CryptoPersonalInfoPhoneMapper());
                cfg.AddProfile(new CryptoTransactionInfoMapper(unitOfWork));
            });

            return mappingConfig.CreateMapper();
        }
    }
}
