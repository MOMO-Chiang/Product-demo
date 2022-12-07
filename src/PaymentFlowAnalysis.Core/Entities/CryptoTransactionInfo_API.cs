using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("CryptoTransactionInfo_API")]
    public class CryptoTransactionInfo_API
    {
        /// <summary>
        ///自動序號
        /// </summary>
        [Key]
        public long Seq { get; set; } //(bigint, not null)
        /// <summary>
        ///對應序號
        /// </summary>
        public string TransactionInfoId { get; set; } //((nvarchar(50)), not null)
        /// <summary>
        ///交易所代碼,bitpro/.....///<summary>///交易所種類///</summary>publicenumExchangeTypeEnum{[Remark("unknown")]unknown=0,[Remark("ACE")]ACE=1,[Remark("MaiCoin")]MaiCoin=2,[Remark("BitoPro")]BitoPro=3,[Remark("BITGIN")]BITGIN=4}
        /// </summary>
        public int ExchangeTypeCode { get; set; } //(int, not null)
        /// <summary>
        ///調閱單號
        /// </summary>
        public string OrderNumber { get; set; } //((nvarchar(50)), not null)
        /// <summary>
        ///是否資料已同步至內網
        /// </summary>
        public bool IsDataSync { get; set; } //(bit, not null)
        /// <summary>
        ///資料建立時間
        /// </summary>
        public DateTime CreateTime { get; set; } //(datetime, not null)
    }
}
