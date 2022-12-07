using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("CryptoPersonalInfoPictures_API")]
    public class CryptoPersonalInfoPicture
    {
        [ExplicitKey]
        /// <summary>
        ///自動序號
        /// </summary>
        public string Seq { get; set; }
        /// <summary>
        ///對應CryptoPersonalInfo Uid
        /// </summary>
        public string PersonalInfoId { get; set; }
        /// <summary>
        ///調閱單號
        /// </summary>
        public string OrderNumber { get; set; }
        /// <summary>
        /// Base64碼
        /// </summary>
        public string Base64Image { get; set; }
        /// <summary>
        /// 檔案存檔路徑
        /// </summary>
        public string SubPath { get; set; }
        /// <summary>
        /// 檔案名稱
        /// </summary>
        public string FileName { get; set; }
        /// <summary>
        ///資料建立時間
        /// </summary>
        public DateTime CreateTime { get; set; }
        
    }
}
