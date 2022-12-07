using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    public class BankSafeDepositBoxDTO
    {
        /// <summary>
        ///自動序號
        /// </summary>
        public long Seq { get; set; }
        /// <summary>
        ///對應GUID
        /// </summary>
        public string BankDepositBoxSeq { get; set; }
        /// <summary>
        ///身分證統一編號
        /// </summary>
        public string IdCardNumber { get; set; }
        /// <summary>
        ///出租行總分支機構代碼
        /// </summary>
        public string BankBranchCode { get; set; }
        /// <summary>
        ///承租種類
        /// </summary>
        public string BoxRentType { get; set; }
        /// <summary>
        ///承租人
        /// </summary>
        public string Renter { get; set; }
        /// <summary>
        ///市內電話
        /// </summary>
        public string LocalPhone { get; set; }
        /// <summary>
        ///行動電話
        /// </summary>
        public string MobilePhone { get; set; }
        /// <summary>
        ///戶籍地址
        /// </summary>
        public string ResidenceAddress { get; set; }
        /// <summary>
        ///通訊地址
        /// </summary>
        public string MailingAddress { get; set; }
        /// <summary>
        ///箱號或室號
        /// </summary>
        public string BoxNumber { get; set; }
        /// <summary>
        ///資料提供日
        /// </summary>
        public string DataProvidedTime { get; set; }
        /// <summary>
        ///資料提供日(轉換過)
        /// </summary>
        public string DataProvidedTime_Cov { get; set; }
        /// <summary>
        ///承租日(轉換過)
        /// </summary>
        public string RentDate_Cov { get; set; }

        /// <summary>
        ///承租日(轉換過)
        /// </summary>
        public string RentDate { get; set; }

        /// <summary>
        ///退租日
        /// </summary>
        public string LeaseCancellationDate { get; set; }
        /// <summary>
        ///退租日(轉換過)
        /// </summary>
        public string LeaseCancellationDate_Cov { get; set; }
        /// <summary>
        ///備註
        /// </summary>
        public string Remark { get; set; }
        /// <summary>
        ///資料建立時間
        /// </summary>
        public string CreateTime { get; set; }
        /// <summary>
		/// 是否為本案相關帳戶
		/// </summary>
		public bool IsAccountMark { get; set; }

    }
}
