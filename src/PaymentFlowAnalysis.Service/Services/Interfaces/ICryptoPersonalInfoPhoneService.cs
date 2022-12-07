using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Service.Services.Interfaces
{
    public interface ICryptoPersonalInfoPhoneService
    {
        /// <summary>
        /// 取得OrderDetailNumber全部列表(OrderMasterNumber)
        /// </summary>
        /// <returns></returns>
        IEnumerable<CryptoPersonalInfoPhone_API> GetAll();

        /// <summary>
        /// 取得分頁列表
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        IEnumerable<CryptoPersonalInfoPhone_API> GetPaginatedResult(CryptoPersonalInfoPhoneSearchModel entity);

        /// <summary>
        /// 取得電話列表
        /// </summary>
        /// <param name="Uid"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        PaginatedResult<CryptoPersonalInfoPhoneDTO> GetPhoneResult(string PersonalInfoId, PaginationWithSortedQueryModel paginated);
    }
}
