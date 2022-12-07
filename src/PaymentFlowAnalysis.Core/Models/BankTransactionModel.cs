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
    public class BankTransactionSearchModel
	{        
        /// <summary>
        /// 身份證字號
        /// </summary>
        public string IdCardNumber { get; set; }

        /// <summary>
        /// 交易帳號
        /// </summary>
        public string TransactionAccountId { get; set; }

        /// <summary>
        /// 交易行
        /// </summary>
        public string TransactionBank { get; set; }

        /// <summary>
        /// 交易摘要
        /// </summary>
        public string TransactionSummary { get; set; }

        /// <summary>
        /// 交易日期(起)
        /// </summary>
        public DateTime? TransactionTimeStart { get; set; }

        /// <summary>
        /// 交易日期(迄)
        /// </summary>
        public DateTime? TransactionTimeEnd { get; set; }
    }
}
