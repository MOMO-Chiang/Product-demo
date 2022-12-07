using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("SysUserList")]
    public class SysUserList
    {
        /// <summary>
        /// 使用者帳號
        /// </summary>
        [ExplicitKey]
        public string UserId { get; set; } //((nvarchar(50)), not null)
        /// <summary>
        /// 單位代碼
        /// </summary>
        public string UnitCode { get; set; } //((nvarchar(50)), null)
        /// <summary>
        /// 單位名稱
        /// </summary>
        public string UnitName { get; set; } //((nvarchar(50)), null)
        /// <summary>
        /// 有效
        /// </summary>
        public bool? IsValid { get; set; } //(bit, null)
        /// <summary>
        /// 調閱單-使用者名稱
        /// </summary>
        public string OrderUserName { get; set; } //((nvarchar(50)), null)
        /// <summary>
        /// 調閱單-電子信箱
        /// </summary>
        public string OrderUserEmail { get; set; } //((nvarchar(50)), null)
        /// <summary>
        /// 調閱單-連絡電話
        /// </summary>
        public string OrderUserPhone { get; set; } //((nvarchar(50)), null)
        /// <summary>
        /// 調閱單-調閱人職稱
        /// </summary>
        public string OrderUserRank { get; set; } //((nvarchar(20)), null)
        /// <summary>
        /// 調閱單-調閱人任職單位(洗錢防制處)
        /// </summary>
        public string OrderUserUnit { get; set; } //((nvarchar(30)), null)
        /// <summary>
        /// 調閱單-刑事案類(刑事調查)
        /// </summary>
        public string OrderUserProjectCategory { get; set; } //((nvarchar(30)), null)
        /// <summary>
        /// 建立時間
        /// </summary>
        public DateTime? CreateTime { get; set; } //(datetime, null)
        /// <summary>
        /// 最後異動人員帳號
        /// </summary>
        public string UpdateUserId { get; set; } //((nvarchar(50)), null)
        /// <summary>
        /// 最後異動人員名稱
        /// </summary>
        public string UpdateUserName { get; set; } //((nvarchar(50)), null)
        /// <summary>
        /// 最後異動時間
        /// </summary>
        public DateTime? UpdateTime { get; set; } //(datetime, null)
    }
}
