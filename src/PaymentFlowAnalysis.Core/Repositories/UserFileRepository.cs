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
    public class UserFileRepository : RepositoryBase<UserFile>, IUserFileRepository
    {
        private readonly string _tableName;
        public UserFileRepository(IDbConnectionFactory dbConnectionFactory, DepartmentDBInfo departmentInfo)
            : base(dbConnectionFactory, departmentInfo.ConnectionName)
        {
            _tableName = departmentInfo.TableName;
        }

        public override IEnumerable<UserFile> GetAll()
        {
            return Connection.Query<UserFile>($"SELECT * FROM {_tableName}");
        }

        public IEnumerable<UserFile> GetByHandleMan(string handManId)
        {
            string sql = $@"SELECT * FROM {_tableName}
                        WHERE (Cexeresult <> N'結案' AND Cexeresult <> N'已結案')
                          AND (HandManID = @HandManID OR OutHandManID = @HandManID)";

            return Connection.Query<UserFile>(sql, new { handManId });
        }

        public IEnumerable<UserFile> GetByFileNo(string fileNo)
        {
            string sql = $@"SELECT * FROM {_tableName}
                        WHERE (Cexeresult <> N'結案' AND Cexeresult <> N'已結案')
                          AND (FileNo = @FileNo)";

            return Connection.Query<UserFile>(sql, new { fileNo });
        }
    }
}
