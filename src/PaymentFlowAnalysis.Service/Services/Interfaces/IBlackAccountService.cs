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
    public interface IBlackAccountService
    {

        /// <summary>
        /// 取得分頁列表
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        PaginatedResult<BlackAccountPageInfoDTO> GetPaginatedResult(BlackAccountSearchModel entity, PaginationWithSortedQueryModel paginated);

        /// <summary>
        /// 取得單一帳號
        /// </summary>
        /// <returns></returns>
        BlackAccountPageInfo Get(string walletAddress);

        /// <summary>
        /// 取得電話彈窗資料
        /// </summary>
        /// <returns></returns>
        IEnumerable<BlackAccountPhoneDTO> GetPhone(string walletAddress);

        /// <summary>
        /// 取得信箱彈窗資料
        /// </summary>
        /// <returns></returns>
        IEnumerable<BlackAccountEmailDTO> GetEmail(string walletAddress);

        /// <summary>
        /// 取得IP彈窗資料
        /// </summary>
        /// <returns></returns>
        IEnumerable<BlackAccountIPDTO> GetIP(string walletAddress);

        /// <summary>
        /// 新增一筆
        /// </summary>
        /// <param name="BlackAccountPageInfo"></param>
        /// <returns></returns>
        void InsertAllData(BlackAccountInsertData blackAccountInsertData);

        /// <summary>
        /// 更新一筆
        /// </summary>
        /// <param name="BlackAccountPageInfo"></param>
        /// <returns></returns>
        void UpdateAllData(BlackAccountInsertData blackAccountInsertData);

        /// <summary>
        /// 取得Excel資料
        /// </summary>
        /// <returns></returns>
        MemoryStream ExportFile(BlackAccountSearchModel entity, PaginationWithSortedQueryModel paginated);
    }
}
