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
    public class PersonalInfoSearchRepository : RepositoryBase<PersonalInfoSearch>,IPersonalInfoSearchRepository
    {
        public PersonalInfoSearchRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }

        public int InsertMaster(PersonalInfoSearch entity)
        {
            throw new NotImplementedException();
        }
    }
                                              //RepositoryBase<NotificationInfo>
    public class PersonalInfoDetailRepository : RepositoryBase<PersonalInfoDetail>, IPersonalInfoDetailRepository
    {
        public PersonalInfoDetailRepository(IDbConnectionFactory dbConnectionFactory, string connectionName)
            : base(dbConnectionFactory, connectionName)
        {

        }
        public int InsertDetail(PersonalInfoDetail entity)
        {
            throw new NotImplementedException();
        }

        public int UpdateDetailByOrderNumber(string orderDetailNumber, int queryStatus, string errorMessage)
        {
            string sql = $@"UPDATE {GetTableNameMapper()}
                            SET [QueryStatus] = @queryStatus,
                                [ErrorMessage] = @errorMessage
                            WHERE [OrderDetailNumber] = @orderDetailNumber";
            DynamicParameters dynParameters = new DynamicParameters();
            dynParameters.Add("queryStatus", queryStatus);
            dynParameters.Add("errorMessage", errorMessage);
            dynParameters.Add("orderDetailNumber", orderDetailNumber);
            return Connection.Execute(sql, dynParameters);
        }
    }
}
