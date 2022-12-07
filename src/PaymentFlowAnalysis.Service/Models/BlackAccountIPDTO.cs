
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    public class BlackAccountIPDTO
    {
        /// <summary>
        ///錢包地址
        /// </summary>
        public string WalletAddress { get; set; }
        /// <summary>
        ///IP位置
        /// </summary>
        public string IP { get; set; }
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
