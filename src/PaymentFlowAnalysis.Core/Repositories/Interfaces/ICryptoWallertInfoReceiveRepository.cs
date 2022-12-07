using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface ICryptoWallertInfoReceiveRepository : IRepositoryBase<CryptoWallertInfoReceive>
    {
        Tuple<IEnumerable<CryptoWallertInfoReceive>, int> SearchPaginated(CryptoWallertInfoReceiveSearchModel entity, PaginationWithSortedQueryModel paginated);
        IEnumerable<CryptoWallertInfoReceive> Search(CryptoWallertInfoReceiveSearchModel entity, PaginationWithSortedQueryModel paginated);
    }
}
