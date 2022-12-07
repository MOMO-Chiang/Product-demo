using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface IBankSafeDepositBoxRepository : IRepositoryBase<BankSafeDepositBox>
    {
        Tuple<IEnumerable<BankSafeDepositBox>, int> SearchPaginated(BankSafeDepositBoxSearchModel entity, PaginationWithSortedQueryModel paginated);
        IEnumerable<BankSafeDepositBox> Search(BankSafeDepositBoxSearchModel entity, PaginationWithSortedQueryModel paginated);
        IEnumerable<BankSafeDepositBox> UpdateIsAcoountMark(string seq, bool isAccountMark);
    }
}
