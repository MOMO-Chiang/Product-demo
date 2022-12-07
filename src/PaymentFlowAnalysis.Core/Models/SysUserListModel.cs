using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Models
{
    /// <summary>
    /// Search 條件
    /// </summary>
    public class SysUserListSearchModel
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
}
