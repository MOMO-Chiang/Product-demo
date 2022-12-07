using Dapper;
using PaymentFlowAnalysis.Core.DbConnectionFactory;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Core.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Transactions;
using static Dapper.SqlBuilder;

namespace PaymentFlowAnalysis.Core.Repositories
{
    public class BankAccountImportRepository : RepositoryBase<BankAccountImport>, IBankAccountImportRepository
    {
        public BankAccountImportRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {
        }
        public IEnumerable<BankAccountImport> GetByMD5(string md5)
        {
            string sqlSelect = $"SELECT * FROM {GetTableNameMapper()} where FileMD5 = @md5";
            return Connection.Query<BankAccountImport>(sqlSelect, new { md5 });
        }

    }
}
