using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("CryptoBlackAccountPhone")]
    public class BlackAccountPhone
    {
        [ExplicitKey]
        /// <summary>
        ///錢包地址
        /// </summary>
        public string WalletAddress { get; set; }
        /// <summary>
        ///個人電話
        /// </summary>
        public string Phone { get; set; }
        /// <summary>
        ///資料建立時間
        /// </summary>
        public DateTime CreateTime { get; set; }
        /// <summary>
        ///資料修改時間
        /// </summary>
        public DateTime UpdateTime { get; set; }


    }
}
