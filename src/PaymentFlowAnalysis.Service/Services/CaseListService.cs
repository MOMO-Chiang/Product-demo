using PaymentFlowAnalysis.Common.Enums;
using PaymentFlowAnalysis.Core.DbConnectionFactory;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Core.Repositories;
using PaymentFlowAnalysis.Core.Repositories.Interfaces;
using PaymentFlowAnalysis.Service.Factories;
using PaymentFlowAnalysis.Service.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Service.Services
{
    public class CaseListService : ICaseListService
    {
        private readonly IDbConnectionFactory _dbConnectionFactory;
        public CaseListService(IDbConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }

        public IEnumerable<CaseList> GetAll()
        {
            IEnumerable<CaseList> caseLists = new List<CaseList>();
            
            DepartmentFactory departmentFactory = new DepartmentFactory();
            foreach (Department department in Enum.GetValues(typeof(Department)).Cast<Department>())
            {
                DepartmentDBInfo departmentInfo = departmentFactory.GetDepartmentInfo(department);
                ICaseListRepository repo = new CaseListRepository(_dbConnectionFactory, departmentInfo);
                caseLists = caseLists.Concat(repo.GetAll());
            }

            return caseLists;
        }

        public IEnumerable<CaseList> GetByDepartments(List<Department> departments)
        {
            IEnumerable<CaseList> caseLists = new List<CaseList>();

            DepartmentFactory departmentFactory = new DepartmentFactory();
            foreach (Department department in departments)
            {
                // 逐一撈取
                DepartmentDBInfo departmentInfo = departmentFactory.GetDepartmentInfo(department);
                ICaseListRepository repo = new CaseListRepository(_dbConnectionFactory, departmentInfo);
                caseLists = caseLists.Concat(repo.GetAll());
            }

            return caseLists;
        }

        public IEnumerable<CaseList> GetByHandManId(string handManId)
        {
            IEnumerable<CaseList> caseLists = new List<CaseList>();

            DepartmentFactory departmentFactory = new DepartmentFactory();
            foreach (Department department in Enum.GetValues(typeof(Department)).Cast<Department>())
            {
                // 逐一撈取
                DepartmentDBInfo departmentInfo = departmentFactory.GetDepartmentInfo(department);
                ICaseListRepository repo = new CaseListRepository(_dbConnectionFactory, departmentInfo);
                caseLists = caseLists.Concat(repo.GetByHandleMan(handManId));
            }

            return caseLists;
        }
    }
}
