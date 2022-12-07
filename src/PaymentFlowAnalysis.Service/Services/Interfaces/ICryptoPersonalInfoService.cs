using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Service.Services.Interfaces
{
    public interface ICryptoPersonalInfoService
    {
        /// <summary>
        /// 取得個人資料列表
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        IEnumerable<CryptoPersonalInfo_API> GetPersonalInfoResult(CryptoQueryDetailSearchModel queryModel);
    }
}
