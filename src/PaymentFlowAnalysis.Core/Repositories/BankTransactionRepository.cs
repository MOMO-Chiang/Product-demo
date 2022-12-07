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
    public class BankTransactionRepository : RepositoryBase<BankTransaction>, IBankTransactionRepository
	{
        public BankTransactionRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }

        public Tuple<IEnumerable<BankTransaction>, int> SearchPaginated(BankTransactionSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sqlSelect = $"SELECT MAX(IdCardNumber) as IdCardNumber , TransactionAccountId, MAX(CreateTime) as CreateTime FROM {GetTableNameMapper()} /**where**/ GROUP BY TransactionAccountId";
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

            if (entity.IdCardNumber != null)
            {
                builder.Where($"IdCardNumber = @IdCardNumber", new { entity.IdCardNumber });
            }
            if (entity.TransactionAccountId != null)
            {
                builder.Where($"TransactionAccountId = @TransactionAccountId", new { entity.TransactionAccountId });
            }
            if (entity.TransactionBank != null)
            {
                builder.Where($"TransactionBank = @TransactionBank", new { entity.TransactionBank });
            }
            if (entity.TransactionSummary != null)
            {
                builder.Where($"TransactionSummary = @TransactionSummary", new { entity.TransactionSummary });
            }
            if (entity.TransactionTimeStart != null)
            {
                builder.Where($"TransactionDate >= @TransactionTimeStart", new { entity.TransactionTimeStart });
            }
            if (entity.TransactionTimeEnd != null)
            {
                builder.Where($"TransactionDate <= @TransactionTimeEnd", new { entity.TransactionTimeEnd });
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
            IEnumerable<BankTransaction> results = result.Read<BankTransaction>();
            int totalCount = result.ReadFirst<int>();

            return new Tuple<IEnumerable<BankTransaction>, int>(results, totalCount);
        }

        public IEnumerable<BankTransaction> Search(BankTransactionSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sql = $"SELECT * FROM {GetTableNameMapper()} /**where**/ /**orderby**/";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sql);

            if (!string.IsNullOrEmpty(entity.IdCardNumber))
            {
                builder.Where($"IdCardNumber = @IdCardNumber", new { entity.IdCardNumber });
            }
            if (!string.IsNullOrEmpty(entity.TransactionAccountId))
            {
                builder.Where($"TransactionAccountId = @TransactionAccountId", new { entity.TransactionAccountId });
            }
            if (!string.IsNullOrEmpty(entity.TransactionBank))
            {
                builder.Where($"TransactionBank = @TransactionBank", new { entity.TransactionBank });
            }
            if (!string.IsNullOrEmpty(entity.TransactionSummary))
            {
                builder.Where($"TransactionSummary = @TransactionSummary", new { entity.TransactionSummary });
            }
            if (entity.TransactionTimeStart != null)
            {
                builder.Where($"TransactionDate >= @TransactionTimeStart", new { entity.TransactionTimeStart });
            }
            if (entity.TransactionTimeEnd != null)
            {
                builder.Where($"TransactionDate <= @TransactionTimeEnd", new { entity.TransactionTimeEnd });
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

            IEnumerable<BankTransaction> results = Connection.Query<BankTransaction>(template.RawSql, template.Parameters);

            return results;
        }

        public Tuple<IEnumerable<BankTransaction>, int> GetByTransactionAccountId(BankTransactionSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sqlSelect = $"SELECT * FROM {GetTableNameMapper()} /**where**/ ";
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
            Template template = builder.AddTemplate(sql, new {paginated.Page, paginated.PageSize });

            builder.Where($"TransactionAccountId = @TransactionAccountId", new { entity.TransactionAccountId });

            if (entity.IdCardNumber != null)
            {
                builder.Where($"IdCardNumber = @IdCardNumber", new { entity.IdCardNumber });
            }
            if (entity.TransactionBank != null)
            {
                builder.Where($"TransactionBank = @TransactionBank", new { entity.TransactionBank });
            }
            if (entity.TransactionSummary != null)
            {
                builder.Where($"TransactionSummary = @TransactionSummary", new { entity.TransactionSummary });
            }
            if (entity.TransactionTimeStart != null)
            {
                builder.Where($"TransactionDate >= @TransactionTimeStart", new { entity.TransactionTimeStart });
            }
            if (entity.TransactionTimeEnd != null)
            {
                builder.Where($"TransactionDate <= @TransactionTimeEnd", new { entity.TransactionTimeEnd });
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
            IEnumerable<BankTransaction> results = result.Read<BankTransaction>();
            int totalCount = result.ReadFirst<int>();

            return new Tuple<IEnumerable<BankTransaction>, int>(results, totalCount);
        }

    }
}
