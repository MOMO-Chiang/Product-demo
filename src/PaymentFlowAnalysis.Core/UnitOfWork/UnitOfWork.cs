using PaymentFlowAnalysis.Core.DbConnectionFactory;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Repositories;
using PaymentFlowAnalysis.Core.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.UnitOfWork
{
    public class UnitOfWork : UnitOfWorkBase, IUnitOfWork
    {
        private const string connectionName = "MJIB";
        private IDbConnectionFactory _dbConnectionFactory;
        private ISysUserListRepository _sysUserListRepository;
        private IBankAccountInfoRepository _IbankAccountInfoRepository;
        private ICryptoWallertInfoReceiveRepository _IcryptoWallertInfoReceiveRepository;
        private IBlackAccountRepository _IblackAccountRepository;
        private IBlackAccountEmailRepository _IblackAccountEmailRepository;
        private IBlackAccountIPRepository _IblackAccountIPRepository;
        private IBlackAccountPhoneRepository _IblackAccountPhoneRepository;
        private ICryptoQueryMasterRepository _cryptoQueryMasterRepository;
        private ICryptoQueryDetailRepository _cryptoQueryDetailRepository;
        private IPersonalInfoSearchRepository _personalInfoSearchRepository;
        private IPersonalInfoDetailRepository _personalInfoDetailRepository;
        private ICryptoTransactionInfoRepository _cryptoTransactionInfoRepository;
        private IMainLogRepository _mainLogRepository;
        private IBankSafeDepositBoxRepository _IbankSafeDepositBoxRepository;
        private IBigTradeRepository _IbigTradeRepository;
        private IBankAccountImportRepository _IbankAccountImportRepository;
        private IBankSafeDepositBoxImportRepository _IbankSafeDepositBoxImportRepository;
        private IBigTradeImportRepository _IbigTradeImportRepository;
        private IBankTransactionImportRepository _IbankTransactionImportRepository;
        private IBankTransactionRepository _IbankTransactionRepository;
        private ICryptoPersonalInfoPhoneRepository _cryptoPersonalInfoPhoneRepository;
        private ICryptoPersonalInfoWalletRepository _cryptoPersonalInfoWalletRepository;
        private INotificationInfoRepository _notificationInfoRepository;
        private ICryptoPersonalInfoIPRepository _cryptoPersonalInfoIPRepository;
        private ICryptoPersonalInfoPictureRepository _cryptoPersonalInfoPictureRepository;
        private IBankCodeRepository _bankCodeRepository;
        private ICryptoPersonalInfoRepository _cryptoPersonalInfoRepository;

        public UnitOfWork(IDbConnectionFactory dbConnectionFactory)
            : base(dbConnectionFactory, connectionName)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }

        public ISysUserListRepository SysUserListRepository =>
            _sysUserListRepository ?? (_sysUserListRepository = new SysUserListRepository(_dbConnectionFactory, connectionName));

        public IBankAccountInfoRepository BankAccountInfoRepository =>
            _IbankAccountInfoRepository ?? (_IbankAccountInfoRepository = new BankAccountInfoRepository(_dbConnectionFactory, connectionName));
        public ICryptoWallertInfoReceiveRepository CryptoWallertInfoReceiveRepository =>
            _IcryptoWallertInfoReceiveRepository ?? (_IcryptoWallertInfoReceiveRepository = new CryptoWallertInfoReceiveRepository(_dbConnectionFactory, connectionName));
        public IBlackAccountRepository BlackAccountRepository =>
            _IblackAccountRepository ?? (_IblackAccountRepository = new BlackAccountRepository(_dbConnectionFactory, connectionName));
        public IBlackAccountEmailRepository BlackAccountEmailRepository =>
            _IblackAccountEmailRepository ?? (_IblackAccountEmailRepository = new BlackAccountEmailRepository(_dbConnectionFactory, connectionName));
        public IBlackAccountIPRepository BlackAccountIPRepository =>
            _IblackAccountIPRepository ?? (_IblackAccountIPRepository = new BlackAccountIPRepository(_dbConnectionFactory, connectionName));
        public IBlackAccountPhoneRepository BlackAccountPhoneRepository =>
            _IblackAccountPhoneRepository ?? (_IblackAccountPhoneRepository = new BlackAccountPhoneRepository(_dbConnectionFactory, connectionName));
        public ICryptoQueryMasterRepository CryptoQueryMasterRepository =>
            _cryptoQueryMasterRepository ?? (_cryptoQueryMasterRepository = new CryptoQueryMasterRepository(_dbConnectionFactory, connectionName));
        public ICryptoQueryDetailRepository CryptoQueryDetailRepository =>
            _cryptoQueryDetailRepository ?? (_cryptoQueryDetailRepository = new CryptoQueryDetailRepository(_dbConnectionFactory, connectionName));
        public IPersonalInfoSearchRepository PersonalInfoSearchRepository =>
            _personalInfoSearchRepository ?? (_personalInfoSearchRepository = new PersonalInfoSearchRepository(_dbConnectionFactory, connectionName));
        public IPersonalInfoDetailRepository PersonalInfoDetailRepository =>
        _personalInfoDetailRepository ?? (_personalInfoDetailRepository = new PersonalInfoDetailRepository(_dbConnectionFactory, connectionName));
        public ICryptoTransactionInfoRepository CryptoTransactionInfoRepository =>
        _cryptoTransactionInfoRepository ?? (_cryptoTransactionInfoRepository = new CryptoTransactionInfoRepository(_dbConnectionFactory, connectionName));
        public ICryptoPersonalInfoPhoneRepository CryptoPersonalInfoPhoneRepository =>
        _cryptoPersonalInfoPhoneRepository ?? (_cryptoPersonalInfoPhoneRepository = new CryptoPersonalInfoPhoneRepository(_dbConnectionFactory, connectionName));
        public ICryptoPersonalInfoWalletRepository CryptoPersonalInfoWalletRepository =>
        _cryptoPersonalInfoWalletRepository ?? (_cryptoPersonalInfoWalletRepository = new CryptoPersonalInfoWalletRepository(_dbConnectionFactory, connectionName));
        public IBankSafeDepositBoxRepository BankSafeDepositBoxRepository =>
            _IbankSafeDepositBoxRepository ?? (_IbankSafeDepositBoxRepository = new BankSafeDepositBoxRepository(_dbConnectionFactory, connectionName));
        public IBigTradeRepository BigTradeRepository =>
           _IbigTradeRepository ?? (_IbigTradeRepository = new BigTradeRepository(_dbConnectionFactory, connectionName));
        public IBankAccountImportRepository BankAccountImportRepository =>
           _IbankAccountImportRepository ?? (_IbankAccountImportRepository = new BankAccountImportRepository(_dbConnectionFactory, connectionName));
        public IBankSafeDepositBoxImportRepository BankSafeDepositBoxImportRepository =>
           _IbankSafeDepositBoxImportRepository ?? (_IbankSafeDepositBoxImportRepository = new BankSafeDepositBoxImportRepository(_dbConnectionFactory, connectionName));
        public IBigTradeImportRepository BigTradeImportRepository =>
          _IbigTradeImportRepository ?? (_IbigTradeImportRepository = new BigTradeImportRepository(_dbConnectionFactory, connectionName));
        public IBankTransactionImportRepository BankTransactionImportRepository =>
         _IbankTransactionImportRepository ?? (_IbankTransactionImportRepository = new BankTransactionImportRepository(_dbConnectionFactory, connectionName));
        public IBankTransactionRepository BankTransactionRepository =>
         _IbankTransactionRepository ?? (_IbankTransactionRepository = new BankTransactionRepository(_dbConnectionFactory, connectionName));
        public ICryptoPersonalInfoIPRepository CryptoPersonalInfoIPRepository =>
          _cryptoPersonalInfoIPRepository ?? (_cryptoPersonalInfoIPRepository = new CryptoPersonalInfoIPRepository(_dbConnectionFactory, connectionName));
        public ICryptoPersonalInfoPictureRepository CryptoPersonalInfoPictureRepository =>
          _cryptoPersonalInfoPictureRepository ?? (_cryptoPersonalInfoPictureRepository = new CryptoPersonalInfoPictureRepository(_dbConnectionFactory, connectionName));
        public IBankCodeRepository BankCodeRepository =>
          _bankCodeRepository ?? (_bankCodeRepository = new BankCodeRepository(_dbConnectionFactory, connectionName));
        public ICryptoPersonalInfoRepository CryptoPersonalInfoRepository =>
        _cryptoPersonalInfoRepository ?? (_cryptoPersonalInfoRepository = new CryptoPersonalInfoRepository(_dbConnectionFactory, connectionName));

        public IMainLogRepository MainLogRepository =>
        _mainLogRepository ?? (_mainLogRepository = new MainLogRepository(_dbConnectionFactory, connectionName));
        public INotificationInfoRepository NotificationInfoRepository =>
        _notificationInfoRepository ?? (_notificationInfoRepository = new NotificationInfoRepository(_dbConnectionFactory, connectionName));


        protected override void ResetRepositories()
        {
            _sysUserListRepository = null;
            _IbankAccountInfoRepository = null;
            _IcryptoWallertInfoReceiveRepository = null;
            _IblackAccountRepository = null;
            _IblackAccountEmailRepository = null;
            _IblackAccountIPRepository = null;
            _IblackAccountPhoneRepository = null;
            _cryptoQueryMasterRepository = null;
            _cryptoQueryDetailRepository = null;
            _personalInfoSearchRepository = null;
            _personalInfoDetailRepository = null;
            _cryptoTransactionInfoRepository = null;
            _mainLogRepository = null;
            _cryptoPersonalInfoPhoneRepository = null;
            _cryptoPersonalInfoWalletRepository = null;
            _notificationInfoRepository = null;
        }
    }
}
