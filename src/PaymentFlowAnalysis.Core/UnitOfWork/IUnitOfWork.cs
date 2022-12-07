using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Repositories.Interfaces;

namespace PaymentFlowAnalysis.Core.UnitOfWork
{
    public interface IUnitOfWork : IUnitOfWorkBase
    {
        ISysUserListRepository SysUserListRepository { get; }
        IBankAccountInfoRepository BankAccountInfoRepository { get; }
        ICryptoWallertInfoReceiveRepository CryptoWallertInfoReceiveRepository { get; }
        IBlackAccountRepository BlackAccountRepository { get; }
        IBlackAccountEmailRepository BlackAccountEmailRepository { get; }
        IBlackAccountIPRepository BlackAccountIPRepository { get; }
        IBlackAccountPhoneRepository BlackAccountPhoneRepository { get; }
        ICryptoQueryMasterRepository CryptoQueryMasterRepository { get; }
        ICryptoQueryDetailRepository CryptoQueryDetailRepository { get; }
        IPersonalInfoSearchRepository PersonalInfoSearchRepository { get; }
        IPersonalInfoDetailRepository PersonalInfoDetailRepository { get; }
        ICryptoTransactionInfoRepository CryptoTransactionInfoRepository { get; }
        IMainLogRepository MainLogRepository { get; }
        IBankSafeDepositBoxRepository BankSafeDepositBoxRepository { get; }
        IBigTradeRepository BigTradeRepository { get; }
        IBankAccountImportRepository BankAccountImportRepository { get; }
        IBankSafeDepositBoxImportRepository BankSafeDepositBoxImportRepository { get; }
        IBigTradeImportRepository BigTradeImportRepository { get; }
        IBankTransactionImportRepository BankTransactionImportRepository { get; }
        IBankTransactionRepository BankTransactionRepository { get; }
        ICryptoPersonalInfoPhoneRepository CryptoPersonalInfoPhoneRepository { get; }
        ICryptoPersonalInfoWalletRepository CryptoPersonalInfoWalletRepository { get; }
        INotificationInfoRepository NotificationInfoRepository { get; }
        ICryptoPersonalInfoIPRepository CryptoPersonalInfoIPRepository { get; }
        ICryptoPersonalInfoPictureRepository CryptoPersonalInfoPictureRepository { get; }
        IBankCodeRepository BankCodeRepository { get; }
        ICryptoPersonalInfoRepository CryptoPersonalInfoRepository { get; }
    }
}
