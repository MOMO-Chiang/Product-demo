﻿using Dapper;
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
    public class BankAccountInfoRepository : RepositoryBase<BankAccountInfo>, IBankAccountInfoRepository
	{
        public BankAccountInfoRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }

        public Tuple<IEnumerable<BankAccountInfo>, int> SearchPaginated(BankAccountInfoSearchModel entity, PaginationWithSortedQueryModel paginated)
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

            if (entity.AccountId != null)
            {
                builder.Where($"AccountId = @AccountId", new { entity.AccountId });
            }
            if (entity.IdCardNumber != null)
            {
                builder.Where($"IdCardNumber = @IdCardNumber", new { entity.IdCardNumber });
            }
            if (entity.AccountName != null)
            {
                builder.Where($"AccountName = @AccountName", new { entity.AccountName });
            }
            if (entity.MobilePhone != null)
            {
                builder.Where($"MobilePhone = @MobilePhone", new { entity.MobilePhone });
            }
            if (entity.AccountOpeningDateStart != null)
            {
                builder.Where($"AccountOpeningDate_Cov >= @AccountOpeningDateStart", new { entity.AccountOpeningDateStart });
            }
            if (entity.AccountOpeningDateEnd != null)
            {
                builder.Where($"AccountOpeningDate_Cov <= @AccountOpeningDateEnd", new { entity.AccountOpeningDateEnd });
            }
            if (entity.IsAccountMark)
            {
                builder.Where($"IsAccountMark = @IsAccountMark", new { entity.IsAccountMark });
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
            IEnumerable<BankAccountInfo> results = result.Read<BankAccountInfo>();
            int totalCount = result.ReadFirst<int>();

            return new Tuple<IEnumerable<BankAccountInfo>, int>(results, totalCount);
        }

        public IEnumerable<BankAccountInfo> Search(BankAccountInfoSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sql = $"SELECT * FROM {GetTableNameMapper()} /**where**/ /**orderby**/";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sql);

            if (!string.IsNullOrEmpty(entity.AccountId))
            {
                builder.Where($"AccountId = @AccountId", new { entity.AccountId });
            }
            if (!string.IsNullOrEmpty(entity.IdCardNumber))
            {
                builder.Where($"IdCardNumber = @IdCardNumber", new { entity.IdCardNumber });
            }
            if (!string.IsNullOrEmpty(entity.AccountName))
            {
                builder.Where($"AccountName = @AccountName", new { entity.AccountName });
            }
            if (!string.IsNullOrEmpty(entity.MobilePhone))
            {
                builder.Where($"MobilePhone = @MobilePhone", new { entity.MobilePhone });
            }
            if (entity.AccountOpeningDateStart!=null)
            {
                builder.Where($"AccountOpeningDate_Cov >= @AccountOpeningDateStart", new { entity.AccountOpeningDateStart });
            }
            if (entity.AccountOpeningDateEnd!=null)
            {
                builder.Where($"AccountOpeningDate_Cov <= @AccountOpeningDateEnd", new { entity.AccountOpeningDateEnd });
            }
            if (entity.IsAccountMark)
            {
                builder.Where($"IsAccountMark = @IsAccountMark", new { entity.IsAccountMark });
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

            IEnumerable<BankAccountInfo> results = Connection.Query<BankAccountInfo>(template.RawSql, template.Parameters);

            return results;
        }


        public IEnumerable<BankAccountInfo> UpdateIsAcoountMark(string seq, bool isAccountMark)
        {
            string sqlSelect = $"UPDATE {GetTableNameMapper()} SET IsAccountMark = @isAccountMark where Seq = @seq";
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("seq", seq);
            dynamicParameters.Add("isAccountMark", isAccountMark);
            return Connection.Query<BankAccountInfo>(sqlSelect, dynamicParameters);
        }

    }
}
