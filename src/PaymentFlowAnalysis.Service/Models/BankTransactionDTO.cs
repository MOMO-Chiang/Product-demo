using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    public class BankTransactionDTO
    {
        /// <summary>
        ///自動序號
        /// </summary>
        public long Seq { get; set; }
        /// <summary>
        ///唯一序號,對應BankAccountImport
        /// </summary>
        public string BankTransactionImportSeq { get; set; }
        /// <summary>
        ///身分證統一編號
        /// </summary>
        public string IdCardNumber { get; set; }
        /// <summary>
        ///帳號
        /// </summary>
        public string TransactionAccountId { get; set; }
        /// <summary>
        /// 銀行名稱
        /// </summary>
        public string BankName { get; set; }
        /// <summary>
        /// 分行名稱
        /// </summary>
        public string BankBranchName { get; set; }
        /// <summary>
        ///交易序號
        /// </summary>
        public string TransactionId { get; set; }
        /// <summary>
        ///交易日期
        /// </summary>
        public string TransactionDate { get; set; }
        /// <summary>
        ///交易時間
        /// </summary>
        public string TransactionTime { get; set; }
        /// <summary>
        ///交易行
        /// </summary>
        public string TransactionBank { get; set; }
        /// <summary>
        ///交易摘要
        /// </summary>
        public string TransactionSummary { get; set; }
        /// <summary>
        ///幣別
        /// </summary>
        public string CurrencyType { get; set; }
        /// <summary>
        ///支出金額
        /// </summary>
        public string PayoutMoneyAmount { get; set; }
        /// <summary>
        ///存入金額
        /// </summary>
        public string DepositMoneyAmount { get; set; }
        /// <summary>
        ///餘額
        /// </summary>
        public string Balance { get; set; }
        /// <summary>
        ///ATM或端末機代號
        /// </summary>
        public string AtmDeviceCode { get; set; }
        /// <summary>
        ///櫃員代號
        /// </summary>
        public string BankTellerId { get; set; }
        /// <summary>
        ///轉出入行庫代碼及帳號
        /// </summary>
        public string BankCodeAccount { get; set; }
        /// <summary>
        ///備註
        /// </summary>
        public string Remark { get; set; }
        /// <summary>
        ///資料建立時間
        /// </summary>
        public string CreateTime { get; set; }
    }
}
