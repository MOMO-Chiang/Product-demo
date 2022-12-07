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
    public class CryptoQueryDetailSearchModel
    {
        /// <summary>
        /// 調閱主序號
        /// </summary>
        public string OrderMasterNumber { get; set; }
        /// <summary>
        /// 交易所帳號
        /// </summary>
        public string AccountID { get; set; }
        /// <summary>
        /// 姓名
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 手機
        /// </summary>
        public string Phone { get; set; }
        /// <summary>
        /// 電子信箱
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// 銀行帳號
        /// </summary>
        public string BankAccount { get; set; }
        /// <summary>
        /// 錢包地址
        /// </summary>
        public string WallerAddress { get; set; }
        /// <summary>
        /// 身份證字號
        /// </summary>
        public string IdCardNum { get; set; }
        /// <summary>
        /// 調閱單號
        /// </summary>
        public string OrderNumber { get; set; }

        /// <summary>
        /// 本案標記
        /// </summary>
        public string IsCaseMark { get; set; }

        /// <summary>
        /// 調閱單號(陣列)
        /// </summary>
        public Array OrderDetailNumber { get; set; }

    }

    /// <summary>
    /// 資料調閱搜尋條件
    /// </summary>
    public class CryptoQuerySearchModel
    {
        /// <summary>
        ///調閱人人事五碼
        /// </summary>
        public string QueryUserId { get; set; }
        /// <summary>
        /// 交易所
        /// </summary>
        public string RequestAgency { get; set; }
        /// <summary>
        /// 拋查條件
        /// </summary>
        public string QueryConditionType { get; set; }
        /// <summary>
        /// 拋查值
        /// </summary>
        public string QueryValue { get; set; }
        /// <summary>
        ///調閱單號
        /// </summary>
        public string OrderDetailNumber { get; set; }
        /// <summary>
        /// 拋查時間(起)
        /// </summary>
        public DateTime? QueryOrderTimeStart { get; set; }
        /// <summary>
        /// 拋查時間(迄)
        /// </summary>
        public DateTime? QueryOrderTimeEnd { get; set; }

    }
}
