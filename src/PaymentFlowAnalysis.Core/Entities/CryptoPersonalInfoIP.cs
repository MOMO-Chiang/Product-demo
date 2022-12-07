using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("CryptoPersonalInfoLoginIPList")]
    public class CryptoPersonalInfoIP
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
        ///登入來源IP
        /// </summary>
        public string IP { get; set; }
        /// <summary>
        ///登入時間
        /// </summary>
        public DateTime LoginTime { get; set; }
        /// <summary>
        ///登入類別
        /// </summary>
        public int LoginType { get; set; }
        /// <summary>
        ///國家英文縮寫
        /// </summary>
        public string Country { get; set; }
        /// <summary>
        ///資料建立時間
        /// </summary>
        public DateTime CreateTime { get; set; }
        
    }
}
