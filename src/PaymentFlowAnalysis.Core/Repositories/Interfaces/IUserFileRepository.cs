using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface IUserFileRepository : IRepositoryBase<UserFile>
    {
        IEnumerable<UserFile> GetByHandleMan(string handManId);
        IEnumerable<UserFile> GetByFileNo(string fileNo);
    }
}
