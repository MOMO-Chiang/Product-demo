using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface ICryptoQueryMasterRepository : IRepositoryBase<CryptoQueryMaster>
    {
        Tuple<IEnumerable<CryptoQueryMaster>, int> SearchPaginated(CryptoQueryMasterSearchModel entity, PaginationWithSortedQueryModel paginated);
        Tuple<IEnumerable<CryptoQueryMaster>, int> SearchParams(CryptoQueryMasterSearchModel entity, PaginationWithSortedQueryModel paginated);
        IEnumerable<CryptoQueryMaster> GetByOrderMasterNumber(List<string> orderMasterNumbers);
    }
}
