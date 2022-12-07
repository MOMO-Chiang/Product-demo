using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Core.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Repositories.Interfaces
{
    public interface IRepositoryBase<TModel> where TModel : class, new()
    {
        TModel Get(dynamic id);
        
        IEnumerable<TModel> GetAll();

        int Insert(TModel obj, IUnitOfWorkBase uow = null);

        int Insert(IEnumerable<TModel> list, IUnitOfWorkBase uow = null);

        bool Update(TModel obj, IUnitOfWorkBase uow = null);

        bool Update(IEnumerable<TModel> list, IUnitOfWorkBase uow = null);

        bool Delete(TModel obj, IUnitOfWorkBase uow = null);

        bool Delete(IEnumerable<TModel> list, IUnitOfWorkBase uow = null);

        bool DeleteAll(IUnitOfWorkBase uow = null);

        void Dispose();

    }
}
