using PaymentFlowAnalysis.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface IMainLogRepository : IRepositoryBase<MainLog>
    {
        int Insert(MainLog entity);
    }
}
