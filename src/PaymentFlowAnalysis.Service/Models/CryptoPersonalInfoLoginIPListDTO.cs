using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Service.Models
{
    public class CryptoPersonalInfoLoginIPListDTO
    {
        public long Seq { get; set; } //(bigint, not null)
        /// <summary>
        ///對應ID
        /// </summary>
        public string PersonalInfoId { get; set; } //((nvarchar(50)), not null)
        /// <summary>
        ///調閱單號
        /// </summary>
        public string OrderNumber { get; set; } //((nvarchar(50)), not null)
        /// <summary>
        ///登入來源IP
        /// </summary>
        public string IP { get; set; } //((nvarchar(50)), not null)
        /// <summary>
        ///登入時間(原始)
        /// </summary>
        public int LoginTime { get; set; } //(int, null)
        /// <summary>
        ///登入時間(轉換過)
        /// </summary>
        public string LoginTime_Cov { get; set; } //(datetime, null)
        /// <summary>
        ///登入類別,Web/APP
        /// </summary>
        public string LoginType { get; set; } //((nvarchar(10)), null)
        /// <summary>
        ///國家英文縮寫
        /// </summary>
        public string Country { get; set; } //((nvarchar(20)), null)
        /// <summary>
        ///是否資料已同步至內網
        /// </summary>
        public bool IsDataSync { get; set; } //(bit, not null)
        /// <summary>
        ///資料建立時間
        /// </summary>
        public string CreateTime { get; set; } //(datetime, not null)
        /// <summary>
        ///登入類別(轉換過),Web/APP///<summary>///登入類別,Web/APP///</summary>publicenumLoginTypeEnum{[Remark("未知")]unknown=0,[Remark("Web")]Web=1,[Remark("APP")]APP=2}
        /// </summary>
        public int LoginType_Cov { get; set; } //(int, null)
    }
}
