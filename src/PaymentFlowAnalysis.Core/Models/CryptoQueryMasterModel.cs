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
    public class CryptoQueryMasterSearchModel
    {
        /// <summary>
        /// 案號
        /// </summary>
        public string CaseNo { get; set; }
        
        /// <summary>
        /// 交易種類
        /// </summary>
        public string SearchType { get; set; }

        /// <summary>
        /// 調閱主序號(陣列)
        /// </summary>
        public Array OrderMasterNumber { get; set; }

        /// <summary>
        /// 調閱人事五碼
        /// </summary>
        public string QueryUserId { get; set; }

        /// <summary>
        /// 調閱主序號
        /// </summary>
        public string _OrderMasterNumber { get; set; }

        ///// <summary>
        ///// 錢包地址
        ///// </summary>
        //public string WallerAddress { get; set; }

        ///// <summary>
        ///// 手機
        ///// </summary>
        //public string Phone { get; set; }

        ///// <summary>
        ///// 交易所帳號
        ///// </summary>
        //public string AccountID { get; set; }
        ///// <summary>
        ///// 姓名
        ///// </summary>
        //public string Name { get; set; }

        ///// <summary>
        ///// 電子信箱
        ///// </summary>
        //public string Email { get; set; }
        ///// <summary>
        ///// 銀行帳號
        ///// </summary>
        //public string BankAccount { get; set; }

        ///// <summary>
        ///// 調閱單號
        ///// </summary>
        //public string OrderNumber { get; set; }

    }
    public class OrderMasterNumbers
    {
        /// <summary>
        /// 調閱主序號
        /// </summary>
        public string OrderMasterNumber { get; set; }

    }
}
