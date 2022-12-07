using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Common.Enums
{
    //資料來源機構
    public enum AgencyTypeEnum
    {
        [Description("ACE")]
        ACE = 1,
        [Description("MaiCoin")]
        MaiCoin = 2,
        [Description("BitoPro")]
        BitoPro = 3,
        [Description("BITGIN")]
        BITGIN = 4,
        [Description("調查局")]
        調查局 = 5
    }
}
