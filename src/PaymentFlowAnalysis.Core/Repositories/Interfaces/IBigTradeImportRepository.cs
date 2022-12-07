using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface IBigTradeImportRepository : IRepositoryBase<BigTradeImport>
    {
        IEnumerable<BigTradeImport> GetByMD5(string md5);
    }
}
