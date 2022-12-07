using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface IBankTransactionRepository : IRepositoryBase<BankTransaction>
    {
        Tuple<IEnumerable<BankTransaction>, int> SearchPaginated(BankTransactionSearchModel entity, PaginationWithSortedQueryModel paginated);
        IEnumerable<BankTransaction> Search(BankTransactionSearchModel entity, PaginationWithSortedQueryModel paginated);
        Tuple<IEnumerable<BankTransaction>, int> GetByTransactionAccountId(BankTransactionSearchModel entity, PaginationWithSortedQueryModel paginated);
    }
}
