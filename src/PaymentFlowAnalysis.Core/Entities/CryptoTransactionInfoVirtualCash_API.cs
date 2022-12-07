using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("CryptoTransactionInfoVirtualCash_API")]
    public class CryptoTransactionInfoVirtualCash_API
    {
        /// <summary>
        ///自動序號
        /// </summary>
        [Key]
        public long Seq { get; set; } //(bigint, not null)
        /// <summary>
        ///對應序號
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
        ///交易TxID
        /// </summary>
        public string TxID { get; set; } //((nvarchar(150)), null)
        /// <summary>
        ///平台間內部交易TxID
        /// </summary>
        public string InternalTxID { get; set; } //((nvarchar(100)), null)
        /// <summary>
        ///交易時間(原始)
        /// </summary>
        public int TransactionTime { get; set; } //(int, null)
        /// <summary>
        ///交易時間(已轉換)
        /// </summary>
        public DateTime TransactionTime_Cov { get; set; } //(datetime, null)
        /// <summary>
        ///轉出帳戶/內部交易帳號accountID
        /// </summary>
        public string RemittanceAccount { get; set; } //((nvarchar(50)), null)
        /// <summary>
        ///轉出帳號種類,例如:CIB或公司名稱
        /// </summary>
        public string RemittanceAccountType { get; set; } //((nvarchar(100)), null)
        /// <summary>
        ///轉出幣別,例如btc
        /// </summary>
        public string RemittanceCurrency { get; set; } //((nvarchar(20)), null)
        /// <summary>
        ///轉出數量
        /// </summary>
        public double OutwardsaAmount { get; set; } //(float, null)
        /// <summary>
        ///轉入帳戶/內部交易帳號accountID
        /// </summary>
        public string BeneficiaryAccount { get; set; } //((nvarchar(50)), null)
        /// <summary>
        ///轉入帳號種類,例如eth或公司名稱
        /// </summary>
        public string BeneficiaryAccountType { get; set; } //((nvarchar(100)), null)
        /// <summary>
        ///轉入幣別,例如eth
        /// </summary>
        public string BeneficiaryCurrency { get; set; } //((nvarchar(20)), null)
        /// <summary>
        ///轉入數量
        /// </summary>
        public double InwardsAmount { get; set; } //(float, null)
        /// <summary>
        ///交易狀態,successorfail(已轉換)
        /// </summary>
        public bool TransactionStatus_Cov { get; set; } //(bit, null)
        /// <summary>
        ///交易狀態,successorfail(原始)
        /// </summary>
        public string TransactionStatus { get; set; } //((nvarchar(20)), null)
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
