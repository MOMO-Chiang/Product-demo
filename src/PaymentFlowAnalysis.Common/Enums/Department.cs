using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Common.Enums
{
    /// <summary>
    /// 部門
    /// </summary>
    public enum Department
    {
        [Description("測試用")]
        TEMPFILE = 0,
        [Description("毒防")]
        DRUG = 1,
        [Description("廉政")]
        INCORRUPT = 2,
        [Description("經防")]
        ECONOMIC = 3,
        [Description("電腦犯罪")]
        COMPUTER_CRIMINAL = 4,
        //[Description("國維")]
        //GUOWEI = 5,
    }
}
