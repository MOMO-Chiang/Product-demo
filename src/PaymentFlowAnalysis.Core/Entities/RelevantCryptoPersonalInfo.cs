using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("CryptoPersonalInfo")]
    public class RelevantCryptoPersonalInfo
    {
        /// <summary>
        /// 自動序號
        /// </summary>
        [ExplicitKey]
        public string Seq { get; set; }

        /// <summary>
        /// 資料對應序號
        /// </summary>
        public string Uid { get; set; }

        /// <summary>
        /// 交易所代號
        /// </summary>
        public string ExchangeTypeCode { get; set; }

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
        public string Sexual { get; set; }

        /// <summary>
        /// 生日
        /// </summary>
        public string Birthday { get; set; }

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
        public DateTime RegisterDate { get; set; }

        /// <summary>
        /// 銀行代碼
        /// </summary>
        public string BankName { get; set; }

        /// <summary>
        /// 分行名稱
        /// </summary>
        public string Branch { get; set; }

        /// <summary>
        /// 銀行帳戶
        /// </summary>
        public string BankAccount { get; set; }

        /// <summary>
        /// 認證銀行代碼
        /// </summary>
        public string Verifiedbank { get; set; }

        /// <summary>
        /// 認證日期
        /// </summary>
        public DateTime VerifyDate { get; set; }

        /// <summary>
        /// 建立時間
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// 資料回覆時間
        /// </summary>
        public DateTime ReceiveTime { get; set; }
        
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
        /// 照片列表
        /// </summary>
        public string Picture { get; set; }
    }
}
