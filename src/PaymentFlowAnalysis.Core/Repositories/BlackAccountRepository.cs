using Dapper;
using Dapper.Contrib.Extensions;
using PaymentFlowAnalysis.Core.DbConnectionFactory;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Core.Repositories.Interfaces;
using PaymentFlowAnalysis.Core.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Transactions;
using static Dapper.SqlBuilder;

namespace PaymentFlowAnalysis.Core.Repositories
{
    public class BlackAccountRepository : RepositoryBase<BlackAccount>, IBlackAccountRepository
    {
        public BlackAccountRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }

        public IEnumerable<BlackAccountPageInfo> Search(BlackAccountSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sqlSelect = @" SELECT B.WalletAddress
                                    ,B.CurrencyType
                                    ,B.ExchangeTypeCode
                                    ,B.IdCardNum
                                    ,B.Risklevel
                                    ,B.Url
                                    ,B.CreateTime
                                    ,B.UpdateTime
                                    ,B.Remark
                                    ,left(B.ip,len(B.IP)-1) as UserIP 
                                    ,left(B.Phone,len(B.Phone)-1) as UserPhone
                                    ,left(B.Email,len(B.Email)-1) as UserEmail
                                    from 
                                     (
                                    SELECT  [WalletAddress]
                                    ,[CurrencyType]
                                    ,[ExchangeTypeCode]
                                    ,[IdCardNum]
                                    ,[Risklevel]
                                    ,[Url]
                                    ,[CreateTime]
                                    ,[UpdateTime]
                                    ,[Remark]
                                    ,(SELECT cast(ip AS NVARCHAR ) + ',' from [PaymentFlowAnalysisDMZ].[dbo].[CryptoBlackAccountIP] 
                                    where WalletAddress = A.WalletAddress
                                    FOR XML PATH('')) as ip
                                    ,(SELECT cast(Phone AS NVARCHAR ) + ',' from [PaymentFlowAnalysisDMZ].[dbo].[CryptoBlackAccountPhone] 
                                    where WalletAddress = A.WalletAddress
                                    FOR XML PATH('')) as Phone 
                                    ,(SELECT cast(Email AS NVARCHAR ) + ',' from [PaymentFlowAnalysisDMZ].[dbo].[CryptoBlackAccountEmail] 
                                    where WalletAddress = A.WalletAddress
                                    FOR XML PATH('')) as Email 
        
                                    FROM [PaymentFlowAnalysisDMZ].[dbo].[CryptoBlackAccount] A
                                    ) B /**where**/ /**orderby**/";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sqlSelect);

            if (!string.IsNullOrEmpty(entity.IdCardNum))
            {
                builder.Where($"B.IdCardNum = @IdCardNum", new { entity.IdCardNum });
            }
            if (!string.IsNullOrEmpty(entity.WalletAddress))
            {
                builder.Where($"B.WalletAddress = @WalletAddress", new { entity.WalletAddress });
            }
            if (!string.IsNullOrEmpty(entity.Phone))
            {
                builder.Where($"left(B.Phone,len(B.Phone)-1) like @Phone", new { Phone = "%" + entity.Phone + "%" });
            }
            if (!string.IsNullOrEmpty(entity.Email))
            {
                builder.Where($"left(B.Email,len(B.Email)-1) like @Email", new { Email = "%" + entity.Email + "%" });
            }
            if (!string.IsNullOrEmpty(entity.IP))
            {
                builder.Where($"left(B.IP,len(B.IP)-1) like @IP", new { IP = "%" + entity.IP + "%" });
            }
            if (!string.IsNullOrEmpty(entity.Url))
            {
                builder.Where($"B.Url = @Url", new { entity.Url });
            }

            if (!string.IsNullOrEmpty(entity.Remark))
            {
                builder.Where($"B.Remark = @Remark", new { entity.Remark });
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

            IEnumerable<BlackAccountPageInfo> results = Connection.Query<BlackAccountPageInfo>(template.RawSql, template.Parameters);

            return results;
        }

        public Tuple<IEnumerable<BlackAccountPageInfo>, int> SearchPaginated(BlackAccountSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            string sqlSelect = @" SELECT B.WalletAddress
                                    ,B.CurrencyType
                                    ,B.ExchangeTypeCode
                                    ,B.IdCardNum
                                    ,B.Risklevel
                                    ,B.Url
                                    ,B.CreateTime
                                    ,B.UpdateTime
                                    ,B.Remark
                                    ,left(B.ip,len(B.IP)-1) as UserIP 
                                    ,left(B.Phone,len(B.Phone)-1) as UserPhone
                                    ,left(B.Email,len(B.Email)-1) as UserEmail
                                    from 
                                     (
                                    SELECT  [WalletAddress]
                                    ,[CurrencyType]
                                    ,[ExchangeTypeCode]
                                    ,[IdCardNum]
                                    ,[Risklevel]
                                    ,[Url]
                                    ,[CreateTime]
                                    ,[UpdateTime]
                                    ,[Remark]
                                    ,(SELECT cast(ip AS NVARCHAR ) + ',' from [PaymentFlowAnalysisDMZ].[dbo].[CryptoBlackAccountIP] 
                                    where WalletAddress = A.WalletAddress
                                    FOR XML PATH('')) as ip
                                    ,(SELECT cast(Phone AS NVARCHAR ) + ',' from [PaymentFlowAnalysisDMZ].[dbo].[CryptoBlackAccountPhone] 
                                    where WalletAddress = A.WalletAddress
                                    FOR XML PATH('')) as Phone 
                                    ,(SELECT cast(Email AS NVARCHAR ) + ',' from [PaymentFlowAnalysisDMZ].[dbo].[CryptoBlackAccountEmail] 
                                    where WalletAddress = A.WalletAddress
                                    FOR XML PATH('')) as Email 
        
                                    FROM [PaymentFlowAnalysisDMZ].[dbo].[CryptoBlackAccount] A
                                    ) B /**where**/";
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

            if (entity.IdCardNum != null)
            {
                builder.Where($"B.IdCardNum = @IdCardNum", new { entity.IdCardNum });
            }
            if (entity.WalletAddress != null)
            {
                builder.Where($"B.WalletAddress = @WalletAddress", new { entity.WalletAddress });
            }
            if (entity.Phone != null)
            {
                builder.Where($"left(B.Phone,len(B.Phone)-1) like @Phone", new { Phone="%" +entity.Phone+"%" });
            }
            if (entity.Email != null)
            {
                builder.Where($"left(B.Email,len(B.Email)-1) like @Email", new { Email = "%"+entity.Email+"%" });
            }
            if (entity.IP != null)
            {
                builder.Where($"left(B.IP,len(B.IP)-1) like @IP", new { IP = "%" + entity.IP + "%" });
            }
            if (entity.Url != null)
            {
                builder.Where($"B.Url = @Url", new { entity.Url });
            }

            if (entity.Remark != null)
            {
                builder.Where($"B.Remark = @Remark", new { entity.Remark });
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
            IEnumerable<BlackAccountPageInfo> results = result.Read<BlackAccountPageInfo>();
            int totalCount = result.ReadFirst<int>();

            return new Tuple<IEnumerable<BlackAccountPageInfo>, int>(results, totalCount);
        }


    }
}
