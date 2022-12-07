using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Service.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthLoginInfo> LoginSSO(string userId);
        Task<AuthLoginInfo> LoginAD(string account, string password);

        bool TryValidateTokenSystemCode(string token);
    }
}
