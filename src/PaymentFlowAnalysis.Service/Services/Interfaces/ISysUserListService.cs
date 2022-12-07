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
    public interface ISysUserListService
    {
        /// <summary>
        /// 取得全部列表
        /// </summary>
        /// <returns></returns>
        IEnumerable<SysUserList> GetAll();

        /// <summary>
        /// 取得分頁列表
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        PaginatedResult<SysUserList> GetPaginatedResult(SysUserListSearchModel entity, PaginationWithSortedQueryModel paginated);

        /// <summary>
        /// 取得單一帳號
        /// </summary>
        /// <returns></returns>
        SysUserList Get(string userId);

        /// <summary>
        /// 新增一筆
        /// </summary>
        /// <param name="sysUserList"></param>
        /// <returns></returns>
        void Insert(SysUserList sysUserList);

        /// <summary>
        /// 更新一筆
        /// </summary>
        /// <param name="sysUserList"></param>
        /// <returns></returns>
        void Update(SysUserList sysUserList);

        /// <summary>
        /// 更新一筆
        /// </summary>
        /// <param name="sysUserList"></param>
        /// <returns></returns>
        void Update(string userId, SysUserListUpdateServiceModel sysUserListUpdateServiceModel);

        /// <summary>
        /// 刪除一筆
        /// </summary>
        /// <param name="sysUserList"></param>
        /// <returns></returns>
        void Delete(string userId);
    }
}
