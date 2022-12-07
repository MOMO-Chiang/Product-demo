using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PaymentFlowAnalysis.Web.Models
{
    //public class PersonalInfoSearchAPIQueryParams : PaginationWithSortedQueryParams
    //{
    //    /// <summary>             
    //    /// 使用者帳號             
    //    /// </summary>
    //    public string UserId { get; set; }

    //    /// <summary>
    //    /// 使用者名稱
    //    /// </summary>
    //    public string UserName { get; set; }

    //    /// <summary>
    //    /// 單位代碼
    //    /// </summary>
    //    public string UnitCode { get; set; }

    //    /// <summary>
    //    /// 單位名稱
    //    /// </summary>
    //    public string UnitName { get; set; }

    //    /// <summary>
    //    /// 電子信箱
    //    /// </summary>
    //    public string UserEmail { get; set; }

    //    /// <summary>
    //    /// 連絡電話
    //    /// </summary>
    //    public string UserPhone { get; set; }
    //}

    public class PersonalInfoSearchCreationAPIQueryParams
    {
        /// <summary>
        /// 案名
        /// </summary>
        public string CaseNo { get; set; }

        /// <summary>
        /// 案號
        /// </summary>
        public string CaseName { get; set; }

        /// <summary>
        /// 查詢選項
        /// </summary>
        public int QueryConditionType { get; set; }

        /// <summary>
        /// 查詢內容
        /// </summary>
        public string QueryConditionInfo { get; set; }

        /// <summary>
        /// 人事五碼
        /// </summary>
        public string QueryUserId { get; set; }
        
        /// <summary>
        /// 姓名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 電話
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// 電子信箱
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// 任職職稱
        /// </summary>
        public string Rank { get; set; }

        /// <summary>
        /// 任職單位
        /// </summary>
        public string Unit { get; set; }

        /// <summary>
        /// 交易種類
        /// </summary>
        public int SearchType { get; set; }

        /// <summary>
        /// 刑事案類
        /// </summary>
        public string ProjectCategory { get; set; }

        /// <summary>
        /// 代拋查
        /// </summary>
        public string ActionUserId { get; set; } = "";

    }

    public class PersonalInfoSearchAPI
    {
        /// <summary>
        /// 交易所帳號
        /// </summary>
        public string InternalAccount { get; set; }

        /// <summary>
        /// 超商交易序號
        /// </summary>
        public string TransactionSquence { get; set; } 

        /// <summary>
        /// 身分證字號
        /// </summary>
        public string IdCardNumber { get; set; } 

        /// <summary>
        /// 銀行帳號
        /// </summary>
        public string BankAccount { get; set; }

        /// <summary>
        /// 區塊鏈交易序號TxID
        /// </summary>
        public string TxID { get; set; } 

        /// <summary>
        /// 電話
        /// </summary>
        public string Phone { get; set; } 

        /// <summary>
        /// 信箱
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// 錢包地址
        /// </summary>
        public string WalletAddress { get; set; }

        /// <summary>
        /// 調閱單號
        /// </summary>
        public string OrderNumber { get; set; }


        /// <summary>
        /// 調閱人資料
        /// </summary>
        public AccountInfo AccountInfo { get; set; }

        /// <summary>
        /// 刑事案類
        /// </summary>
        public string ProjectCategory { get; set; }
        
        /// <summary>
        /// 代拋查
        /// </summary>
        public string ActionUserId { get; set; } = null;

    }

    public class AccountInfo
    {
        /// <summary>
        /// 姓名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 電話
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// 電子信箱
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// 任職職稱
        /// </summary>
        public string Rank { get; set; }

        /// <summary>
        /// 任職單位
        /// </summary>
        public string Unit { get; set; }

        /// <summary>
        /// 調閱結果返回機構代碼
        /// </summary>
        public string Organization { get; set; }

        /// <summary>
        /// 調閱結果返回網址
        /// </summary>
        public string CallbackUrl { get; set; }
    }

    //public class PersonalInfoSearchUpdateAPIQueryParams
    //{
    //    /// <summary>
    //    /// 使用者名稱
    //    /// </summary>
    //    public string UserName { get; set; }

    //    /// <summary>
    //    /// 單位代碼
    //    /// </summary>
    //    public string UnitCode { get; set; }

    //    /// <summary>
    //    /// 單位名稱
    //    /// </summary>
    //    public string UnitName { get; set; }

    //    /// <summary>
    //    /// 電子信箱
    //    /// </summary>
    //    public string UserEmail { get; set; }

    //    /// <summary>
    //    /// 連絡電話
    //    /// </summary>
    //    public string UserPhone { get; set; }

    //    /// <summary>
    //    /// 有效
    //    /// </summary>
    //    public bool? IsValid { get; set; }

    //    /// <summary>
    //    /// 建立時間
    //    /// </summary>
    //    public DateTime? CreateTime { get; set; }

    //    /// <summary>
    //    /// 最後異動人員帳號
    //    /// </summary>
    //    public string UpdateUserId { get; set; }

    //    /// <summary>
    //    /// 最後異動人員名稱
    //    /// </summary>
    //    public string UpdateUserName { get; set; }

    //    /// <summary>
    //    /// 最後異動時間
    //    /// </summary>
    //    public DateTime? UpdateTime { get; set; }

    //}
}