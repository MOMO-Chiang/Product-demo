using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Service.Models
{
    public class BlackAccountPageInfoDTO
    {
        /// <summary>
        ///錢包地址
        /// </summary>
        public string WalletAddress { get; set; }
        /// <summary>
        ///錢包幣別,Enumeration.CryptoCurrencyType
        /// </summary>
        public string CurrencyType { get; set; }
        /// <summary>
        ///交易所代碼,bitpro/.....///<summary>///交易所種類///</summary>publicenumExchangeTypeEnum{[Remark("unknown")]unknown=0,[Remark("ACE")]ACE=1,[Remark("MaiCoin")]MaiCoin=2,[Remark("BitoPro")]BitoPro=3,[Remark("BITGIN")]BITGIN=4}
        /// </summary>
        public int ExchangeTypeCode { get; set; }
        /// <summary>
        ///交易所代碼,bitpro/.....///<summary>///交易所種類///</summary>publicenumExchangeTypeEnum{[Remark("unknown")]unknown=0,[Remark("ACE")]ACE=1,[Remark("MaiCoin")]MaiCoin=2,[Remark("BitoPro")]BitoPro=3,[Remark("BITGIN")]BITGIN=4}
        /// </summary>
        public string ExchangeTypeCodeStr { get; set; }
        /// <summary>
        ///身分證字號
        /// </summary>
        public string IdCardNum { get; set; }
        /// <summary>
        ///風險類別,Enumeration.CryptoRiskLevel
        /// </summary>
        public int Risklevel { get; set; }

        /// <summary>
        ///風險類別,Enumeration.CryptoRiskLevel
        /// </summary>
        public string RisklevelStr { get; set; }
        /// <summary>
        /// 網址
        /// </summary>
        public string Url { get; set; }
        /// <summary>
        ///資料建立時間
        /// </summary>
        public DateTime CreateTime { get; set; }
        /// <summary>
        ///資料修改時間
        /// </summary>
        public string UpdateTime { get; set; }
        /// <summary>
        ///備註
        /// </summary>
        public string Remark { get; set; }

        /// <summary>
        ///個人電話
        /// </summary>
        public string UserPhone { get; set; }

        /// <summary>
        ///電子郵件信箱
        /// </summary>
        public string UserEmail { get; set; }

        /// <summary>
        ///IP位置
        /// </summary>
        public string UserIP { get; set; }

    }
}
