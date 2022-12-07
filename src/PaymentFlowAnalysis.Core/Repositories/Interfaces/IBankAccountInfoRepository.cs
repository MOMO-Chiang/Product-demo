using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface IBankAccountInfoRepository : IRepositoryBase<BankAccountInfo>
    {
        Tuple<IEnumerable<BankAccountInfo>, int> SearchPaginated(BankAccountInfoSearchModel entity, PaginationWithSortedQueryModel paginated);
        IEnumerable<BankAccountInfo> Search(BankAccountInfoSearchModel entity, PaginationWithSortedQueryModel paginated);
        IEnumerable<BankAccountInfo> UpdateIsAcoountMark(string seq, bool isAccountMark);
    }
}
