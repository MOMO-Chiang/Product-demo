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
    public interface ICryptoTransactionInfoService
    {
        /// <summary>
        /// 取得全部列表
        /// </summary>
        /// <returns></returns>
        IEnumerable<CryptoTransactionInfo> GetAll();

        /// <summary>
        /// 取得分頁列表
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        PaginatedResult<CryptoTransactionInfoDTO> GetPaginatedResult(CryptoTransactionInfoSearchModel entity, PaginationWithSortedQueryModel paginated);

        /// <summary>
        /// 取得單一帳號
        /// </summary>
        /// <returns></returns>
        CryptoTransactionInfo Get(string userId);       
    }
}
