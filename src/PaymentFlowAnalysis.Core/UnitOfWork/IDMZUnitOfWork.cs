using PaymentFlowAnalysis.Core.Repositories.Interfaces;
using System;
using System.Data;

namespace PaymentFlowAnalysis.Core.UnitOfWork
{
    public interface IDMZUnitOfWork : IUnitOfWorkBase
    {
        IBlackAccountRepository BlackAccountRepository { get; }
        IBlackAccountEmailRepository BlackAccountEmailRepository { get; }
        IBlackAccountIPRepository BlackAccountIPRepository { get; }
        IBlackAccountPhoneRepository BlackAccountPhoneRepository { get; }
    }
}
