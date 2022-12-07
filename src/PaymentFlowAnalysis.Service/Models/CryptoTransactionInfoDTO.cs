using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Service.Models
{
    public class CryptoTransactionInfoDTO
    {
        /// <summary>
        ///自動序號
        /// </summary>
        public long Seq { get; set; }
        /// <summary>
        /// 交易所
        /// </summary>
        public string ExchangeTypeCode { get; set; }

        /// <summary>
        /// 調閱單號
        /// </summary>
        public string OrderNumber { get; set; }
        /// <summary>
        /// 調閱主單號
        /// </summary>
        public string OrderMasterNumber { get; set; }
        /// <summary>
        /// 交易TxID
        /// </summary>
        public string TxID { get; set; }

        /// <summary>
        /// 內部交易序號
        /// </summary>
        public string InternalTxID { get; set; }

        /// <summary>
        /// 交易時間
        /// </summary>
        public string TransactionTime_Cov { get; set; }

        /// <summary>
        /// 交易種類
        /// </summary>
        public string TransactionType { get; set; }

        /// <summary>
        /// 轉出帳戶/內部交易帳號accountID
        /// </summary>
        public string RemittanceAccount { get; set; }

        /// <summary>
        /// 轉出帳號種類
        /// </summary>
        public string RemittanceAccountType { get; set; }

        /// <summary>
        /// 轉出幣別
        /// </summary>
        public string RemittanceCurrency { get; set; }

        /// <summary>
        /// 轉出數量
        /// </summary>
        public float OutwardsaAmount { get; set; }

        /// <summary>
        /// 轉出銀行代碼/超商名稱(FamilyMart)
        /// </summary>
        public string RemittanceBank { get; set; }

        /// <summary>
        /// 轉出銀行名稱/超商名稱(FamilyMart)
        /// </summary>
        public string RemittanceBankName { get; set; }

        /// <summary>
        /// 轉出分行代碼/付款超商分店代碼
        /// </summary>
        public string RemittanceBranch { get; set; }

        /// <summary>
        /// 轉出分行名稱/付款超商分店名稱
        /// </summary>
        public string RemittanceBranchName { get; set; }

        /// <summary>
        /// 轉入帳戶/內部交易帳號accountID
        /// </summary>
        public string BeneficiaryAccount { get; set; }

        /// <summary>
        /// 轉入帳號種類
        /// </summary>
        public string BeneficiaryAccountType { get; set; }

        /// <summary>
        /// 轉入幣別
        /// </summary>
        public string BeneficiaryCurrency { get; set; }

        /// <summary>
        /// 轉入數量
        /// </summary>
        public float InwardsAmount { get; set; }

        /// <summary>
        /// 轉入銀行代碼
        /// </summary>
        public string BeneficiaryBank { get; set; }

        /// <summary>
        /// 轉入銀行名稱
        /// </summary>
        public string BeneficiaryBankName { get; set; }

        /// <summary>
        /// 轉入分行代碼
        /// </summary>
        public string BeneficiaryBranch { get; set; }

        /// <summary>
        /// 轉入分行名稱
        /// </summary>
        public string BeneficiaryBranchName { get; set; }

        /// <summary>
        /// 交易狀態
        /// </summary>
        public string TransactionStatus { get; set; }

        /// <summary>
        /// 1(虛擬幣->虛擬幣)  2(虛擬幣->法幣) 3(法幣->虛擬幣)
        /// </summary>
        public string TransactionMode { get; set; }

        /// <summary>
        /// 資料建立時間
        /// </summary>
        public string CreateTime { get; set; }

        /// <summary>
        ///拋查狀態publicenumQueryStatusEnum{[Remark("等待回覆中")]wait=1,[Remark("資料已回覆")]success=2,[Remark("拋查執行錯誤")]fail=3}
        /// </summary>
        public string QueryStatus { get; set; }
    }
}

