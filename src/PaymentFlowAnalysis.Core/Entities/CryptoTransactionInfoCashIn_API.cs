using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("CryptoTransactionInfoCashIn_API")]
    public class CryptoTransactionInfoCashIn_API
    {
        /// <summary>
        ///自動序號
        /// </summary>
        [Key]
        public long Seq { get; set; } //(bigint, not null)
        /// <summary>
        ///TransactionInfo流水號
        /// </summary>
        public string TransactionInfoId { get; set; } //((nvarchar(50)), not null)
        /// <summary>
        ///交易所代碼,bitpro/.....
        /// </summary>
        public int ExchangeTypeCode { get; set; } //(int, not null)
        /// <summary>
        ///調閱單號
        /// </summary>
        public string OrderNumber { get; set; } //((nvarchar(50)), not null)
        /// <summary>
        ///交易種類,ATMorFamilyMart
        /// </summary>
        public string TransactionType { get; set; } //((nvarchar(50)), null)
        /// <summary>
        ///交易序號
        /// </summary>
        public string TransactionSequence { get; set; } //((nvarchar(100)), null)
        /// <summary>
        ///交易時間(原始)
        /// </summary>
        public int TransactionTime { get; set; } //(int, null)
        /// <summary>
        ///交易時間(轉換過)
        /// </summary>
        public DateTime TransactionTime_Cov { get; set; } //(datetime, null)
        /// <summary>
        ///現金轉出帳號/超商繳費可不填
        /// </summary>
        public string RemittanceAccount { get; set; } //((nvarchar(50)), null)
        /// <summary>
        ///轉出幣別,例如ntd
        /// </summary>
        public string RemittanceCurrency { get; set; } //((nvarchar(20)), null)
        /// <summary>
        ///現金轉出數量
        /// </summary>
        public double OutwardsaAmount { get; set; } //(float, null)
        /// <summary>
        ///轉出銀行代碼/超商名稱(FamilyMart)
        /// </summary>
        public string RemittanceBank { get; set; } //((nvarchar(50)), null)
        /// <summary>
        ///轉出分行代碼/付款超商分店代碼
        /// </summary>
        public string RemittanceBranch { get; set; } //((nvarchar(50)), null)
        /// <summary>
        ///虛擬貨幣轉入的錢包地址/虛擬帳戶
        /// </summary>
        public string BeneficiaryAccount { get; set; } //((nvarchar(100)), null)
        /// <summary>
        ///虛擬貨幣轉入幣別,例如eth
        /// </summary>
        public string BeneficiaryCurrency { get; set; } //((nvarchar(20)), null)
        /// <summary>
        ///虛擬貨幣轉入數量
        /// </summary>
        public double InwardsAmount { get; set; } //(float, null)
        /// <summary>
        ///交易狀態,successorfail(原始)
        /// </summary>
        public string TransactionStatus { get; set; } //((nvarchar(20)), null)
        /// <summary>
        ///交易狀態,successorfail(轉換過)
        /// </summary>
        public bool TransactionStatus_Cov { get; set; } //(bit, null)
        /// <summary>
        ///是否資料已同步至內網
        /// </summary>
        public bool IsDataSync { get; set; } //(bit, not null)
        /// <summary>
        ///資料建立時間
        /// </summary>
        public DateTime CreateTime { get; set; } //(datetime, not null)
    }
}
