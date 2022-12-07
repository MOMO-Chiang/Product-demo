using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    public class BlackAccountEmailDTO
    {
        /// <summary>
        ///錢包地址
        /// </summary>
        public string WalletAddress { get; set; }
        /// <summary>
        ///電子郵件信箱
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        ///資料建立時間
        /// </summary>
        public DateTime CreateTime { get; set; }
        /// <summary>
        ///資料修改時間
        /// </summary>
        public string UpdateTime { get; set; }
    }
}
