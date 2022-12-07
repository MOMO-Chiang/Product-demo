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
    public class BankCodeRepository : RepositoryBase<QueryBankCode>, IBankCodeRepository
    {
        public BankCodeRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {
        }
        public IEnumerable<QueryBankCode> GetBankName(string bankCode)
        {
            string sqlSelect = $"SELECT * FROM {GetTableNameMapper()} where BankCode = @bankCode";
            return Connection.Query<QueryBankCode>(sqlSelect, new { bankCode });
        }

        public IEnumerable<QueryBankCode> GetBankBranchName(string bankBranchCode)
        {
            string sqlSelect = $"SELECT * FROM {GetTableNameMapper()} where BankBranchCode = @bankBranchCode";
            return Connection.Query<QueryBankCode>(sqlSelect, new { bankBranchCode });
        }
    }
}
