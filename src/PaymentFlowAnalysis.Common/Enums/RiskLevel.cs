using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Common.Enums
{
    //資料來源機構
    public enum RiskLevel
    {
        [Description("被害人")]
        被害人 = 0,
        [Description("交易所自行分析所得之高風險用戶")]
        交易所自行分析所得之高風險用戶 = 1,
        [Description("加害者（含犯嫌與人頭戶)")]
        加害者 = 2,
    }
}
