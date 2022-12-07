using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("CryptoPersonalInfo_API")]
    public class CryptoPersonalInfo_API
    {
        /// <summary>
        ///自動序號
        /// </summary>
        [Key]
        public long Uid { get; set; } //(bigint, not null)
        /// <summary>
        ///唯一序號
        /// </summary>
        public string PersonalInfoId { get; set; } //((nvarchar(100)), not null)
        /// <summary>
        ///交易所代碼,bitpro/.....///<summary>///交易所種類///</summary>publicenumExchangeTypeEnum{[Remark("unknown")]unknown=0,[Remark("ACE")]ACE=1,[Remark("MaiCoin")]MaiCoin=2,[Remark("BitoPro")]BitoPro=3,[Remark("BITGIN")]BITGIN=4}
        /// </summary>
        public int ExchangeTypeCode { get; set; } //(int, not null)
        /// <summary>
        ///調閱單號
        /// </summary>
        public string OrderNumber { get; set; } //((nvarchar(50)), not null)
        /// <summary>
        ///交易所內個人帳戶ID
        /// </summary>
        public string AccountID { get; set; } //((nvarchar(100)), null)
        /// <summary>
        ///身分證字號
        /// </summary>
        public string IdCardNum { get; set; } //((nvarchar(20)), null)
        /// <summary>
        ///姓名
        /// </summary>
        public string Name { get; set; } //((nvarchar(50)), null)
        /// <summary>
        ///性別,male/female/unknown///<summary>///性別///</summary>publicenumSexualEnum{[Remark("未知")]unknown=0[Remark("男")]male=1,[Remark("女")]female=2,}
        /// </summary>
        public int Sexual_Cov { get; set; } //(int, null)
        /// <summary>
        ///生日(原始)
        /// </summary>
        public int Birthday { get; set; } //(int, null)
        /// <summary>
        ///生日(轉換過)
        /// </summary>
        public DateTime Birthday_Cov { get; set; } //(datetime, null)
        /// <summary>
        ///個人總資產，包含各錢包餘額以及幣商平台內餘額以新台幣計算
        /// </summary>
        public double TotalProperty { get; set; } //(float, null)
        /// <summary>
        ///電子郵件信箱
        /// </summary>
        public string Email { get; set; } //((nvarchar(100)), null)
        /// <summary>
        ///居住地址
        /// </summary>
        public string Address { get; set; } //((nvarchar(200)), null)
        /// <summary>
        ///註冊日期(原始)
        /// </summary>
        public int RegisterDate { get; set; } //(int, null)
        /// <summary>
        ///註冊日期(轉換過)
        /// </summary>
        public DateTime RegisterDate_Cov { get; set; } //(datetime, null)
        /// <summary>
        ///銀行代碼
        /// </summary>
        public string BankName { get; set; } //((nvarchar(10)), null)
        /// <summary>
        ///分行名稱
        /// </summary>
        public string Branch { get; set; } //((nvarchar(10)), null)
        /// <summary>
        ///銀行帳戶
        /// </summary>
        public string BankAccount { get; set; } //((nvarchar(30)), null)
        /// <summary>
        ///認證銀行代碼
        /// </summary>
        public string Verifiedbank { get; set; } //((nvarchar(20)), null)
        /// <summary>
        ///驗證日期(原始)
        /// </summary>
        public int VerifyDate { get; set; } //(int, null)
        /// <summary>
        ///驗證日期(轉換過)
        /// </summary>
        public DateTime VerifyDate_Cov { get; set; } //(datetime, null)
        /// <summary>
        ///是否資料已同步至內網
        /// </summary>
        public bool IsDataSync { get; set; } //(bit, not null)
        /// <summary>
        ///資料建立時間
        /// </summary>
        public DateTime CreateTime { get; set; } //(datetime, not null)
        /// <summary>
        ///本案標記
        /// </summary>
        public bool IsCaseMark { get; set; } //(bit, not null)
        /// <summary>
        ///性別,male/female/unknown
        /// </summary>
        public string Sexual { get; set; } //((nvarchar(10)), null)
    }
}
