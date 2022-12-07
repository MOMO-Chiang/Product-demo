using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Service.Models
{
    public class NotificationInfoDTO
    {
        /// <summary>
        /// 自動序號
        /// </summary>
        public long NotificationSeq { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Message { get; set; }
        /// <summary>
        /// 資料建立時間
        /// </summary>
        public string CreateTime { get; set; }
        /// <summary>
        /// 要代入的查詢參數
        /// </summary>
        public dynamic QueryParameter { get; set; }
        /// <summary>
        /// 主調閱單號
        /// </summary>
        public string OrderMasterNumber { get; set; }
        /// <summary>
        /// 是否已讀
        /// </summary>
        public bool IsRead { get; set; }
    }
}
