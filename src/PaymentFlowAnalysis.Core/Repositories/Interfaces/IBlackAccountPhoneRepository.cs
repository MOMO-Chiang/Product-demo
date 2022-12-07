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
    public interface IBlackAccountPhoneRepository : IRepositoryBase<BlackAccountPhone>
    {
        IEnumerable<BlackAccountPhone> GetByWalletAddress(string walletAddress);
    }
}
