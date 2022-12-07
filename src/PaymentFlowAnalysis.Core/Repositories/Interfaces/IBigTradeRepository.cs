using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface IBigTradeRepository : IRepositoryBase<BigTrade>
    {
        Tuple<IEnumerable<BigTrade>, int> SearchPaginated(BigTradeSearchModel entity, PaginationWithSortedQueryModel paginated);
        IEnumerable<BigTrade> Search(BigTradeSearchModel entity, PaginationWithSortedQueryModel paginated);
    }
}
