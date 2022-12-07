using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("CryptoPersonalInfoPictures_API")]
    public class CryptoPersonalInfoPictures_API
    {
        /// <summary>
        ///對應ID
        /// </summary>
        public string PersonalInfoId { get; set; } //((nvarchar(50)), not null)
        /// <summary>
        ///調閱單號
        /// </summary>
        public string OrderNumber { get; set; } //((nvarchar(50)), not null)
        /// <summary>
        ///照片
        /// </summary>
        public string Base64Image { get; set; } //((nvarchar(MAX)), not null)
        /// <summary>
        ///是否資料已同步至內網
        /// </summary>
        public bool IsDataSync { get; set; } //(bit, not null)
        /// <summary>
        ///資料建立時間
        /// </summary>
        public DateTime CreateTime { get; set; } //(datetime, not null)
        /// <summary>
        ///自動序號
        /// </summary>
        [Key]
        public long Seq { get; set; } //(bigint, not null)
        /// <summary>
        ///檔案存檔路徑
        /// </summary>
        public string SubPath { get; set; } //((nvarchar(MAX)), null)
        /// <summary>
        ///檔案名稱
        /// </summary>
        public string FileName { get; set; } //((nvarchar(MAX)), null)
    }
}
