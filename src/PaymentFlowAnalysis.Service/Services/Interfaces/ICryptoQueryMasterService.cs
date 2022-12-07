using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Service.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Service.Services.Interfaces
{
    public interface ICryptoQueryMasterService
    {
        /// <summary>
        /// 取得分頁列表
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        PaginatedResult<CryptoQueryMasterDTO> GetPaginatedResult(CryptoQueryMasterSearchModel entity, PaginationWithSortedQueryModel paginated);

        /// <summary>
        /// 取得條件之列表
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        PaginatedResult<CryptoQueryMaster> GetSearchParams(CryptoQueryMasterSearchModel entity, PaginationWithSortedQueryModel paginated);

        /// <summary>
        /// 取得Excel資料
        /// </summary>
        /// <returns></returns>
        MemoryStream ExportExcel(CryptoQueryMasterServiceModel queryParams);
    }
}
