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
    public class CryptoPersonalInfoWalletRepository : RepositoryBase<CryptoPersonalInfoWallet_API>, ICryptoPersonalInfoWalletRepository
    {
        public CryptoPersonalInfoWalletRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }

        public IEnumerable<CryptoPersonalInfoWallet_API>SearchPaginated(CryptoPersonalInfoWalletSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sqlSelect = $"SELECT * FROM {GetTableNameMapper()} /**where**/";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sqlSelect, new { paginated.Page, paginated.PageSize });

            if (entity.OrderNumber != null)
            {
                builder.Where($"OrderMasterNumber = @OrderNumber", new { entity.OrderNumber });
            }
            if (entity.WallerAddress != null)
            {
                builder.Where($"WallerAddress = @WallerAddress", new { entity.WallerAddress });
            }
            if (!string.IsNullOrEmpty(paginated.SortedColumn))
            {
                if (paginated.SortedColumn == "queryOrderTime")
                    paginated.SortedColumn = "[CreateTime]";
                if (paginated.SortedType == (int)Common.Enums.SortedType.DESC)
                {
                    builder.OrderBy(paginated.SortedColumn + " DESC");
                }
                else
                {
                     builder.OrderBy(paginated.SortedColumn);
                }
                if (paginated.SortedColumn == "[CreateTime]")
                    paginated.SortedColumn = "queryOrderTime";  //轉回給master 用
            }
            else
            {
                builder.OrderBy("(SELECT NULL)");
            }

            var result = Connection.QueryMultiple(template.RawSql, template.Parameters);
            IEnumerable<CryptoPersonalInfoWallet_API> results = result.Read<CryptoPersonalInfoWallet_API>();
            

            return results;
        }
        public Tuple<IEnumerable<CryptoPersonalInfoWallet_API>, int> SearchWallerAddress(string PersonalInfoId, PaginationWithSortedQueryModel paginated)
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
            IEnumerable<CryptoPersonalInfoWallet_API> results = result.Read<CryptoPersonalInfoWallet_API>();

            int totalCount = result.ReadFirst<int>();
            Connection.Close();

            return new Tuple<IEnumerable<CryptoPersonalInfoWallet_API>, int>(results, totalCount);
        }
    }
}
