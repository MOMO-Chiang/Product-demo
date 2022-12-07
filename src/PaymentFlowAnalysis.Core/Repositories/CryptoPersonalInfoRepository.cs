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
    public class CryptoPersonalInfoRepository : RepositoryBase<CryptoPersonalInfo_API>, ICryptoPersonalInfoRepository    //ICryptoPersonalInfoRepository
    {
        public CryptoPersonalInfoRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }
        
        public IEnumerable<CryptoPersonalInfo_API> SearchPersonalInfo(CryptoQueryDetailSearchModel entity)
        {
            string sqlSelect = $"SELECT * FROM {GetTableNameMapper()} /**where**/";

            SqlBuilder builder = new SqlBuilder();
            Template template = builder.AddTemplate(sqlSelect);

            if (entity.AccountID != null)
            {
                builder.Where($"AccountID = @AccountID", new { entity.AccountID });
            }
            if (entity.Name != null)
            {
                builder.Where($"Name = @Name", new { entity.Name });
            }
            if (entity.BankAccount != null)
            {
                builder.Where($"BankAccount = @BankAccount", new { entity.BankAccount });
            }
            if (entity.Email != null)
            {
                builder.Where($"Email = @Email", new { entity.Email });
            }
            if (entity.IdCardNum != null)
            {
                builder.Where($"IdCardNum = @IdCardNum", new { entity.IdCardNum });
            }
            if (entity.IsCaseMark != null)
            {
                builder.Where($"IsCaseMark = @IsCaseMark", new { entity.IsCaseMark });
            }
            

            var result = Connection.QueryMultiple(template.RawSql, template.Parameters);
            IEnumerable<CryptoPersonalInfo_API> results = result.Read<CryptoPersonalInfo_API>();

            return results;
        }


        public IEnumerable<CryptoPersonalInfo_API> UpdateIsCaseMark(string PersonalInfoId, bool IsCaseMark)
        {
            string sqlSelect = $"UPDATE {GetTableNameMapper()} SET IsCaseMark = @IsCaseMark where PersonalInfoId = @PersonalInfoId";
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("PersonalInfoId", PersonalInfoId);
            dynamicParameters.Add("IsCaseMark", IsCaseMark);
            return Connection.Query<CryptoPersonalInfo_API>(sqlSelect, dynamicParameters);
        }
    }
}
