using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface IBankCodeRepository : IRepositoryBase<QueryBankCode>
    {
        IEnumerable<QueryBankCode> GetBankName(string bankCode);
        IEnumerable<QueryBankCode> GetBankBranchName(string bankBranchCode);
    }
}
