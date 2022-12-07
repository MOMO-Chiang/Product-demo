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
    public interface ICryptoPersonalInfoWalletService
    {
        /// <summary>
        /// 取得OrderDetailNumber全部列表(OrderMasterNumber)
        /// </summary>
        /// <returns></returns>
        IEnumerable<CryptoPersonalInfoWallet_API> GetAll();

        /// <summary>
        /// 取得分頁列表
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        IEnumerable<CryptoPersonalInfoWallet_API> GetPaginatedResult(CryptoPersonalInfoWalletSearchModel entity, PaginationWithSortedQueryModel paginated);

        /// <summary>
        /// 取得錢包列表
        /// </summary>
        /// <param name="Uid"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        PaginatedResult<CryptoPersonalInfoWallet_API> GetWallerAddressResult(string PersonalInfoId, PaginationWithSortedQueryModel paginated);
    }
}
