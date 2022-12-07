using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Core.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface IBlackAccountRepository : IRepositoryBase<BlackAccount>
    {
        Tuple<IEnumerable<BlackAccountPageInfo>, int> SearchPaginated(BlackAccountSearchModel entity, PaginationWithSortedQueryModel paginated);
        IEnumerable<BlackAccountPageInfo> Search(BlackAccountSearchModel entity, PaginationWithSortedQueryModel paginated);
    }
}
