using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PaymentFlowAnalysis.Web.Models
{
    public class BlackAccountQueryParams : PaginationWithSortedQueryParams
    {
        /// <summary>             
        ///	身分證字號             
        /// </summary>
        public string IdCardNum { get; set; }

        /// <summary>
        ///錢包地址
        /// </summary>
        public string WalletAddress { get; set; }

        /// <summary>
        ///個人電話
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        ///電子郵件信箱
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        ///IP位置
        /// </summary>
        public string IP { get; set; }

        /// <summary>
        /// 網址
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        ///備註
        /// </summary>
        public string Remark { get; set; }
    }

}