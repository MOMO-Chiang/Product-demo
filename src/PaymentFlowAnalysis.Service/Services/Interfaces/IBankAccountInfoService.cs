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
    public interface IBankAccountInfoService
	{
        /// <summary>
        /// 取得全部列表
        /// </summary>
        /// <returns></returns>
        IEnumerable<BankAccountInfo> GetAll();

        /// <summary>
        /// 取得分頁列表
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        PaginatedResult<BankAccountInfoDTO> GetPaginatedResult(BankAccountInfoSearchModel entity, PaginationWithSortedQueryModel paginated);

        /// <summary>
        /// 取得Excel資料
        /// </summary>
        /// <returns></returns>
        MemoryStream ExportFile(BankAccountInfoSearchModel entity, PaginationWithSortedQueryModel paginated);

        /// <summary>
        /// 新增csv資料
        /// </summary>
        /// <param name="bankAccountInfo"></param>
        /// <returns></returns>
        void Insert(BankAccountInfo bankAccountInfo);

        /// <summary>
        /// 新增csv資料(主表)
        /// </summary>
        /// <param name="bankAccountImport"></param>
        /// <returns></returns>
        void InsertImport(BankAccountImport bankAccountImport);
    }
}
