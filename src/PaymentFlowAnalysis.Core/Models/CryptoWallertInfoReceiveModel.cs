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
    public class CryptoWallertInfoReceiveSearchModel
    {        
        /// <summary>             
        ///	資料來源機構             
        /// </summary>
        public string ExchangeTypeCode { get; set; }

        /// <summary>
        /// 錢包地址
        /// </summary>
        public string WalletAddress { get; set; }

        /// <summary>
        /// 幣別
        /// </summary>
        public string CurrencyType { get; set; }

        /// <summary>
        /// 是否為熱錢包
        /// </summary>
        public string HotWallet { get; set; }

        /// <summary>
        /// 資料接收日期(起)
        /// </summary>
        public DateTime? CreateTimeStart { get; set; }

        /// <summary>
        /// 資料接收日期(迄)
        /// </summary>
        public DateTime? CreateTimeEnd { get; set; }
    }
}
