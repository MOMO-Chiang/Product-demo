using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("BankAccountDetail_Import")]
    public class BankAccountInfo
    {
        [Key]
        /// <summary>             
        /// Seq             
        /// </summary>
        public long Seq { get; set; }

        /// <summary>             
        /// ImportSeq             
        /// </summary>
        public string BankAccountImportSeq { get; set; }

        /// <summary>
        /// 身分證字號
        /// </summary>
        public string IdCardNumber { get; set; }

        /// <summary>
        /// 開戶行總分支機構代碼
        /// </summary>
        public string BankBranchCode { get; set; }

        /// <summary>
        /// 存款種類
        /// </summary>
        public string AccountType { get; set; }
        /// <summary>
        /// 幣別
        /// </summary>
        public string CurrencyType { get; set; }

        /// <summary>
        /// 戶名
        /// </summary>
        public string AccountName { get; set; }

        /// <summary>
        /// 住家電話
        /// </summary>
        public string LocalPhone { get; set; }
        /// <summary>
        /// 行動電話
        /// </summary>
        public string MobilePhone { get; set; }

        /// <summary>
        /// 戶籍地址
        /// </summary>
        public string ResidenceAddress { get; set; }

        /// <summary>
        /// 通訊地址
        /// </summary>
        public string MailingAddresses { get; set; }
        /// <summary>
        /// 銀行帳號
        /// </summary>
        public string AccountId { get; set; }

        /// <summary>
        /// 資料提供日
        /// </summary>
        public string DataProvidedDate { get; set; }

        /// <summary>
		/// 資料提供日(轉換)
		/// </summary>
		public DateTime? DataProvidedDate_Cov { get; set; }

        /// <summary>
        /// 開戶日
        /// </summary>
        public string AccountOpeningDate { get; set; }

        /// <summary>
        /// 開戶日(轉換)
        /// </summary>
        public DateTime? AccountOpeningDate_Cov { get; set; }

        /// <summary>
        /// 結清日
        /// </summary>
        public string AccountClosingDate { get; set; }

        /// <summary>
        /// 結清日(轉換)
        /// </summary>
        public DateTime? AccountClosingDate_Cov { get; set; }

        /// <summary>
        /// 資料提供日結餘
        /// </summary>
        public string AccountBalance { get; set; }

        /// <summary>
		/// 資料提供日結餘(轉換)
		/// </summary>
		public long AccountBalance_Cov { get; set; }

        /// <summary>
        /// 備註
        /// </summary>
        public string Remark { get; set; }
        /// <summary>
        /// 建立時間
        /// </summary>
        public DateTime CreateTime { get; set; }
        /// <summary>
		/// 是否為本案相關帳戶
		/// </summary>
		public bool IsAccountMark { get; set; }

    }
}
