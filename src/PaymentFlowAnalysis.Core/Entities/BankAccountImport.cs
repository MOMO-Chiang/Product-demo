using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("BankAccount_Import")]
    public class BankAccountImport
    {
        /// <summary>
        ///自動序號
        /// </summary>
        [Key]
        public long Seq { get; set; }
        /// <summary>
        ///唯一序號(GUID)
        /// </summary>
        public Guid BankAccountImportSeq { get; set; }
        /// <summary>
        ///案號
        /// </summary>
        public string CaseNo { get; set; }
        /// <summary>
        ///案名
        /// </summary>
        public string CaseName { get; set; }
        /// <summary>
        ///人事五碼
        /// </summary>
        public string PersonalId { get; set; }
        /// <summary>
        ///調閱銀行代碼
        /// </summary>
        public string BankCode { get; set; }
        /// <summary>
        ///匯入原始檔案名稱
        /// </summary>
        public string OriginCsvFileName { get; set; }
        /// <summary>
        ///匯入後新檔案名稱,{GUID}.csv
        /// </summary>
        public string NewCsvFileName { get; set; }
        /// <summary>
        ///csv檔案儲存子路徑
        /// </summary>
        public string SubCsvFilePath { get; set; }
        /// <summary>
        ///資料建立時間
        /// </summary>
        public DateTime CreateTime { get; set; }
        /// <summary>
        ///檔案的MD5,用來偵測是否重複匯入檔案
        /// </summary>
        public string FileMD5 { get; set; }


    }
}
