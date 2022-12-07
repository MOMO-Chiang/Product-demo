using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("CryptoQueryDetail")]
    public class CryptoQueryDetail
    {
        /// <summary>
        /// 自動序號
        /// </summary>
        [ExplicitKey]
        public string Seq { get; set; }

        /// <summary>
        /// 調閱人人士五碼
        /// </summary>
        public string QueryUserId { get; set; }

        /// <summary>
        /// 交易所 ACE=1,MaiCion=2,BitoPro=3,Bitcin=4
        /// </summary>
        public int RequestAgency { get; set; }

        /// <summary>
        /// 查詢條件
        /// </summary>
        public int QueryConditionType { get; set; }

        /// <summary>
        /// 拋查值
        /// </summary>
        public string QueryValue { get; set; }

        /// <summary>
        /// 拋查狀態
        /// </summary>
        public int QueryStatus { get; set; }

        /// <summary>
        /// 主調閱單號
        /// </summary>
        public string OrderMasterNumber { get; set; }

        /// <summary>
        /// 調閱單號
        /// </summary>
        public string OrderDetailNumber { get; set; }

        /// <summary>
        /// 調閱人姓名
        /// </summary>
        public string QueryName { get; set; }

        /// <summary>
        /// 調閱人電話
        /// </summary>
        public string QueryPhone { get; set; }

        /// <summary>
        /// 調閱人信箱
        /// </summary>
        public string QueryEmail { get; set; }

        /// <summary>
        /// 調閱人職稱
        /// </summary>
        public string QueryRank { get; set; }

        /// <summary>
        /// 調閱人任職單位(洗錢防制處)
        /// </summary>
        public string QueryUnit { get; set; }

        /// <summary>
        /// 刑事案類(刑事調查)
        /// </summary>
        public string ProjectCategory { get; set; }

        /// <summary>
        /// 調閱來源種類
        /// </summary>
        public int SearchType { get; set; }

        /// <summary>
        /// 資料對應序號
        /// </summary>
        public string Uid { get; set; }

        /// <summary>
        /// 對應UID
        /// </summary>
        public string PersonalInfoId { get; set; }

        /// <summary>
        /// 交易所代號
        /// </summary>
        public int ExchangeTypeCode { get; set; }

        /// <summary>
        /// 調閱單號
        /// </summary>
        public string OrderNumber { get; set; }

        /// <summary>
        /// 交易所內個人帳戶ID
        /// </summary>
        public string AccountID { get; set; }

        /// <summary>
        /// 身分證字號
        /// </summary>
        public string IdCardNum { get; set; }

        /// <summary>
        /// 姓名
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 性別
        /// </summary>
        public int Sexual_Cov { get; set; }
        /// <summary>
        /// 生日
        /// </summary>
        public DateTime Birthday_Cov { get; set; }

        /// <summary>
        /// 個人總資產
        /// </summary>
        public string TotalProperty { get; set; }

        /// <summary>
        /// 信箱
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// 居住地址
        /// </summary>
        public string Address { get; set; }

        /// <summary>
        /// 註冊日期
        /// </summary>
        public DateTime RegisterDate_Cov { get; set; }

        /// <summary>
        /// 銀行代碼
        /// </summary>
        public string BankName { get; set; }

        /// <summary>
        /// 銀行代碼名稱
        /// </summary>
        public string Bank_Name { get; set; }

        /// <summary>
        /// 分行代碼
        /// </summary>
        public string Branch { get; set; }

        /// <summary>
        /// 分行名稱
        /// </summary>
        public string BranchName { get; set; }

        /// <summary>
        /// 銀行帳戶
        /// </summary>
        public string BankAccount { get; set; }

        /// <summary>
        /// 認證銀行代碼
        /// </summary>
        public string Verifiedbank { get; set; }

        /// <summary>
        /// 認證銀行名稱
        /// </summary>
        public string VerifiedbankName { get; set; }

        /// <summary>
        /// 認證日期
        /// </summary>
        public DateTime VerifyDate_Cov { get; set; }

        /// <summary>
        /// 建立時間
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// 資料回覆時間
        /// </summary>
        //public DateTime ReceiveTime { get; set; }

        /// <summary>
        /// 本案標記
        /// </summary>
        public string IsCaseMark { get; set; }

        /// <summary>
        /// 電話
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// 登入IP
        /// </summary>
        public string IP { get; set; }

        /// <summary>
        /// 錢包地址
        /// </summary>
        public string WallerAddress { get; set; }

        /// <summary>
        /// 照片路徑
        /// </summary>
        public string PictureSubPath { get; set; }

        /// <summary>
        /// 照片檔案名稱
        /// </summary>
        public string PictureFileName { get; set; }

    }

    [Table("CryptoQueryDetail")]
    public class PersonalInfoDetail
    {
        /// <summary>
        /// 調閱人人士五碼
        /// </summary>
        public string QueryUserId { get; set; }

        /// <summary>
        /// 交易所 ACE=1,MaiCion=2,BitoPro=3,Bitcin=4
        /// </summary>
        public int RequestAgency { get; set; }

        /// <summary>
        /// 查詢條件
        /// </summary>
        public int QueryConditionType { get; set; }

        /// <summary>
        /// 拋查值
        /// </summary>
        public string QueryValue { get; set; }

        /// <summary>
        /// 拋查狀態
        /// </summary>
        public int QueryStatus { get; set; }

        /// <summary>
        /// 主調閱單號
        /// </summary>
        public string OrderMasterNumber { get; set; }

        /// <summary>
        /// 調閱單號
        /// </summary>
        public string OrderDetailNumber { get; set; }

        /// <summary>
        /// 調閱人姓名
        /// </summary>
        public string QueryName { get; set; }

        /// <summary>
        /// 調閱人電話
        /// </summary>
        public string QueryPhone { get; set; }

        /// <summary>
        /// 調閱人信箱
        /// </summary>
        public string QueryEmail { get; set; }

        /// <summary>
        /// 調閱人職稱
        /// </summary>
        public string QueryRank { get; set; }

        /// <summary>
        /// 調閱人任職單位(洗錢防制處)
        /// </summary>
        public string QueryUnit { get; set; }

        /// <summary>
        /// 刑事案類(刑事調查)
        /// </summary>
        public string ProjectCategory { get; set; }

        /// <summary>
        /// 調閱來源種類
        /// </summary>
        public int SearchType { get; set; }
    }

    [Table("CryptoQueryDetail")]
    public class CryptoQuery
    {
        /// <summary>
        ///自動序號
        /// </summary>
        public long Seq { get; set; }
        /// <summary>
        ///調閱時間
        /// </summary>
        public DateTime QueryOrderTime { get; set; }
        /// <summary>
        ///調閱人人事五碼
        /// </summary>
        public string QueryUserId { get; set; }
        /// <summary>
        ///交易所publicenumAgencyTypeEnum{[Remark("ACE")]ACE=1,[Remark("MaiCoin")]MaiCoin=2,[Remark("BitoPro")]BitoPro=3,[Remark("BITGIN")]BITGIN=4}
        /// </summary>
        public int RequestAgency { get; set; }
        /// <summary>
        ///查詢條件publicenumQueryTypeEnum{[Remark("walletAddress")]walletAddress=1,[Remark("internalAccount")]internalAccount=2,[Remark("transactionSquence")]transactionSquence=3,[Remark("idCardNumber")]idCardNumber=4,[Remark("bankAccount")]bankAccount=5,[Remark("TxID")]TxID=6,[Remark("phone")]phone=7,[Remark("email")]email=8}
        /// </summary>
        public int QueryConditionType { get; set; }
        /// <summary>
        ///拋查值-查詢的內容
        /// </summary>
        public string QueryValue { get; set; }
        /// <summary>
        ///拋查狀態publicenumQueryStatusEnum{[Remark("等待回覆中")]wait=1,[Remark("資料已回覆")]success=2,[Remark("拋查執行錯誤")]fail=3}
        /// </summary>
        public int QueryStatus { get; set; }
        /// <summary>
        ///主調閱單號,此單號用來對應同批查詢的紀錄明細4802722071113351500調閱單號明細MJIB-4802722071113351500-1MJIB-4802722071113351500-2
        /// </summary>
        public string OrderMasterNumber { get; set; }
        /// <summary>
        ///調閱單號,會送至交易所
        /// </summary>
        public string OrderDetailNumber { get; set; }
        /// <summary>
        ///調閱人姓名
        /// </summary>
        public string QueryName { get; set; }
        /// <summary>
        ///調閱人電話
        /// </summary>
        public string QueryPhone { get; set; }
        /// <summary>
        ///調閱人Email
        /// </summary>
        public string QueryEmail { get; set; }
        /// <summary>
        ///調閱人職稱
        /// </summary>
        public string QueryRank { get; set; }
        /// <summary>
        ///調閱人任職單位(洗錢防制處)
        /// </summary>
        public string QueryUnit { get; set; }
        /// <summary>
        ///刑事案類(刑事調查)
        /// </summary>
        public string ProjectCategory { get; set; }
        /// <summary>
        ///調閱來源種類///<summary>///調閱類別,個資調閱/相關交易個資調閱=錢包反查/交易資料調閱///</summary>publicenumQueryInfoTypeEnum{[Remark("個資調閱")]PersonalInfo=1,[Remark("相關交易個資調閱")]//錢包地址反查WalletAddress=2,[Remark("交易資料調閱")]TransactionInfo=3}
        /// </summary>
        public int SearchType { get; set; }


    }
    
}
