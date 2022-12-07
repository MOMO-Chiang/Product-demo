using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PaymentFlowAnalysis.Web.Models
{
    public class CryptoQueryQueryParams : PaginationWithSortedQueryParams
    {
        /// <summary>
        ///調閱人人事五碼
        /// </summary>
        public string QueryUserId { get; set; }
        /// <summary>
        /// 交易所
        /// </summary>
        public string RequestAgency { get; set; }
        /// <summary>
        /// 拋查條件
        /// </summary>
        public string QueryConditionType { get; set; }
        /// <summary>
        /// 拋查值
        /// </summary>
        public string QueryValue { get; set; }
        /// <summary>
        ///調閱單號
        /// </summary>
        public string OrderDetailNumber { get; set; }
        /// <summary>
        /// 拋查時間(起)
        /// </summary>
        public string QueryOrderTimeStart { get; set; }
        /// <summary>
        /// 拋查時間(迄)
        /// </summary>
        public string QueryOrderTimeEnd { get; set; }
    }

}