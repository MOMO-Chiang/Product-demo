using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Service.Models
{
    public class CryptoPersonalInfoPhoneDTO
    {
        public long Seq { get; set; } //(bigint, not null)
        /// <summary>
        ///對應ID
        /// </summary>
        public string PersonalInfoId { get; set; } //((nvarchar(50)), not null)
        /// <summary>
        ///調閱單號
        /// </summary>
        public string OrderNumber { get; set; } //((nvarchar(50)), not null)
        /// <summary>
        ///個人電話
        /// </summary>
        public string Phone { get; set; } //((nvarchar(30)), not null)
        /// <summary>
        ///是否資料已同步至內網
        /// </summary>
        public bool IsDataSync { get; set; } //(bit, not null)
        /// <summary>
        ///資料建立時間
        /// </summary>
        public string CreateTime { get; set; } //(datetime, not null)
    }
}
