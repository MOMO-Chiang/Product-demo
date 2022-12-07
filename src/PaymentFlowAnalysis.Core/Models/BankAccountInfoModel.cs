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
    public class BankAccountInfoSearchModel
	{        
        /// <summary>             
        ///	銀行帳號             
        /// </summary>
        public string AccountId { get; set; }

        /// <summary>
        /// 身份證字號
        /// </summary>
        public string IdCardNumber { get; set; }

        /// <summary>
        /// 戶名
        /// </summary>
        public string AccountName { get; set; }

        /// <summary>
        /// 行動電話
        /// </summary>
        public string MobilePhone { get; set; }

        /// <summary>
        /// 開戶日期(起)
        /// </summary>
        public DateTime? AccountOpeningDateStart { get; set; }

		/// <summary>
		/// 開戶日期(迄)
		/// </summary>
		public DateTime? AccountOpeningDateEnd { get; set; }
        
        /// <summary>
        /// 本案相關帳戶
        /// </summary>
        public bool IsAccountMark { get; set; }
    }
}
