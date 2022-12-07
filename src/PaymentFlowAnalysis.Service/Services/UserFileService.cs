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
    public class UserFileService : IUserFileService
    {
        private readonly IDbConnectionFactory _dbConnectionFactory;
        public UserFileService(IDbConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }

        public IEnumerable<UserFile> GetAll()
        {
            IEnumerable<UserFile> userFiles = new List<UserFile>();
            
            DepartmentFactory departmentFactory = new DepartmentFactory();
            foreach (Department department in Enum.GetValues(typeof(Department)).Cast<Department>())
            {
                DepartmentDBInfo departmentInfo = departmentFactory.GetDepartmentInfo(department);
                IUserFileRepository repo = new UserFileRepository(_dbConnectionFactory, departmentInfo);
                userFiles = userFiles.Concat(repo.GetAll());
            }

            return userFiles;
        }

        public IEnumerable<UserFile> GetByDepartments(List<Department> departments)
        {
            IEnumerable<UserFile> userFiles = new List<UserFile>();

            DepartmentFactory departmentFactory = new DepartmentFactory();
            foreach (Department department in departments)
            {
                // 逐一撈取
                DepartmentDBInfo departmentInfo = departmentFactory.GetDepartmentInfo(department);
                IUserFileRepository repo = new UserFileRepository(_dbConnectionFactory, departmentInfo);
                userFiles = userFiles.Concat(repo.GetAll());
            }

            return userFiles;
        }

        public IEnumerable<UserFile> GetByHandManId(string handManId)
        {
            IEnumerable<UserFile> userFiles = new List<UserFile>();

            DepartmentFactory departmentFactory = new DepartmentFactory();
            foreach (Department department in Enum.GetValues(typeof(Department)).Cast<Department>())
            {
                // 逐一撈取
                DepartmentDBInfo departmentInfo = departmentFactory.GetDepartmentInfo(department);
                IUserFileRepository repo = new UserFileRepository(_dbConnectionFactory, departmentInfo);
                userFiles = userFiles.Concat(repo.GetByHandleMan(handManId));
            }

            return userFiles;
        }

        public IEnumerable<UserFile> GetByFileNo(string GetByFileNo)
        {
            IEnumerable<UserFile> userFiles = new List<UserFile>();

            DepartmentFactory departmentFactory = new DepartmentFactory();
            foreach (Department department in Enum.GetValues(typeof(Department)).Cast<Department>())
            {
                // 逐一撈取
                DepartmentDBInfo departmentInfo = departmentFactory.GetDepartmentInfo(department);
                IUserFileRepository repo = new UserFileRepository(_dbConnectionFactory, departmentInfo);
                userFiles = userFiles.Concat(repo.GetByFileNo(GetByFileNo));
            }

            return userFiles;
        }
    }
}
