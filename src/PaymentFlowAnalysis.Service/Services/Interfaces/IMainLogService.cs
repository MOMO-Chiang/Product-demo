using PaymentFlowAnalysis.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Service.Services.Interfaces
{
    public interface IMainLogService
    {
       void Insert(MainLog mainLog);
    }
}
