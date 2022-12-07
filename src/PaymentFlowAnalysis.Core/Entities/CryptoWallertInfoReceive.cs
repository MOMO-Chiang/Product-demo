using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("CryptoWallertInfoReceive_API")]
	public class CryptoWallertInfoReceive
    {
        [Key]
        /// <summary>             
        /// Uid             
        /// </summary>
        public string Uid { get; set; }

        /// <summary>             
        /// 資料來源機構             
        /// </summary>
        public int ExchangeTypeCode { get; set; }

        /// <summary>
        /// 錢包地址
        /// </summary>
        public string WalletAddress { get; set; }

		/// <summary>
		/// 錢包地址發行時間
		/// </summary>
		public DateTime PublishTime_Cov { get; set; }

		/// <summary>
		/// 幣別
		/// </summary>
		public string CurrencyType { get; set; }
        /// <summary>
        /// 錢包地址分配時間
        /// </summary>
        public DateTime DistributionTime_Cov { get; set; }

		/// <summary>
		/// 是否為熱錢包
		/// </summary>
		public string HotWallet { get; set; }

		/// <summary>
		/// 是否為接收資料
		/// </summary>
		public bool IsDataSync { get; set; }
		/// <summary>
		/// 資料接收間
		/// </summary>
		public DateTime CreateTime { get; set; }

	}
}
