using Dapper;
using Dapper.Contrib.Extensions;
using PaymentFlowAnalysis.Core.DbConnectionFactory;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Core.Repositories.Interfaces;
using PaymentFlowAnalysis.Core.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Transactions;
using static Dapper.SqlBuilder;

namespace PaymentFlowAnalysis.Core.Repositories
{
    public class BlackAccountIPRepository : RepositoryBase<BlackAccountIP>, IBlackAccountIPRepository
    {
        public BlackAccountIPRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }

        public IEnumerable<BlackAccountIP> GetByWalletAddress(string walletAddress)
        {
            string sqlSelect = $"SELECT * FROM {GetTableNameMapper()} where WalletAddress = @walletAddress";
            return Connection.Query<BlackAccountIP>(sqlSelect, new { walletAddress });
        }
    }
}
