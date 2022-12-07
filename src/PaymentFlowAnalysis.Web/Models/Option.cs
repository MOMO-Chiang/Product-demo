using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PaymentFlowAnalysis.Web.Models
{
    public class Option
    {
        /// <summary>
        /// 下拉選單的顯示文字
        /// </summary>
        public string Text { get; set; }
        /// <summary>
        /// 下拉選單的值
        /// </summary>
        public string Value { get; set; }
    }

}