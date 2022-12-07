using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface IPersonalInfoSearchRepository : IRepositoryBase<PersonalInfoSearch>
    {
        int InsertMaster(PersonalInfoSearch entity);
    }
    public interface IPersonalInfoDetailRepository : IRepositoryBase<PersonalInfoDetail>
    {
        int InsertDetail(PersonalInfoDetail entity);

        int UpdateDetailByOrderNumber(string orderNumber, int status, string message);
    }
}
