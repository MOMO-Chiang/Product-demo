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
    public class BankTransactionImportRepository : RepositoryBase<BankTransactionImport>, IBankTransactionImportRepository
    {
        public BankTransactionImportRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {
        }
        public IEnumerable<BankTransactionImport> GetByMD5(string md5)
        {
            string sqlSelect = $"SELECT * FROM {GetTableNameMapper()} where FileMD5 = @md5";
            return Connection.Query<BankTransactionImport>(sqlSelect, new { md5 });
        }

        public IEnumerable<BankTransactionImport> GetBankTransactionImportSeq(List<string> bankTransactionImportSeqs)
        {
            string sqlSelect = $"SELECT * FROM {GetTableNameMapper()} where BankAccountImportSeq IN @bankTransactionImportSeqs";
            return Connection.Query<BankTransactionImport>(sqlSelect, new { bankTransactionImportSeqs });
        }

    }
}
