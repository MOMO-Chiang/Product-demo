using PaymentFlowAnalysis.Core.DbConnectionFactory;
using PaymentFlowAnalysis.Core.Repositories;
using PaymentFlowAnalysis.Core.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.UnitOfWork
{
    public class DMZUnitOfWork : UnitOfWorkBase, IDMZUnitOfWork
    {
        private const string connectionName = "MJIBDMZ";
        private IDbConnectionFactory _dbConnectionFactory;

        private IBlackAccountRepository _IblackAccountRepository;
        private IBlackAccountEmailRepository _IblackAccountEmailRepository;
        private IBlackAccountIPRepository _IblackAccountIPRepository;
        private IBlackAccountPhoneRepository _IblackAccountPhoneRepository;

        public DMZUnitOfWork(IDbConnectionFactory dbConnectionFactory)
            : base(dbConnectionFactory, connectionName)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }

        public IBlackAccountRepository BlackAccountRepository =>
            _IblackAccountRepository ?? (_IblackAccountRepository = new BlackAccountRepository(_dbConnectionFactory, connectionName));
        public IBlackAccountEmailRepository BlackAccountEmailRepository =>
            _IblackAccountEmailRepository ?? (_IblackAccountEmailRepository = new BlackAccountEmailRepository(_dbConnectionFactory, connectionName));
        public IBlackAccountIPRepository BlackAccountIPRepository =>
            _IblackAccountIPRepository ?? (_IblackAccountIPRepository = new BlackAccountIPRepository(_dbConnectionFactory, connectionName));
        public IBlackAccountPhoneRepository BlackAccountPhoneRepository =>
            _IblackAccountPhoneRepository ?? (_IblackAccountPhoneRepository = new BlackAccountPhoneRepository(_dbConnectionFactory, connectionName));

        protected override void ResetRepositories()
        {
            _IblackAccountRepository = null;
            _IblackAccountEmailRepository = null;
            _IblackAccountIPRepository = null;
            _IblackAccountPhoneRepository = null;
        }
    }
}
