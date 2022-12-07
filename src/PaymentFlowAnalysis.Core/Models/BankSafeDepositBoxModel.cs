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
    public class BankSafeDepositBoxSearchModel
    {
        /// <summary>             
        ///	身份證字號             
        /// </summary>
        public string IdCardNumber { get; set; }

        /// <summary>
        /// 承租人
        /// </summary>
        public string Renter { get; set; }

        /// <summary>
        /// 行動電話
        /// </summary>
        public string MobilePhone { get; set; }

        /// <summary>
        /// 箱號或室號
        /// </summary>
        public string BoxNumber { get; set; }

        /// <summary>
        /// 承租日期(起)
        /// </summary>
        public DateTime? RentDateStart { get; set; }

		/// <summary>
		/// 承租日期(迄)
		/// </summary>
		public DateTime? RentDateEnd { get; set; }

        /// <summary>
        /// 退租日期(起)
        /// </summary>
        public DateTime? LeaseCancellationDateStart { get; set; }

        /// <summary>
        /// 退租日期(迄)
        /// </summary>
        public DateTime? LeaseCancellationDateEnd { get; set; }

        /// <summary>
        /// 關鍵字查詢
        /// </summary>
        public string KeyWord { get; set; }

        /// <summary>
        /// 本案相關帳戶
        /// </summary>
        public bool IsAccountMark { get; set; }
    }
}
