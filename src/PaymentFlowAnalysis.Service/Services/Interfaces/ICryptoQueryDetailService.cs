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
    public interface ICryptoQueryDetailService
    {
        /// <summary>
        /// 取得分頁列表
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        PaginatedResult<CryptoQueryDetailPersonalDTO> SearchPaginatedQuery(CryptoQueryDetailSearchModel entity, PaginationWithSortedQueryModel paginated);

        /// <summary>
        /// 取得歷史分頁列表
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        PaginatedResult<CryptoQueryDTO> SearchHistory(CryptoQueryDetailSearchModel entity, PaginationWithSortedQueryModel paginated);

        /// <summary>
        /// 取得條件之列表
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        PaginatedResult<CryptoQueryDetailPersonalDTO> GetParamsResult(CryptoQueryDetailSearchModel entity, PaginationWithSortedQueryModel paginated);

        /// <summary>
        /// 取得Excel資料
        /// </summary>
        /// <returns></returns>
        MemoryStream ExportFile(CryptoQuerySearchModel entity, PaginationWithSortedQueryModel paginated);

        /// <summary>
        /// 取得分頁列表
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        PaginatedResult<CryptoQueryDTO> GetPaginatedResult(CryptoQuerySearchModel entity, PaginationWithSortedQueryModel paginated);

        /// <summary>
        /// 取明細資料列表
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        IEnumerable<CryptoQuery> GetDetailNumber(List<string> orderMasterNumber);

        /// <summary>
        /// 取得單一調閱單號
        /// </summary>
        /// <returns></returns>
        CryptoQueryDetail Get(string seq);
    }
}
