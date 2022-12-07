using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PaymentFlowAnalysis.Web.Models
{
    public class BigTradeQueryParams : PaginationWithSortedQueryParams
    {
        /// <summary>             
        ///	交易人身份證字號             
        /// </summary>
        public string RemitterId { get; set; }

        /// <summary>
        /// 交易人姓名
        /// </summary>
        public string RemitterName { get; set; }

        /// <summary>
        /// 交易人電話
        /// </summary>
        public string RemitterPhone { get; set; }

        /// <summary>
        /// 客戶地址
        /// </summary>
        public string CustomerAddress { get; set; }

        /// <summary>
        /// 受款人身分證
        /// </summary>
        public string BeneficiaryId { get; set; }

        /// <summary>
        /// 受款人姓名
        /// </summary>
        public string Beneficiary { get; set; }

        /// <summary>
        /// 交易日期(起)
        /// </summary>
        public string RemitTimeStart { get; set; }

        /// <summary>
        /// 交易日期(迄)
        /// </summary>
        public string RemitTimeEnd { get; set; }
    }

}