using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface ICryptoPersonalInfoRepository : IRepositoryBase<CryptoPersonalInfo_API>
    {
        IEnumerable<CryptoPersonalInfo_API>SearchPersonalInfo(CryptoQueryDetailSearchModel entity);
        IEnumerable<CryptoPersonalInfo_API> UpdateIsCaseMark(string PersonalInfoId, bool IsCaseMark);
    }
}
