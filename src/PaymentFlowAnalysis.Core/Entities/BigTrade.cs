using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("BigTradeDetail_Import")]
    public class BigTrade
    {
        [Key]
        /// <summary>
        ///自動序號
        /// </summary>
        public long Seq { get; set; }
        /// <summary>
        ///唯一序號(GUID)
        /// </summary>
        public string BankTradeImportSeq { get; set; }
        /// <summary>
        ///大額序號
        /// </summary>
        public string BigTradeId { get; set; }
        /// <summary>
        ///客戶帳號
        /// </summary>
        public string CustomerAccountId { get; set; }
        /// <summary>
        ///客戶名稱
        /// </summary>
        public string CustomerName { get; set; }
        /// <summary>
        ///客戶統編
        /// </summary>
        public string CustomerId { get; set; }
        /// <summary>
        ///交易人姓名
        /// </summary>
        public string RemitterName { get; set; }
        /// <summary>
        ///交易人統編
        /// </summary>
        public string RemitterId { get; set; }
        /// <summary>
        ///交易人電話
        /// </summary>
        public string RemitterPhone { get; set; }
        /// <summary>
        ///交易時間
        /// </summary>
        public DateTime RemitTime { get; set; }
        /// <summary>
        ///交易金額
        /// </summary>
        public long RemitAmount { get; set; }
        /// <summary>
        ///交易行
        /// </summary>
        public string RemitBank { get; set; }
        /// <summary>
        ///交易種類
        /// </summary>
        public string RemitType { get; set; }
        /// <summary>
        ///受款人
        /// </summary>
        public string Beneficiary { get; set; }
        /// <summary>
        ///受款人身分證字號
        /// </summary>
        public string BeneficiaryId { get; set; }
        /// <summary>
        ///受款帳號
        /// </summary>
        public string BeneficiaryAccountId { get; set; }
        /// <summary>
        ///備註
        /// </summary>
        public string Memo { get; set; }
        /// <summary>
        ///申報時間
        /// </summary>
        public DateTime DeclarationTime { get; set; }
        /// <summary>
        ///客戶電話
        /// </summary>
        public string CustomerPhone { get; set; }
        /// <summary>
        ///客戶地址
        /// </summary>
        public string CustomerAddress { get; set; }
        /// <summary>
        ///開戶日期
        /// </summary>
        public DateTime OpenAccountDate { get; set; }

    }
}
