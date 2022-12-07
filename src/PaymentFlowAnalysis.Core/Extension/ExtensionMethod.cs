using Dapper;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Core.Repositories;
using PaymentFlowAnalysis.Core.Repositories.Interfaces;
using PaymentFlowAnalysis.Core.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Dapper.SqlBuilder;

namespace PaymentFlowAnalysis.Core.Extension
{
    static class ExtensionMethod
    {//        Tuple<IEnumerable<CryptoPersonalInfoIP>, int> SearchIP(string uid, PaginationWithSortedQueryModel paginated);
        //public static Tuple<IEnumerable<CryptoPersonalInfoLoginIPList_API>, int> SearchIP(this IUnitOfWork.CryptoPersonalInfoIPRepository CryptoPersonalInfIP, string Uid, PaginationWithSortedQueryModel paginated)
        //{
        //    string sqlSelect = $"SELECT * FROM CryptoPersonalInfoLoginIPList_API /**where**/";
        //    string sql = $@"
        //        WITH _data AS (
        //            {sqlSelect}
        //        )
        //        SELECT * FROM _data
        //        /**orderby**/
        //        OFFSET (@page - 1) * @pageSize ROWS
        //        FETCH NEXT @pageSize ROWS ONLY;

        //        WITH _data AS (
        //            {sqlSelect}
        //        )
        //        SELECT COUNT(*) FROM _data;";

        //    SqlBuilder builder = new SqlBuilder();
        //    Template template = builder.AddTemplate(sql, new { paginated.Page, paginated.PageSize });

        //    if (Uid != null)
        //    {
        //        builder.Where($"Uid = @Uid", new { Uid });
        //    }
        //    if (!string.IsNullOrEmpty(paginated.SortedColumn))
        //    {
        //        if (paginated.SortedType == (int)Common.Enums.SortedType.DESC)
        //        {
        //            builder.OrderBy(paginated.SortedColumn + " DESC");
        //        }
        //        else
        //        {
        //            builder.OrderBy(paginated.SortedColumn);
        //        }
        //    }
        //    else
        //    {
        //        builder.OrderBy("(SELECT NULL)");
        //    }

        //    var result = Connection.QueryMultiple(template.RawSql, template.Parameters);
        //    IEnumerable<CryptoPersonalInfoLoginIPList_API> results = result.Read<CryptoPersonalInfoLoginIPList_API>();

        //    int totalCount = result.ReadFirst<int>();
        //    Connection.Close();

        //    return new Tuple<IEnumerable<CryptoPersonalInfoLoginIPList_API>, int>(results, totalCount);

        //}


    }
}
