using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface ISysUserListRepository : IRepositoryBase<SysUserList>
    {
        Tuple<IEnumerable<SysUserList>, int> SearchPaginated(SysUserListSearchModel entity, PaginationWithSortedQueryModel paginated);
    }
}
