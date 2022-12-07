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
    public class CryptoPersonalInfoWalletSearchModel
    {
        /// <summary>
        ///調閱單號
        /// </summary>
        public string OrderNumber { get; set; }
        /// <summary>
        ///錢包地址
        /// </summary>
        public string WallerAddress { get; set; }
        
    }
}
