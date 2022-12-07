using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PaymentFlowAnalysis.Web.Models
{
    public class BankSafeDepositBoxQueryParams : PaginationWithSortedQueryParams
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
        public string RentDateStart { get; set; }

        /// <summary>
        /// 承租日期(迄)
        /// </summary>
        public string RentDateEnd { get; set; }

        /// <summary>
        /// 退租日期(起)
        /// </summary>
        public string LeaseCancellationDateStart { get; set; }

        /// <summary>
        /// 退租日期(迄)
        /// </summary>
        public string LeaseCancellationDateEnd { get; set; }

        /// <summary>
        /// 關鍵字查詢
        /// </summary>
        public string KeyWord { get; set; }

        /// <summary>
        /// 本案相關帳戶
        /// </summary>
        public string IsAccountMark { get; set; }
    }

}