using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("BankCode")]
    public class QueryBankCode
    {
        /// <summary>
        ///自動序號
        /// </summary>
        [Key]
        /// <summary>
        ///
        /// </summary>
        public int Seq { get; set; }
        /// <summary>
        ///
        /// </summary>
        public string BankCode { get; set; }
        /// <summary>
        ///
        /// </summary>
        public string BankName { get; set; }
        /// <summary>
        ///
        /// </summary>
        public string BankBranchCode { get; set; }
        /// <summary>
        ///
        /// </summary>
        public string BankBranchName { get; set; }
    }
}
