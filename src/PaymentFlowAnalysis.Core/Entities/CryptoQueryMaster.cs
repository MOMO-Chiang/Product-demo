using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("CryptoQueryMaster")]
    public class CryptoQueryMaster
    {
        /// <summary>
        /// 自動序號
        /// </summary>
        [ExplicitKey]
        public string Seq { get; set; }

        /// <summary>
        /// 案號
        /// </summary>
        public string CaseNo { get; set; }

        /// <summary>
        /// 案名
        /// </summary>
        public string CaseName { get; set; }

        /// <summary>
        /// 主調閱單號
        /// </summary>
        public string OrderMasterNumber { get; set; }

        /// <summary>
        /// 調閱筆數
        /// </summary>
        public int OrderDetailCount { get; set; }

        /// <summary>
        /// 交易所 ACE=1,MaiCion=2,BitoPro=3,Bitcin=4
        /// </summary>
        public int RequestAgency { get; set; }

        /// <summary>
        /// 查詢條件
        /// </summary>
        public int QueryConditionType { get; set; }

        /// <summary>
        /// 調閱時間
        /// </summary>
        public DateTime QueryOrderTime { get; set; }

        /// <summary>
        /// 調閱人人事五碼
        /// </summary>
        public string QueryUserId { get; set; }

        /// <summary>
        /// 調閱人姓名
        /// </summary>
        public string QueryName { get; set; }

        /// <summary>
        /// 調閱人電話
        /// </summary>
        public string QueryPhone { get; set; }

        /// <summary>
        /// 調閱人信箱
        /// </summary>
        public string QueryEmail { get; set; }

        /// <summary>
        /// 調閱人職稱
        /// </summary>
        public string QueryRank { get; set; }

        /// <summary>
        /// 調閱人任職單位(洗錢防制處)
        /// </summary>
        public string QueryUnit { get; set; }

        /// <summary>
        /// 刑事案類(刑事調查)
        /// </summary>
        public string ProjectCategory { get; set; }

        /// <summary>
        /// 調閱來源種類
        /// </summary>
        public int SearchType { get; set; }

        /// <summary>
        /// 協助代拋查之人事五碼
        /// </summary>
        public string ActionUserId { get; set; }

        /// <summary>
        /// 回應狀態數量(成功) type=2
        /// </summary>
        public int QueryStatusCount { get; set; }

        /// <summary>
        /// 明細資料
        /// </summary>
        public string DetailData { get; set; }
    }

    [Table("CryptoQueryMaster")]
    public class PersonalInfoSearch
    {
        /// <summary>
        /// 案號
        /// </summary>
        public string CaseNo { get; set; }

        /// <summary>
        /// 案名
        /// </summary>
        public string CaseName { get; set; }

        /// <summary>
        /// 主調閱單號
        /// </summary>
        public string OrderMasterNumber { get; set; }

        /// <summary>
        /// 調閱筆數
        /// </summary>
        public int OrderDetailCount { get; set; }

        /// <summary>
        /// 交易所 ACE=1,MaiCion=2,BitoPro=3,Bitcin=4
        /// </summary>
        public int RequestAgency { get; set; }

        /// <summary>
        /// 查詢條件
        /// </summary>
        public int QueryConditionType { get; set; }
        
        /// <summary>
        /// 調閱人人事五碼
        /// </summary>
        public string QueryUserId { get; set; }

        /// <summary>
        /// 調閱人姓名
        /// </summary>
        public string QueryName { get; set; }

        /// <summary>
        /// 調閱人電話
        /// </summary>
        public string QueryPhone { get; set; }

        /// <summary>
        /// 調閱人信箱
        /// </summary>
        public string QueryEmail { get; set; }

        /// <summary>
        /// 調閱人職稱
        /// </summary>
        public string QueryRank { get; set; }

        /// <summary>
        /// 調閱人任職單位(洗錢防制處)
        /// </summary>
        public string QueryUnit { get; set; }

        /// <summary>
        /// 刑事案類(刑事調查)
        /// </summary>
        public string ProjectCategory { get; set; }

        /// <summary>
        /// 調閱來源種類
        /// </summary>
        public int SearchType { get; set; }

        /// <summary>
        /// 協助代拋查之人事五碼
        /// </summary>
        public string ActionUserId { get; set; }
        
    }
}
