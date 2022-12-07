using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface ICryptoQueryDetailRepository : IRepositoryBase<CryptoQueryDetail>
    {
        Tuple<IEnumerable<CryptoQueryDetail>, int> SearchPaginatedQuery(CryptoQueryDetailSearchModel entity, PaginationWithSortedQueryModel paginated);
        Tuple<IEnumerable<CryptoQuery>, int> SearchHistory(CryptoQueryDetailSearchModel entity, PaginationWithSortedQueryModel paginated);
        Tuple<IEnumerable<CryptoQueryDetail>, int> GetParamsResult(CryptoQueryDetailSearchModel entity, PaginationWithSortedQueryModel paginated);
        Tuple<IEnumerable<CryptoQuery>, int> SearchPaginated(CryptoQuerySearchModel entity, PaginationWithSortedQueryModel paginated);
        IEnumerable<CryptoQuery> GetDetailNumber(List<string> OrderMasterNumber);
        IEnumerable<CryptoQuery> Search(CryptoQuerySearchModel entity, PaginationWithSortedQueryModel paginated);
        IEnumerable<CryptoQuery> UpdateQueryStatus(string OrderDetailNumber, int QueryStatus);
    }
}
