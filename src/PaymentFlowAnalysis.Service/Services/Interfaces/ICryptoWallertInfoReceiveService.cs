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
    public interface ICryptoWallertInfoReceiveService
	{
        /// <summary>
        /// 取得全部列表
        /// </summary>
        /// <returns></returns>
        IEnumerable<CryptoWallertInfoReceive> GetAll();

        /// <summary>
        /// 取得分頁列表
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        PaginatedResult<CryptoWallertInfoReceiveDTO> GetPaginatedResult(CryptoWallertInfoReceiveSearchModel entity, PaginationWithSortedQueryModel paginated);

        /// <summary>
        /// 取得Excel資料
        /// </summary>
        /// <returns></returns>
        MemoryStream ExportFile(CryptoWallertInfoReceiveSearchModel entity, PaginationWithSortedQueryModel paginated);
    }
}
