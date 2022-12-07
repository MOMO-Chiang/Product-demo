using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Service.Models
{
    public class CryptoQueryDTO
    {
        /// <summary>
        ///自動序號
        /// </summary>
        public long Seq { get; set; }
        /// <summary>
        ///調閱時間
        /// </summary>
        public string QueryOrderTime { get; set; }
        /// <summary>
        ///調閱人人事五碼
        /// </summary>
        public string QueryUserId { get; set; }
        /// <summary>
        ///交易所publicenumAgencyTypeEnum{[Remark("ACE")]ACE=1,[Remark("MaiCoin")]MaiCoin=2,[Remark("BitoPro")]BitoPro=3,[Remark("BITGIN")]BITGIN=4}
        /// </summary>
        public string RequestAgency { get; set; }
        /// <summary>
        ///查詢條件publicenumQueryTypeEnum{[Remark("walletAddress")]walletAddress=1,[Remark("internalAccount")]internalAccount=2,[Remark("transactionSquence")]transactionSquence=3,[Remark("idCardNumber")]idCardNumber=4,[Remark("bankAccount")]bankAccount=5,[Remark("TxID")]TxID=6,[Remark("phone")]phone=7,[Remark("email")]email=8}
        /// </summary>
        public string QueryConditionType { get; set; }
        /// <summary>
        ///拋查值-查詢的內容
        /// </summary>
        public string QueryValue { get; set; }
        /// <summary>
        ///拋查狀態publicenumQueryStatusEnum{[Remark("等待回覆中")]wait=1,[Remark("資料已回覆")]success=2,[Remark("拋查執行錯誤")]fail=3}
        /// </summary>
        public string QueryStatus { get; set; }
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
