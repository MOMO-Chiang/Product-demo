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
    public class CryptoTransactionInfoRepository : RepositoryBase<CryptoTransactionInfo>, ICryptoTransactionInfoRepository
    {
        public CryptoTransactionInfoRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }

        public Tuple<IEnumerable<CryptoTransactionInfo>, int> SearchPaginated(CryptoTransactionInfoSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            //string sqlSelect = $"SELECT * FROM {GetTableNameMapper()} /**where**/";
            string sqlSelect = $@"
            /****** CashIn ******/   
            SELECT * FROM 
            ( SELECT 
            TransactionInfoId 
            ,null as InternalTxID
			,null as TxID
            ,ExchangeTypeCode
            ,OrderNumber
            ,TransactionSequence　
            ,TransactionTime
            ,TransactionTime_Cov	
            ,TransactionType	
            ,RemittanceAccount	
            ,RemittanceBank	as RemittanceAccountType	
            ,RemittanceCurrency	
            ,OutwardsaAmount	
            ,RemittanceBank	
            ,RemittanceBranch	
            ,BeneficiaryAccount	
            ,null as BeneficiaryAccountType	
            ,BeneficiaryCurrency	
            ,InwardsAmount	
            ,null as BeneficiaryBank	
            ,null as BeneficiaryBranch	
            ,TransactionStatus	
            ,3 as TransactionMode	
            ,CreateTime	
              FROM [PaymentFlowAnalysis].[dbo].[CryptoTransactionInfoCashIn_API]

            /****** CashOut ******/
union
                            
            SELECT  
            TransactionInfoId 
            ,null as InternalTxID
			,null as TxID
            ,ExchangeTypeCode
            ,OrderNumber
            ,TransactionSequence　
            ,TransactionTime
            ,TransactionTime_Cov	
            ,null as TransactionType	
            ,RemittanceAccount	
            ,null as RemittanceBank	
            ,RemittanceCurrency	
            ,OutwardsaAmount	
            ,null as RemittanceBank	
            ,null as RemittanceBranch	
            ,BeneficiaryAccount	
            ,null as  BeneficiaryAccountType	
            ,BeneficiaryCurrency	
            ,InwardsAmount	
            ,BeneficiaryBank	
            ,BeneficiaryBranch	
            ,TransactionStatus	
            ,2 as TransactionMode	
            ,CreateTime	
              FROM [PaymentFlowAnalysis].[dbo].[CryptoTransactionInfoCashOut_API]

     /****** VirtualCash ******/
              union
              SELECT 
            TransactionInfoId 
            ,InternalTxID
			,TxID
            ,ExchangeTypeCode
            ,OrderNumber
            ,null as TransactionSequence　
            ,TransactionTime
            ,TransactionTime_Cov	
            ,null as TransactionType	
            ,RemittanceAccount	
            ,null as RemittanceBank	
            ,RemittanceCurrency	
            ,OutwardsaAmount	
            ,null as RemittanceBank	
            ,null as RemittanceBranch	
            ,BeneficiaryAccount	
            ,BeneficiaryAccountType	
            ,BeneficiaryCurrency	
            ,InwardsAmount	
            ,null as BeneficiaryBank	
            ,null as BeneficiaryBranch	
            ,TransactionStatus	
            ,1 as TransactionMode	
            ,CreateTime	
              FROM [PaymentFlowAnalysis].[dbo].[CryptoTransactionInfoVirtualCash_API]) A
			  LEFT JOIN (SELECT QueryStatus,OrderDetailNumber,Seq,OrderMasterNumber FROM [PaymentFlowAnalysis].[dbo].[CryptoQueryDetail]) B ON A.OrderNumber=B.OrderDetailNumber
			";
            string sql = $@"
                WITH _data AS (
                    {sqlSelect}
                )
                SELECT * FROM _data  /**where**/
                /**orderby**/
                OFFSET (@page - 1) * @pageSize ROWS
                FETCH NEXT @pageSize ROWS ONLY;

                WITH _data AS (
                    {sqlSelect}
                )
                SELECT COUNT(*) FROM _data  /**where**/;";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sql, new { paginated.Page, paginated.PageSize });

            if (entity.OrderNumber != null)
            {
                builder.Where($"OrderNumber in @OrderNumber", new { entity.OrderNumber });
            }
            if (entity.TxID != null)
            {
                builder.Where($"TxID = @TxID", new { entity.TxID });
            }
            if (entity.Account != null)
            {
                builder.Where($"RemittanceAccount = @Account Or BeneficiaryAccount = @Account", new { entity.Account });
            }
            if (entity.BankCode != null)
            {
                builder.Where($"RemittanceBank = @BankCode Or BeneficiaryBank = @BankCode", new { entity.BankCode });
            }
            if (entity.BrunchCode != null)
            {
                builder.Where($"RemittanceBranch = @BrunchCode Or BeneficiaryBranch = @BrunchCode", new { entity.BrunchCode });
            }
            if (entity.Currency != null)
            {
                builder.Where($"RemittanceCurrency = @Currency Or BeneficiaryCurrency = @Currency", new { entity.Currency });
            }
            if (entity.AmountMin != null)
            {
                builder.Where($"OutwardsaAmount > @AmountMin Or InwardsAmount > @AmountMin", new { entity.AmountMin });
            }
            if (entity.AmountMax != null)
            {
                builder.Where($"OutwardsaAmount < @AmountMax Or InwardsAmount < @AmountMin", new { entity.AmountMax });
            }
            if (entity.TransactionTimeStart != null)
            {
                builder.Where($"TransactionTime_Cov > @TransactionTimeStart", new { entity.TransactionTimeStart });
            }
            if (entity.TransactionTimeEnd != null)
            {
                builder.Where($"TransactionTime_Cov < @TransactionTimeEnd", new { entity.TransactionTimeEnd });
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
            IEnumerable<CryptoTransactionInfo> results = result.Read<CryptoTransactionInfo>();
            int totalCount = result.ReadFirst<int>();

            Connection.Close();

            return new Tuple<IEnumerable<CryptoTransactionInfo>, int>(results, totalCount);
        }

    }
}
