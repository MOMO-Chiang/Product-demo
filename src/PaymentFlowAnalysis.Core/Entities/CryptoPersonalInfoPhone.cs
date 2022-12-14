using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("CryptoPersonalInfoPhone")]
    public class CryptoPersonalInfoPhone
    {
        [ExplicitKey]
        /// <summary>
        ///自動序號
        /// </summary>
        public string Seq { get; set; }
        /// <summary>
        ///對應CryptoPersonalInfo Uid
        /// </summary>
        public string PersonalInfoId { get; set; }
        /// <summary>
        ///調閱單號
        /// </summary>
        public string OrderNumber { get; set; }
        /// <summary>
        ///個人電話
        /// </summary>
        public string Phone { get; set; }
        /// <summary>
        ///資料建立時間
        /// </summary>
        public DateTime CreateTime { get; set; }
        
    }
}
