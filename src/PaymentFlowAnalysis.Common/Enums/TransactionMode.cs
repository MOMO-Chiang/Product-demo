using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Common.Enums
{
    //拋查條件
    public enum TransactionMode
    {

        [Description("虛擬幣->虛擬幣")]
        虛擬幣To虛擬幣 = 1,
        [Description("虛擬幣->法幣")]
        虛擬幣To法幣 = 2,
        [Description("法幣->虛擬幣")]
        法幣To虛擬幣 = 3
    }
}
