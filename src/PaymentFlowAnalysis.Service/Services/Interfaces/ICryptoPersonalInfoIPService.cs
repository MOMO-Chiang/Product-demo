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
    public interface ICryptoPersonalInfoIPService
    {
        /// <summary>
        /// 取得電話列表
        /// </summary>
        /// <param name="Uid"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        PaginatedResult<CryptoPersonalInfoLoginIPListDTO> GetIPResult(string PersonalInfoId, PaginationWithSortedQueryModel paginated);
    }
}
