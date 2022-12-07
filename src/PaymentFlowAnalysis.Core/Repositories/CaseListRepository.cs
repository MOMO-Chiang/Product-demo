using Dapper;
using PaymentFlowAnalysis.Common.Enums;
using PaymentFlowAnalysis.Core.DbConnectionFactory;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Core.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories
{
    public class CaseListRepository : RepositoryBase<CaseList>, ICaseListRepository
    {
        private readonly string _tableName;
        public CaseListRepository(IDbConnectionFactory dbConnectionFactory, DepartmentDBInfo departmentInfo)
            : base(dbConnectionFactory, departmentInfo.ConnectionName)
        {
            _tableName = departmentInfo.TableName;
        }

        public override IEnumerable<CaseList> GetAll()
        {
            return Connection.Query<CaseList>($"SELECT * FROM {_tableName}");
        }

        public IEnumerable<CaseList> GetByHandleMan(string handManId)
        {
            string sql = $@"SELECT * FROM {_tableName}
                        WHERE (Cexeresult <> N'結案' AND Cexeresult <> N'已結案')
                          AND (HandManID = @HandManID OR OutHandManID = @HandManID)";

            return Connection.Query<CaseList>(sql, new { handManId });
        }
    }
}
