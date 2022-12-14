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
    public class BankSafeDepositBoxRepository : RepositoryBase<BankSafeDepositBox>, IBankSafeDepositBoxRepository
	{
        public BankSafeDepositBoxRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }

        public Tuple<IEnumerable<BankSafeDepositBox>, int> SearchPaginated(BankSafeDepositBoxSearchModel entity, PaginationWithSortedQueryModel paginated)
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

            if (entity.IdCardNumber != null)
            {
                builder.Where($"IdCardNumber = @IdCardNumber", new { entity.IdCardNumber });
            }
            if (entity.Renter != null)
            {
                builder.Where($"Renter = @Renter", new { entity.Renter });
            }
            if (entity.MobilePhone != null)
            {
                builder.Where($"MobilePhone = @MobilePhone", new { entity.MobilePhone });
            }
            if (entity.BoxNumber != null)
            {
                builder.Where($"BoxNumber = @BoxNumber", new { entity.BoxNumber });
            }
            if (entity.RentDateStart != null)
            {
                builder.Where($"RentDate_Cov >= @RentDateStart", new { entity.RentDateStart });
            }

            if (entity.RentDateEnd != null)
            {
                builder.Where($"RentDate_Cov <= @RentDateEnd", new { entity.RentDateEnd });
            }

            if (entity.LeaseCancellationDateStart != null)
            {
                builder.Where($"LeaseCancellationDate_Cov >= @LeaseCancellationDateStart", new { entity.LeaseCancellationDateStart });
            }

            if (entity.LeaseCancellationDateEnd != null)
            {
                builder.Where($"LeaseCancellationDate_Cov <= @LeaseCancellationDateEnd", new { entity.LeaseCancellationDateEnd });
            }
            if (entity.IsAccountMark)
            {
                builder.Where($"IsAccountMark = @IsAccountMark", new { entity.IsAccountMark });
            }
            if (entity.KeyWord != null)
            {
                builder.Where(
                    $"(IdCardNumber like @KeyWord or BankBranchCode like @KeyWord or BoxRentType like @KeyWord or Renter like @KeyWord " +
                    $"or LocalPhone like @KeyWord or MobilePhone like @KeyWord or ResidenceAddress like @KeyWord or MailingAddress like @KeyWord " +
                    $"or BoxNumber like @KeyWord or DataProvidedTime_Cov like @KeyWord or RentDate_Cov like @KeyWord or LeaseCancellationDate_Cov like @KeyWord or Remark like @KeyWord)", new { KeyWord = "%" + entity.KeyWord + "%" });
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
            IEnumerable<BankSafeDepositBox> results = result.Read<BankSafeDepositBox>();
            int totalCount = result.ReadFirst<int>();

            return new Tuple<IEnumerable<BankSafeDepositBox>, int>(results, totalCount);
        }

        public IEnumerable<BankSafeDepositBox> Search(BankSafeDepositBoxSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sql = $"SELECT * FROM {GetTableNameMapper()} /**where**/ /**orderby**/";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sql);
            if (!string.IsNullOrEmpty(entity.IdCardNumber))
            {
                builder.Where($"IdCardNumber = @IdCardNumber", new { entity.IdCardNumber });
            }
            if (!string.IsNullOrEmpty(entity.Renter))
            {
                builder.Where($"Renter = @Renter", new { entity.Renter });
            }
            if (!string.IsNullOrEmpty(entity.MobilePhone))
            {
                builder.Where($"MobilePhone = @MobilePhone", new { entity.MobilePhone });
            }
            if (!string.IsNullOrEmpty(entity.BoxNumber))
            {
                builder.Where($"BoxNumber = @BoxNumber", new { entity.BoxNumber });
            }
            if (entity.RentDateStart!=null)
            {
                builder.Where($"RentDate_Cov >= @RentDateStart", new { entity.RentDateStart });
            }

            if (entity.RentDateEnd != null)
            {
                builder.Where($"RentDate_Cov <= @RentDateEnd", new { entity.RentDateEnd });
            }

            if (entity.LeaseCancellationDateStart != null)
            {
                builder.Where($"LeaseCancellationDate_Cov >= @LeaseCancellationDateStart", new { entity.LeaseCancellationDateStart });
            }

            if (entity.LeaseCancellationDateEnd != null)
            {
                builder.Where($"LeaseCancellationDate_Cov <= @LeaseCancellationDateEnd", new { entity.LeaseCancellationDateEnd });
            }
            if (entity.IsAccountMark)
            {
                builder.Where($"IsAccountMark = @IsAccountMark", new { entity.IsAccountMark });
            }
            if (!string.IsNullOrEmpty(entity.KeyWord))
            {
                builder.Where(
                  $"(IdCardNumber like @KeyWord or BankBranchCode like @KeyWord or BoxRentType like @KeyWord or Renter like @KeyWord " +
                  $"or LocalPhone like @KeyWord or MobilePhone like @KeyWord or ResidenceAddress like @KeyWord or MailingAddress like @KeyWord " +
                  $"or BoxNumber like @KeyWord or DataProvidedTime_Cov like @KeyWord or RentDate_Cov like @KeyWord or LeaseCancellationDate_Cov like @KeyWord or Remark like @KeyWord)", new { KeyWord = "%" + entity.KeyWord + "%" });
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

            IEnumerable<BankSafeDepositBox> results = Connection.Query<BankSafeDepositBox>(template.RawSql, template.Parameters);

            return results;
        }


        public IEnumerable<BankSafeDepositBox> UpdateIsAcoountMark(string seq, bool isAccountMark)
        {
            string sqlSelect = $"UPDATE {GetTableNameMapper()} SET IsAccountMark = @isAccountMark where Seq = @seq";
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("seq", seq);
            dynamicParameters.Add("isAccountMark", isAccountMark);
            return Connection.Query<BankSafeDepositBox>(sqlSelect, dynamicParameters);
        }

    }
}
