using System;
using PaymentFlowAnalysis.Common;

namespace PaymentFlowAnalysis.Core.Models
{
    /// <summary>
    /// 搜尋分頁資料的參數
    /// </summary>
    public class PaginatedQueryModel
    {
        /// <summary>
        /// 頁碼
        /// </summary>
        public int Page { get; set; } = 1;

        /// <summary>
        /// 分頁大小
        /// </summary>
        public int PageSize { get; set; } = 10;

        /// <summary>
        /// 是否撈取全部
        /// </summary>
        public bool IsAll { get; set; } = false;
    }

    public class PaginationWithSortedQueryModel : PaginatedQueryModel
    {
        /// <summary>
        /// 排序類別
        /// </summary>
        public int SortedType { get; set; } = (int)Common.Enums.SortedType.DESC;

        /// <summary>
        /// 排序欄位
        /// </summary>
        public string SortedColumn { get; set; } = String.Empty;
    }
}
