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
    public class CryptoQueryDetailRepository : RepositoryBase<CryptoQueryDetail>, ICryptoQueryDetailRepository
    {
        public CryptoQueryDetailRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }

        public Tuple<IEnumerable<CryptoQueryDetail>, int> SearchPaginatedQuery(CryptoQueryDetailSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sqlSelect = @" SELECT A.Seq,A.QueryStatus,C.*
                                    ,left(C.userIP,len(C.userIP)-1) as IP 
                                    ,left(C.userPhone,len(C.userPhone)-1) as Phone
                                    ,left(C.userWallerAddress,len(C.userWallerAddress)-1) as WallerAddress " +

   
                                    $"from {GetTableNameMapper()} A,"+
                                   @"(
                                   SELECT  *
                                    ,(SELECT cast(IP AS NVARCHAR ) + ',' from [PaymentFlowAnalysis].[dbo].[CryptoPersonalInfoLoginIPList_API]
                                    where PersonalInfoId = B.PersonalInfoId
                                  FOR XML PATH('')) as userIP
                                    ,(SELECT cast(Phone AS NVARCHAR ) + ',' from [PaymentFlowAnalysis].[dbo].[CryptoPersonalInfoPhone_API]
                                    where PersonalInfoId = B.PersonalInfoId
                                  FOR XML PATH('')) as userPhone 
                                    ,(SELECT cast(WallerAddress AS NVARCHAR ) + ',' from [PaymentFlowAnalysis].[dbo].[CryptoPersonalInfoWallet_API]
                                    where PersonalInfoId = B.PersonalInfoId
                                  FOR XML PATH('')) as userWallerAddress 
		                            ,(SELECT top(1) SubPath from [PaymentFlowAnalysis].[dbo].[CryptoPersonalInfoPictures_API]
                                    where PersonalInfoId = B.PersonalInfoId) as PictureSubPath
                                    ,(SELECT top(1) FileName from [PaymentFlowAnalysis].[dbo].[CryptoPersonalInfoPictures_API]
                                    where PersonalInfoId = B.PersonalInfoId) as PictureFileName

        
                                 FROM [PaymentFlowAnalysis].[dbo].[CryptoPersonalInfo_API] B" +
                                $") C  /**where**/";
            string sql = $@"
                WITH _data AS (
                    {sqlSelect}
                )
                SELECT * FROM _data;";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sql, new { paginated.Page, paginated.PageSize });

            if (entity.OrderMasterNumber != null)
            {
                builder.Where($"A.OrderDetailNumber=C.OrderNumber");
                builder.Where($"A.OrderMasterNumber = @OrderMasterNumber", new { entity.OrderMasterNumber });
            }
            if (entity.AccountID != null)
            {
                builder.Where($"AccountID = @AccountID", new { entity.AccountID });
            }
            if (entity.Name != null)
            {
                builder.Where($"Name = @Name", new { entity.Name });
            }
            if (entity.Phone != null)
            {
                builder.Where($"Phone = @Phone", new { entity.Phone });
            }
            if (entity.Email != null)
            {
                builder.Where($"Email = @Email", new { entity.Email });
            }
            if (entity.BankAccount != null)
            {
                builder.Where($"BankAccount = @BankAccount", new { entity.BankAccount });
            }
            if (entity.WallerAddress != null)
            {
                builder.Where($"WallerAddress = @WallerAddress", new { entity.WallerAddress });
            }
            if (entity.IdCardNum != null)
            {
                builder.Where($"IdCardNum = @IdCardNum", new { entity.IdCardNum });
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
            IEnumerable<CryptoQueryDetail> results = result.Read<CryptoQueryDetail>();
            
            Connection.Close();

            return new Tuple<IEnumerable<CryptoQueryDetail>, int>(results, 0);
        }

        public Tuple<IEnumerable<CryptoQuery>, int> SearchHistory(CryptoQueryDetailSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sqlSelect = $"SELECT * FROM {GetTableNameMapper()} /**where**/";
            string sql = $@"
                WITH _data AS (
                    {sqlSelect}
                )
                SELECT * FROM _data;

                WITH _data AS (
                    {sqlSelect}
                )
                SELECT COUNT(*) FROM _data;";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sql, new { paginated.Page, paginated.PageSize });

            if (entity.OrderMasterNumber != null)
            {
                builder.Where($"OrderMasterNumber = @OrderMasterNumber", new { entity.OrderMasterNumber });
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
            IEnumerable<CryptoQuery> results = result.Read<CryptoQuery>();

            int totalCount = result.ReadFirst<int>();
            Connection.Close();

            return new Tuple<IEnumerable<CryptoQuery>, int>(results, totalCount);
        }

        public Tuple<IEnumerable<CryptoQueryDetail>, int> GetParamsResult(CryptoQueryDetailSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sqlSelect = @" SELECT A.Seq,A.QueryStatus,A.OrderMasterNumber,A.OrderDetailNumber,C.*
                                    ,left(C.userIP,len(C.userIP)-1) as IP 
                                    ,left(C.userPhone,len(C.userPhone)-1) as Phone
                                    ,left(C.userWallerAddress,len(C.userWallerAddress)-1) as WallerAddress " +


                                    $"from {GetTableNameMapper()} A," +
                                   @"(
                                   SELECT  *
                                    ,(SELECT cast(IP AS NVARCHAR ) + ',' from [PaymentFlowAnalysis].[dbo].[CryptoPersonalInfoLoginIPList_API]
                                    where PersonalInfoId = B.PersonalInfoId
                                  FOR XML PATH('')) as userIP
                                    ,(SELECT cast(Phone AS NVARCHAR ) + ',' from [PaymentFlowAnalysis].[dbo].[CryptoPersonalInfoPhone_API]
                                    where PersonalInfoId = B.PersonalInfoId
                                  FOR XML PATH('')) as userPhone 
                                    ,(SELECT cast(WallerAddress AS NVARCHAR ) + ',' from [PaymentFlowAnalysis].[dbo].[CryptoPersonalInfoWallet_API]
                                    where PersonalInfoId = B.PersonalInfoId
                                  FOR XML PATH('')) as userWallerAddress 
		                            ,(SELECT top(1) SubPath from [PaymentFlowAnalysis].[dbo].[CryptoPersonalInfoPictures_API]
                                    where PersonalInfoId = B.PersonalInfoId) as PictureSubPath
                                    ,(SELECT top(1) FileName from [PaymentFlowAnalysis].[dbo].[CryptoPersonalInfoPictures_API]
                                    where PersonalInfoId = B.PersonalInfoId) as PictureFileName

        
                                 FROM [PaymentFlowAnalysis].[dbo].[CryptoPersonalInfo_API] B" +
                                $") C  /**where**/";
            string sql = $@"
                WITH _data AS (
                    {sqlSelect}
                )
                SELECT * FROM _data;

                WITH _data AS (
                    {sqlSelect}
                )
                SELECT COUNT(*) FROM _data;";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sql, new { paginated.Page, paginated.PageSize });

            if (entity.OrderDetailNumber != null)
            {
                builder.Where($"A.OrderDetailNumber=C.OrderNumber");
                builder.Where($"A.OrderDetailNumber in @OrderDetailNumber", new { entity.OrderDetailNumber });
            }
            if (entity.IsCaseMark != null)
            {
                builder.Where($"IsCaseMark = @IsCaseMark", new { entity.IsCaseMark });
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
            IEnumerable<CryptoQueryDetail> results = result.Read<CryptoQueryDetail>();  //查詢條件 手機 0988222222 卡在這

            int totalCount = result.ReadFirst<int>();
            Connection.Close();

            return new Tuple<IEnumerable<CryptoQueryDetail>, int>(results, totalCount);
        }

        public Tuple<IEnumerable<CryptoQuery>, int> SearchPaginated(CryptoQuerySearchModel entity, PaginationWithSortedQueryModel paginated)
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

            if (!string.IsNullOrEmpty(entity.RequestAgency))
            {
                builder.Where($"RequestAgency = @RequestAgency", new { entity.RequestAgency });
            }
            if (!string.IsNullOrEmpty(entity.QueryConditionType))
            {
                builder.Where($"QueryConditionType = @QueryConditionType", new { entity.QueryConditionType });
            }
            if (entity.QueryUserId != null)
            {
                builder.Where($"QueryUserId = @QueryUserId", new { entity.QueryUserId });
            }
            if (entity.QueryValue != null)
            {
                builder.Where($"QueryValue = @QueryValue", new { entity.QueryValue });
            }
            if (entity.OrderDetailNumber != null)
            {
                builder.Where($"OrderDetailNumber = @OrderDetailNumber", new { entity.OrderDetailNumber });
            }
            if (entity.QueryOrderTimeStart != null)
            {
                builder.Where($"QueryOrderTime >= @QueryOrderTimeStart", new { entity.QueryOrderTimeStart });
            }
            if (entity.QueryOrderTimeEnd != null)
            {
                builder.Where($"QueryOrderTime <= @QueryOrderTimeEnd", new { entity.QueryOrderTimeEnd });
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
            IEnumerable<CryptoQuery> results = result.Read<CryptoQuery>();
            int totalCount = result.ReadFirst<int>();

            return new Tuple<IEnumerable<CryptoQuery>, int>(results, totalCount);
        }

        public IEnumerable<CryptoQuery> Search(CryptoQuerySearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sql = $"SELECT * FROM {GetTableNameMapper()} /**where**/ /**orderby**/";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sql);

            if (!string.IsNullOrEmpty(entity.QueryUserId))
            {
                builder.Where($"QueryUserId = @QueryUserId", new { entity.QueryUserId });
            }
            if (!string.IsNullOrEmpty(entity.RequestAgency))
            {
                builder.Where($"RequestAgency = @RequestAgency", new { entity.RequestAgency });
            }
            if (!string.IsNullOrEmpty(entity.QueryConditionType))
            {
                builder.Where($"QueryConditionType = @QueryConditionType", new { entity.QueryConditionType });
            }
            if (!string.IsNullOrEmpty(entity.QueryValue))
            {
                builder.Where($"QueryValue = @QueryValue", new { entity.QueryValue });
            }
            if (entity.QueryOrderTimeStart != null)
            {
                builder.Where($"QueryOrderTime >= @QueryOrderTimeStart", new { entity.QueryOrderTimeStart });
            }
            if (entity.QueryOrderTimeEnd != null)
            {
                builder.Where($"QueryOrderTime <= @QueryOrderTimeEnd", new { entity.QueryOrderTimeEnd });
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

            IEnumerable<CryptoQuery> results = Connection.Query<CryptoQuery>(template.RawSql, template.Parameters);

            return results;
        }


        public IEnumerable<CryptoQuery> GetDetailNumber(List<string> orderMasterNumber)
        {
            string sqlSelect = $@"SELECT * FROM {GetTableNameMapper()}
                    WHERE OrderMasterNumber IN @orderMasterNumber;";
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("orderMasterNumber", orderMasterNumber);

            return Connection.Query<CryptoQuery>(sqlSelect, dynamicParameters);
        }
        public IEnumerable<CryptoQuery> UpdateQueryStatus(string OrderDetailNumber, int QueryStatus)
        {
            string sqlSelect = $"UPDATE {GetTableNameMapper()} SET QueryStatus = @QueryStatus where OrderDetailNumber = @OrderDetailNumber";
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("OrderDetailNumber", OrderDetailNumber);
            dynamicParameters.Add("QueryStatus", QueryStatus);
            return Connection.Query<CryptoQuery>(sqlSelect, dynamicParameters);
        }
    }
}
