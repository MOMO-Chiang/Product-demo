using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Common.Enums
{
    //拋查條件
    public enum QueryStatusType
    {

        [Description("等待回覆中")]
        等待回覆中 = 1,
        [Description("資料已回覆")]
        資料已回覆 = 2,
        [Description("拋查執行錯誤")]
        拋查執行錯誤 = 3
    }
}
