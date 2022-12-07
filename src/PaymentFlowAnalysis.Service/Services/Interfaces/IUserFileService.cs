using PaymentFlowAnalysis.Common.Enums;
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
    public interface IUserFileService
    {
        /// <summary>
        /// 撈取全部部門的案件
        /// </summary>
        /// <returns></returns>
        IEnumerable<UserFile> GetAll();

        /// <summary>
        /// 撈取指定部門案號
        /// </summary>
        /// <param name="departments"></param>
        /// <returns></returns>
        IEnumerable<UserFile> GetByDepartments(List<Department> departments);

        /// <summary>
        /// 撈取指定人員案號
        /// </summary>
        /// <param name="handManId"></param>
        /// <returns></returns>
        IEnumerable<UserFile> GetByHandManId(string handManId);

        /// <summary>
        /// 撈取指定案號
        /// </summary>
        /// <param name="handManId"></param>
        /// <returns></returns>
        IEnumerable<UserFile> GetByFileNo(string fileNo);


    }
}
