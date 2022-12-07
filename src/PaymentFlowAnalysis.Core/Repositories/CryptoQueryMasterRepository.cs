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
    public class CryptoQueryMasterRepository : RepositoryBase<CryptoQueryMaster>, ICryptoQueryMasterRepository
    {
        public CryptoQueryMasterRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }

        public Tuple<IEnumerable<CryptoQueryMaster>, int> SearchPaginated(CryptoQueryMasterSearchModel entity, PaginationWithSortedQueryModel paginated)
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

            string isAllSql = $@"
                WITH _data AS (
                    {sqlSelect}
                )
                SELECT * FROM _data
                /**orderby**/;
                WITH _data AS (
                    {sqlSelect}
                )
                SELECT COUNT(*) FROM _data;";
            SqlBuilder builder = new SqlBuilder();
            Template template;
            if (paginated.IsAll)
            {
                template = builder.AddTemplate(isAllSql, new { });
            }
            else
            {
                template = builder.AddTemplate(sql, new { paginated.Page, paginated.PageSize });
            }

            if (entity.CaseNo != null)
            {
                builder.Where($"CaseNo = @CaseNo", new { entity.CaseNo });
            }
            if (entity.SearchType != null)
            {
                builder.Where($"SearchType = @SearchType", new { entity.SearchType });
            }
            if (entity._OrderMasterNumber != null)
            {
                builder.Where($"OrderMasterNumber = @_OrderMasterNumber", new { entity._OrderMasterNumber });
            }
            if (entity.QueryUserId != null)
            {
                builder.Where($"QueryUserId = @QueryUserId", new { entity.QueryUserId });
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
            
            var result =  Connection.QueryMultiple(template.RawSql, template.Parameters);
            IEnumerable<CryptoQueryMaster> results = result.Read<CryptoQueryMaster>();
           
            int totalCount = result.ReadFirst<int>();

            return new Tuple<IEnumerable<CryptoQueryMaster>, int>(results, totalCount);
        }

        public Tuple<IEnumerable<CryptoQueryMaster>, int> SearchParams(CryptoQueryMasterSearchModel entity, PaginationWithSortedQueryModel paginated)
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
            

            if (entity.CaseNo != null)
            {
                builder.Where($"CaseNo = @CaseNo", new { entity.CaseNo });
            }
            if (entity.SearchType != null)
            {
                builder.Where($"SearchType = @SearchType", new { entity.SearchType });
            }
            if (entity.OrderMasterNumber != null)
            {
                builder.Where($"OrderMasterNumber in @OrderMasterNumber", new { entity.OrderMasterNumber });
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
            IEnumerable<CryptoQueryMaster> results = result.Read<CryptoQueryMaster>();

            int totalCount = result.ReadFirst<int>();

            return new Tuple<IEnumerable<CryptoQueryMaster>, int>(results, totalCount);
        }

        public IEnumerable<CryptoQueryMaster> GetByOrderMasterNumber(List<string> orderMasterNumbers)
        {
            string sql = $@"SELECT *
                    FROM {GetTableNameMapper()}
                    WHERE OrderMasterNumber IN @orderMasterNumbers;";
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("orderMasterNumbers", orderMasterNumbers);

            return Connection.Query<CryptoQueryMaster>(sql, dynamicParameters);
        }
    }
}
