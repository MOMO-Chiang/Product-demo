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
    public class BigTradeRepository : RepositoryBase<BigTrade>, IBigTradeRepository
	{
        public BigTradeRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }

        public Tuple<IEnumerable<BigTrade>, int> SearchPaginated(BigTradeSearchModel entity, PaginationWithSortedQueryModel paginated)
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

            if (entity.RemitterId != null)
            {
                builder.Where($"RemitterId = @RemitterId", new { entity.RemitterId });
            }
            if (entity.RemitterName != null)
            {
                builder.Where($"RemitterName = @RemitterName", new { entity.RemitterName });
            }
            if (entity.RemitterPhone != null)
            {
                builder.Where($"RemitterPhone = @RemitterPhone", new { entity.RemitterPhone });
            }
            if (entity.CustomerAddress != null)
            {
                builder.Where($"CustomerAddress = @CustomerAddress", new { entity.CustomerAddress });
            }
            if (entity.BeneficiaryId != null)
            {
                builder.Where($"BeneficiaryId = @BeneficiaryId", new { entity.BeneficiaryId });
            }

            if (entity.Beneficiary != null)
            {
                builder.Where($"Beneficiary = @Beneficiary", new { entity.Beneficiary });
            }

            if (entity.RemitTimeStart != null)
            {
                builder.Where($"RemitTime >= @RemitTimeStart", new { entity.RemitTimeStart });
            }

            if (entity.RemitTimeEnd != null)
            {
                builder.Where($"RemitTime <= @RemitTimeEnd", new { entity.RemitTimeEnd });
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
            IEnumerable<BigTrade> results = result.Read<BigTrade>();
            int totalCount = result.ReadFirst<int>();

            return new Tuple<IEnumerable<BigTrade>, int>(results, totalCount);
        }

        public IEnumerable<BigTrade> Search(BigTradeSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sql = $"SELECT * FROM {GetTableNameMapper()} /**where**/ /**orderby**/";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sql);
 
            if (!string.IsNullOrEmpty(entity.RemitterId))
            {
                builder.Where($"RemitterId = @RemitterId", new { entity.RemitterId });
            }
            if (!string.IsNullOrEmpty(entity.RemitterName))
            {
                builder.Where($"RemitterName = @RemitterName", new { entity.RemitterName });
            }
            if (!string.IsNullOrEmpty(entity.RemitterPhone))
            {
                builder.Where($"RemitterPhone = @RemitterPhone", new { entity.RemitterPhone });
            }
            if (!string.IsNullOrEmpty(entity.CustomerAddress))
            {
                builder.Where($"CustomerAddress = @CustomerAddress", new { entity.CustomerAddress });
            }
            if (!string.IsNullOrEmpty(entity.BeneficiaryId))
            {
                builder.Where($"BeneficiaryId = @BeneficiaryId", new { entity.BeneficiaryId });
            }

            if (!string.IsNullOrEmpty(entity.Beneficiary))
            {
                builder.Where($"Beneficiary = @Beneficiary", new { entity.Beneficiary });
            }

            if (entity.RemitTimeStart != null)
            {
                builder.Where($"RemitTime >= @RemitTimeStart", new { entity.RemitTimeStart });
            }

            if (entity.RemitTimeEnd != null)
            {
                builder.Where($"RemitTime <= @RemitTimeEnd", new { entity.RemitTimeEnd });
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

            IEnumerable<BigTrade> results = Connection.Query<BigTrade>(template.RawSql, template.Parameters);

            return results;
        }

    }
}
