using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PaymentFlowAnalysis.Web.Models
{
    public class CryptoTransactionInfoAPIQueryParams : PaginationWithSortedQueryParams
    {
        /// <summary>
        /// 案號
        /// </summary>
        public string CaseNo { get; set; }

        /// <summary>
        /// 交易種類
        /// </summary>
        public string SearchType { get; set; }

        /// <summary>
        /// txID
        /// </summary>
        public string TxID { get; set; }
        /// <summary>
        /// 帳戶
        /// </summary>
        public string Account { get; set; }
        /// <summary>
        /// 銀行代碼
        /// </summary>
        public string BankCode { get; set; }
        /// <summary>
        /// 分行代碼
        /// </summary>
        public string BrunchCode { get; set; }
        /// <summary>
        /// 幣別
        /// </summary>
        public string Currency { get; set; }
        /// <summary>
        /// 數量(最低)
        /// </summary>
        public string AmountMin { get; set; }
        /// <summary>
        /// 數量(最高)
        /// </summary>
        public string AmountMax { get; set; }
        /// <summary>
        /// 交易日期(起)
        /// </summary>
        public string TransactionTimeStart { get; set; }
        /// <summary>
        /// 交易日期(迄)
        /// </summary>
        public string TransactionTimeEnd { get; set; }

        /// <summary>
        /// 調閱主序號
        /// </summary>
        public string OrderMasterNumber { get; set; }
    }
}