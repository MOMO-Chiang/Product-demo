using System.Data.SqlClient;

namespace PaymentFlowAnalysis.Core.DbConnectionFactory
{
    public interface IDbConnectionFactory
    {
        SqlConnection GetConnection(string connectionName);

        void Clear();
    }
}
