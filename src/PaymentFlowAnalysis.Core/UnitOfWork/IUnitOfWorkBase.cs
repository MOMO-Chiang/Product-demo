using PaymentFlowAnalysis.Core.DbConnectionFactory;
using PaymentFlowAnalysis.Core.Repositories.Interfaces;
using System;
using System.Data;

namespace PaymentFlowAnalysis.Core.UnitOfWork
{
    public interface IUnitOfWorkBase : IDisposable
    {
        IDbTransaction Transaction { get; }

        void BeginTransaction();

        void Commit();

        void RollBack();


    }
}
