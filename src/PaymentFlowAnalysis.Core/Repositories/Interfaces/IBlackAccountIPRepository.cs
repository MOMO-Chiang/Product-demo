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
    public interface IBlackAccountIPRepository : IRepositoryBase<BlackAccountIP>
    {
        IEnumerable<BlackAccountIP> GetByWalletAddress(string walletAddress);
    }
}
