using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PaymentFlowAnalysis.Web.Models
{
    public class CryptoWallertInfoReceiveQueryParams : PaginationWithSortedQueryParams
    {
        /// <summary>             
        /// 資料來源機構             
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
        /// 資料接收間(起)
        /// </summary>
        public string CreateTimeStart { get; set; }

        /// <summary>
        /// 資料接收間(迄)
        /// </summary>
        public string CreateTimeEnd { get; set; }
    }

}