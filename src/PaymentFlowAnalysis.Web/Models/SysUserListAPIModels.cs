using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PaymentFlowAnalysis.Web.Models
{
    public class SysUserListAPIQueryParams : PaginationWithSortedQueryParams
    {
        /// <summary>             
        /// 使用者帳號             
        /// </summary>
        public string UserId { get; set; }

        /// <summary>
        /// 使用者名稱
        /// </summary>
        public string OrderUserName { get; set; }

        /// <summary>
        /// 單位代碼
        /// </summary>
        public string UnitCode { get; set; }

        /// <summary>
        /// 單位名稱
        /// </summary>
        public string UnitName { get; set; }

        /// <summary>
        /// 電子信箱
        /// </summary>
        public string OrderUserEmail { get; set; }

        /// <summary>
        /// 連絡電話
        /// </summary>
        public string OrderUserPhone { get; set; }
    }

    public class SysUserListCreationAPIQueryParams
    {
        /// <summary>
        /// 使用者帳號
        /// </summary>
        public string UserId { get; set; }
        /// <summary>
        /// 使用者名稱
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 單位代碼
        /// </summary>
        public string UnitCode { get; set; }

        /// <summary>
        /// 單位名稱
        /// </summary>
        public string UnitName { get; set; }

        /// <summary>
        /// 電子信箱
        /// </summary>
        public string UserEmail { get; set; }

        /// <summary>
        /// 連絡電話
        /// </summary>
        public string UserPhone { get; set; }

        /// <summary>
        /// 有效
        /// </summary>
        public bool? IsValid { get; set; }

        /// <summary>
        /// 建立時間
        /// </summary>
        public DateTime? CreateTime { get; set; }

        /// <summary>
        /// 最後異動人員帳號
        /// </summary>
        public string UpdateUserId { get; set; }

        /// <summary>
        /// 最後異動人員名稱
        /// </summary>
        public string UpdateUserName { get; set; }

        /// <summary>
        /// 最後異動時間
        /// </summary>
        public DateTime? UpdateTime { get; set; }

    }

    public class SysUserListUpdateAPIQueryParams
    {
        /// <summary>
        /// 調閱單-使用者名稱
        /// </summary>
        public string OrderUserName { get; set; }

        /// <summary>
        /// 單位代碼
        /// </summary>
        public string UnitCode { get; set; }

        /// <summary>
        /// 單位名稱
        /// </summary>
        public string UnitName { get; set; }

        /// <summary>
        /// 調閱單-電子信箱
        /// </summary>
        public string OrderUserEmail { get; set; }

        /// <summary>
        /// 調閱單-連絡電話
        /// </summary>
        public string OrderUserPhone { get; set; }

        /// <summary>
        /// 有效
        /// </summary>
        public bool? IsValid { get; set; }

        /// <summary>
        /// 建立時間
        /// </summary>
        public DateTime? CreateTime { get; set; }

        /// <summary>
        /// 最後異動人員帳號
        /// </summary>
        public string UpdateUserId { get; set; }

        /// <summary>
        /// 最後異動人員名稱
        /// </summary>
        public string UpdateUserName { get; set; }

        /// <summary>
        /// 最後異動時間
        /// </summary>
        public DateTime? UpdateTime { get; set; }

    }

    public class SysUserListPatchAPIModel
    {
        /// <summary>
        /// 調閱單-使用者名稱
        /// </summary>
        public string OrderUserName { get; set; }

        /// <summary>
        /// 調閱單-連絡電話
        /// </summary>
        public string OrderUserPhone { get; set; }

        /// <summary>
        /// 調閱單-電子信箱
        /// </summary>
        public string OrderUserEmail { get; set; }

        /// <summary>
        /// 調閱單-調閱人職稱
        /// </summary>
        public string OrderUserRank { get; set; }

        /// <summary>
        /// 調閱單-調閱人任職單位(洗錢防制處)
        /// </summary>
        public string OrderUserUnit { get; set; }

        /// <summary>
        /// 調閱單-刑事案類(刑事調查)
        /// </summary>
        public string OrderUserProjectCategory { get; set; }

        /// <summary>
        /// 有效
        /// </summary>
        public bool IsValid { get; set; }
    }
}