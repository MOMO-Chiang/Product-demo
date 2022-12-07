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
    public class CryptoPersonalInfoPhoneRepository : RepositoryBase<CryptoPersonalInfoPhone_API>, ICryptoPersonalInfoPhoneRepository
    {
        public CryptoPersonalInfoPhoneRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }

        public IEnumerable<CryptoPersonalInfoPhone_API> SearchPaginated(CryptoPersonalInfoPhoneSearchModel entity)
        {
            string sqlSelect = $"SELECT * FROM {GetTableNameMapper()} /**where**/";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sqlSelect);
            
            if (entity.Phone != null)
            {
                builder.Where($"Phone = @Phone", new { entity.Phone });
            }

            var result = Connection.QueryMultiple(template.RawSql, template.Parameters);
            IEnumerable<CryptoPersonalInfoPhone_API> results = result.Read<CryptoPersonalInfoPhone_API>();

            return results;
        }

        public Tuple<IEnumerable<CryptoPersonalInfoPhone_API>, int> SearchPhone(string PersonalInfoId, PaginationWithSortedQueryModel paginated)
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

            if (PersonalInfoId != null)
            {
                builder.Where($"PersonalInfoId = @PersonalInfoId", new { PersonalInfoId });
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
            IEnumerable<CryptoPersonalInfoPhone_API> results = result.Read<CryptoPersonalInfoPhone_API>();

            int totalCount = result.ReadFirst<int>();
            Connection.Close();

            return new Tuple<IEnumerable<CryptoPersonalInfoPhone_API>, int>(results, totalCount);
        }
    }
}
