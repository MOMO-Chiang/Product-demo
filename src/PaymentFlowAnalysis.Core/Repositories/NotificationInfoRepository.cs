using Dapper;
using PaymentFlowAnalysis.Core.DbConnectionFactory;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Core.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Dapper.SqlBuilder;

namespace PaymentFlowAnalysis.Core.Repositories
{
    public class NotificationInfoRepository : RepositoryBase<NotificationInfo>, INotificationInfoRepository
    {
        public NotificationInfoRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }

        public IEnumerable<NotificationInfo> GetByUserId(string userId)
        {
            string sql = @"SELECT * FROM [NotificationInfo] WHERE [UserId] = @userId";
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("userId", userId);

            return Connection.Query<NotificationInfo>(sql, dynamicParameters);
        }

        public Tuple<IEnumerable<NotificationInfo>, int> GetPaginatedByUserId(string userId, PaginationWithSortedQueryModel paginated)
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
            Template template = builder.AddTemplate(sql, new { paginated.Page, paginated.PageSize });

            builder.Where($"[UserId] = @userId", new { userId });
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
            IEnumerable<NotificationInfo> results = result.Read<NotificationInfo>();
            int totalCount = result.ReadFirst<int>();

            return new Tuple<IEnumerable<NotificationInfo>, int>(results, totalCount);
        }

        public int GetUnReadCount(string userId)
        {
            string sql = $@"SELECT COUNT(*) FROM {GetTableNameMapper()}
                            WHERE [UserId] = @userId AND [IsRead] = @isRead";
            DynamicParameters dynParameters = new DynamicParameters();
            dynParameters.Add("userId", userId);
            dynParameters.Add("isRead", false);

            return Connection.QueryFirstOrDefault<int>(sql, dynParameters);
        }

        public int UpdateReadStatusByUserId(string userId, bool isRead)
        {
            string sql = $@"UPDATE {GetTableNameMapper()}
                            SET [IsRead] = @isRead
                            WHERE [UserId] = @userId";
            DynamicParameters dynParameters = new DynamicParameters();
            dynParameters.Add("userId", userId);
            dynParameters.Add("isRead", isRead);

            return Connection.Execute(sql, dynParameters);
        }
    }
}
