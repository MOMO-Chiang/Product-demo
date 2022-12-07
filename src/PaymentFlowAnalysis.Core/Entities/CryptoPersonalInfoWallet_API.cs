using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("CryptoPersonalInfoWallet_API")]
    public class CryptoPersonalInfoWallet_API
    {
        /// <summary>
        ///對應序號
        /// </summary>
        public string PersonalInfoId { get; set; } //((nvarchar(50)), not null)
        /// <summary>
        ///調閱單號
        /// </summary>
        public string OrderNumber { get; set; } //((nvarchar(50)), not null)
        /// <summary>
        ///錢包地址
        /// </summary>
        public string WallerAddress { get; set; } //((nvarchar(100)), not null)
        /// <summary>
        ///錢包幣別,Enumeration.CryptoCurrencyType
        /// </summary>
        public string CurrencyType { get; set; } //((nvarchar(20)), not null)
        /// <summary>
        ///錢包虛擬幣數量
        /// </summary>
        public double Property { get; set; } //(float, null)
        /// <summary>
        ///是否資料已同步至內網
        /// </summary>
        public bool IsDataSync { get; set; } //(bit, not null)
        /// <summary>
        ///資料建立時間
        /// </summary>
        public DateTime CreateTime { get; set; } //(datetime, not null)
        /// <summary>
        ///自動序號
        /// </summary>
        [Key]
        public long Seq { get; set; } //(bigint, not null)
    }
}
