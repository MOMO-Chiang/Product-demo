using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Common.Enums
{
    //拋查條件
    public enum QueryConditionType
    {
        [Description("walletAddress")]
        錢包地址 = 1,
        [Description("internalAccount")]
        交易所帳號 = 2,
        [Description("transactionSquence")]
        超商交易序號 = 3,
        [Description("idCardNumber")]
        身分證字號 = 4,
        [Description("bankAccount")]
        銀行帳號 = 5,
        [Description("TxID")]
        區塊鏈交易序號TxID = 6,
        [Description("phone")]
        交易所帳號手機號碼 = 7,
        [Description("email")]
        交易所帳號電子信箱 = 8
    }
}
