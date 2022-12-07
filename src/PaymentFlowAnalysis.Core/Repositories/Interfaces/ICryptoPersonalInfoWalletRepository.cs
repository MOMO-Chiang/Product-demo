using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface ICryptoPersonalInfoWalletRepository : IRepositoryBase<CryptoPersonalInfoWallet_API>
    {
        IEnumerable<CryptoPersonalInfoWallet_API>SearchPaginated(CryptoPersonalInfoWalletSearchModel entity, PaginationWithSortedQueryModel paginated);
        Tuple<IEnumerable<CryptoPersonalInfoWallet_API>, int> SearchWallerAddress(string PersonalInfoId, PaginationWithSortedQueryModel paginated);
    }
}
