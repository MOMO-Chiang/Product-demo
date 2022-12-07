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
    public interface ICryptoPersonalInfoPictureService
    {
        /// <summary>
        /// 取得照片列表
        /// </summary>
        /// <param name="Uid"></param>
        /// <param name="paginated"></param>
        /// <returns></returns>
        PaginatedResult<CryptoPersonalInfoPicture> GetPictureResult(string Uid, PaginationWithSortedQueryModel paginated);
    }
}
