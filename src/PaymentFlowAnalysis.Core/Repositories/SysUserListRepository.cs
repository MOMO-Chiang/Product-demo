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
    public class SysUserListRepository : RepositoryBase<SysUserList>, ISysUserListRepository
    {
        public SysUserListRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }

        public Tuple<IEnumerable<SysUserList>, int> SearchPaginated(SysUserListSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sqlSelect = $"SELECT * FROM {GetTableNameMapper()} /**where**/";
            string sql = $@"
                WITH _data AS (
                    {sqlSelect}
                )
                SELECT * FROM _data
                /**orderby**/
                OFFSET (@page - 1) * @pageSize ROWS
                FETCH NEXT @pageSize ROWS ONLY;

                WITH _data AS (
                    {sqlSelect}
                )
                SELECT COUNT(*) FROM _data;";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sql, new { paginated.Page, paginated.PageSize});

            if (entity.UserId != null)
            {
                builder.Where($"UserId = @UserId", new { entity.UserId });
            }
            if (entity.OrderUserName != null)
            {
                builder.Where($"OrderUserName = @OrderUserName", new { entity.OrderUserName });
            }
            if (entity.OrderUserEmail != null)
            {
                builder.Where($"OrderUserEmail = @OrderUserEmail", new { entity.OrderUserEmail });
            }
            if (entity.UnitCode != null)
            {
                builder.Where($"UnitCode = @UnitCode", new { entity.UnitCode });
            }
            if (entity.UnitName != null)
            {
                builder.Where($"UnitName = @UnitName", new { entity.UnitName });
            }
            if (entity.OrderUserPhone != null)
            {
                builder.Where($"OrderUserPhone = @OrderUserPhone", new { entity.OrderUserPhone });
            }
            if (!string.IsNullOrEmpty(paginated.SortedColumn))
            {
                if (paginated.SortedType == (int)Common.Enums.SortedType.DESC)
                {
                    builder.OrderBy(paginated.SortedColumn + " DESC");
                }
                else
                {
                    builder.OrderBy(paginated.SortedColumn);
                }
            }
            else
            {
                builder.OrderBy("(SELECT NULL)");
            }

            var result = Connection.QueryMultiple(template.RawSql, template.Parameters);
            IEnumerable<SysUserList> results = result.Read<SysUserList>();
            int totalCount = result.ReadFirst<int>();

            return new Tuple<IEnumerable<SysUserList>, int>(results, totalCount);
        }
    }
}
