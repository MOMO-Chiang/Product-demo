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
    public interface IPersonalInfoSearchService
    {
        ///// <summary>
        ///// 取得全部列表
        ///// </summary>
        ///// <returns></returns>
        //IEnumerable<PersonalInfoSearch> GetAll();

        ///// <summary>
        ///// 取得分頁列表
        ///// </summary>
        ///// <param name="entity"></param>
        ///// <param name="paginated"></param>
        ///// <returns></returns>
        //PaginatedResult<PersonalInfoSearch> GetPaginatedResult(PersonalInfoSearchSearchModel entity, PaginationWithSortedQueryModel paginated);

        ///// <summary>
        ///// 取得單一帳號
        ///// </summary>
        ///// <returns></returns>
        //PersonalInfoSearch Get(string userId);

        /// <summary>
        /// 新增一筆 調閱主序號 QueryMaster
        /// </summary>
        /// <param name="PersonalInfoSearch"></param>
        /// <returns></returns>
        int InsertMaster(PersonalInfoSearch PersonalInfoSearch);

        /// <summary>
        /// 新增一筆 調閱單號 QueryDetail
        /// </summary>
        /// <param name="PersonalInfoDetail"></param>
        /// <returns></returns>
        int InsertDetail(PersonalInfoDetail PersonalInfoDetail);
        int UpdateDetail(string orderNumber, int status, string message);

        //    /// <summary>
        //    /// 更int新一筆
        //    /// </summary>
        //    /// <param name="PersonalInfoSearch"></param>
        //    /// <returns></returns>
        //    void Update(PersonalInfoSearch PersonalInfoSearch);

        //    /// <summary>
        //    /// 刪除一筆
        //    /// </summary>
        //    /// <param name="PersonalInfoSearch"></param>
        //    /// <returns></returns>
        //    void Delete(string userId);
    }
}
