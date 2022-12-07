using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface ICryptoPersonalInfoPhoneRepository : IRepositoryBase<CryptoPersonalInfoPhone_API>
    {
        IEnumerable<CryptoPersonalInfoPhone_API> SearchPaginated(CryptoPersonalInfoPhoneSearchModel entity);
        Tuple<IEnumerable<CryptoPersonalInfoPhone_API>, int> SearchPhone(string PersonalInfoId, PaginationWithSortedQueryModel paginated);
    }
}
