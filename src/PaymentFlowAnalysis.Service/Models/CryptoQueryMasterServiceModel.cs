

namespace PaymentFlowAnalysis.Service.Models
{
    public class CryptoQueryMasterServiceModel : PaginationWithSortedQueryParams
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
        /// 調閱人事五碼
        /// </summary>
        public string QueryUserId { get; set; }

        /// <summary>
        /// 本案標記
        /// </summary>
        public string IsCaseMark { get; set; }

        ///// <summary>
        ///// 調閱主序號
        ///// </summary>
        //public string OrderNumber { get; set; }

    }
}
