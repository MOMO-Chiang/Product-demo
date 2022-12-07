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
    public class CryptoWallertInfoReceiveRepository : RepositoryBase<CryptoWallertInfoReceive>, ICryptoWallertInfoReceiveRepository
    {
        public CryptoWallertInfoReceiveRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }

        public Tuple<IEnumerable<CryptoWallertInfoReceive>, int> SearchPaginated(CryptoWallertInfoReceiveSearchModel entity, PaginationWithSortedQueryModel paginated)
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

            if (!string.IsNullOrEmpty(entity.ExchangeTypeCode))
            {
                builder.Where($"ExchangeTypeCode = @ExchangeTypeCode", new { entity.ExchangeTypeCode });
            }
            if (entity.WalletAddress != null)
            {
                builder.Where($"WalletAddress = @WalletAddress", new { entity.WalletAddress });
            }
            if (entity.CurrencyType != null)
            {
                builder.Where($"CurrencyType = @CurrencyType", new { entity.CurrencyType });
            }
            if (!string.IsNullOrEmpty(entity.HotWallet))
            {
                builder.Where($"HotWallet = @HotWallet", new { entity.HotWallet });
            }
            if (entity.CreateTimeStart != null)
            {
                builder.Where($"CreateTime >= @CreateTimeStart", new { entity.CreateTimeStart });
            }
            if (entity.CreateTimeEnd != null)
            {
                builder.Where($"CreateTime <= @CreateTimeEnd", new { entity.CreateTimeEnd });
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
            IEnumerable<CryptoWallertInfoReceive> results = result.Read<CryptoWallertInfoReceive>();
            int totalCount = result.ReadFirst<int>();

            return new Tuple<IEnumerable<CryptoWallertInfoReceive>, int>(results, totalCount);
        }

        public IEnumerable<CryptoWallertInfoReceive> Search(CryptoWallertInfoReceiveSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sql = $"SELECT * FROM {GetTableNameMapper()} /**where**/ /**orderby**/";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sql);

            if (!string.IsNullOrEmpty(entity.ExchangeTypeCode))
            {
                builder.Where($"ExchangeTypeCode = @ExchangeTypeCode", new { entity.ExchangeTypeCode });
            }
            if (!string.IsNullOrEmpty(entity.WalletAddress))
            {
                builder.Where($"WalletAddress = @WalletAddress", new { entity.WalletAddress });
            }
            if (!string.IsNullOrEmpty(entity.CurrencyType))
            {
                builder.Where($"CurrencyType = @CurrencyType", new { entity.CurrencyType });
            }
            if (!string.IsNullOrEmpty(entity.HotWallet))
            {
                builder.Where($"HotWallet = @HotWallet", new { entity.HotWallet });
            }
            if (entity.CreateTimeStart != null)
            {
                builder.Where($"CreateTime >= @CreateTimeStart", new { entity.CreateTimeStart });
            }
            if (entity.CreateTimeStart != null)
            {
                builder.Where($"CreateTime <= @CreateTimeEnd", new { entity.CreateTimeEnd });
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

            IEnumerable<CryptoWallertInfoReceive> results = Connection.Query<CryptoWallertInfoReceive>(template.RawSql, template.Parameters);

            return results;
        }

    }
}
