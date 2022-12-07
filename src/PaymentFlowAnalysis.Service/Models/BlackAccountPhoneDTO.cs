using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    public class BlackAccountPhoneDTO
    {
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
        public string UpdateTime { get; set; }
    }
}
