using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("CryptoPersonalInfoWallet")]
    public class CryptoPersonalInfoWallet
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
        ///錢包地址
        /// </summary>
        public string WallerAddress { get; set; }
        /// <summary>
        ///錢包幣別
        /// </summary>
        public string CurrencyType { get; set; }
        /// <summary>
        ///錢包虛擬幣數量
        /// </summary>
        public float Property { get; set; }
        /// <summary>
        ///資料建立時間
        /// </summary>
        public DateTime CreateTime { get; set; }
        
    }
}
