using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface IBankTransactionImportRepository : IRepositoryBase<BankTransactionImport>
    {
        IEnumerable<BankTransactionImport> GetByMD5(string md5);
        IEnumerable<BankTransactionImport> GetBankTransactionImportSeq(List<string> bankTransactionImportSeqs);
    }
}
