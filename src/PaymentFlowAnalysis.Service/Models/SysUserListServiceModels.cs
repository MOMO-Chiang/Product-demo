using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Service.Models
{
    public class SysUserListUpdateServiceModel
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
        /// 有效
        /// </summary>
        public bool IsValid { get; set; }

        /// <summary>
        /// 調閱單-刑事案類(刑事調查)
        /// </summary>
        public string OrderUserProjectCategory { get; set; }

        /// <summary>
        /// 最後異動人員帳號
        /// </summary>
        public string UpdateUserId { get; set; }
    }
}
