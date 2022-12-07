using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("NotificationInfo")]
    public class NotificationInfo
    {
        /// <summary>
        /// 自動序號
        /// </summary>
        [Key]
        public long NotificationSeq { get; set; } //(bigint, not null)
        /// <summary>
        /// 
        /// </summary>
        public string Message { get; set; } //((nvarchar(MAX)), null)
        /// <summary>
        /// 資料建立時間
        /// </summary>
        public DateTime CreateTime { get; set; } //(datetime, not null)
        /// <summary>
        /// json 格式的參數
        /// </summary>
        public string Parameter { get; set; } //((nvarchar(MAX)), null)
        /// <summary>
        /// 是否已讀
        /// </summary>
        public bool IsRead { get; set; } //(bit, not null)
        /// <summary>
        /// 人事五碼
        /// </summary>
        public string UserId { get; set; } //((nvarchar(50)), null)
        /// <summary>
        /// 調閱單號
        /// </summary>
        public string OrderDetailNumber { get; set; } //((nvarchar(50)), null)
        /// <summary>
        /// 主調閱單號
        /// </summary>
        public string OrderMasterNumber { get; set; } //((nvarchar(50)), null)
    }
}
