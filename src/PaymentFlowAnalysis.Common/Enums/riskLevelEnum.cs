using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Common.Enums
{
    //風險等級 
    public enum RiskLevelEnum
    {
        [Description("被害人")]
        VICTIM = 0,
        [Description("交易所自行分析所得之高風險用戶")]
        HIGHRISK = 1,
        [Description("加害者（含犯嫌與人頭戶)")]
        PERPETRATOR = 2,
    }
}
