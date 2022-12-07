using Autofac;
using Autofac.Integration.WebApi;
using AutoMapper;
using PaymentFlowAnalysis.Core.DbConnectionFactory;
using PaymentFlowAnalysis.Core.Repositories;
using PaymentFlowAnalysis.Core.Repositories.Interfaces;
using PaymentFlowAnalysis.Core.UnitOfWork;
using PaymentFlowAnalysis.Service.AutoMappings;
using PaymentFlowAnalysis.Service.Services;
using PaymentFlowAnalysis.Service.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;

namespace PaymentFlowAnalysis.Web.App_Start
{
    public class AutofacConfig
    {
        public static void Bootstrapper()
        {
            var builder = new ContainerBuilder();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly‌​());

            builder.RegisterType<DbConnectionFactory>()
                .As<IDbConnectionFactory>()
                .InstancePerLifetimeScope();

            //var mapper = MappingConfiguration.CreateMapper();
            //builder.RegisterInstance(mapper).As<IMapper>();
            builder.Register(c => MappingConfiguration.CreateMapper(c.Resolve<IUnitOfWork>()))
               .As<IMapper>()
               .InstancePerLifetimeScope();
            //builder.RegisterType<UserListService>().As<IUserListService>();
            var assemblies = AppDomain.CurrentDomain.GetAssemblies();
            builder.RegisterAssemblyTypes(assemblies)
                .Where(t => t.Name.EndsWith("Service"))
                .AsImplementedInterfaces();

            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerLifetimeScope();
            builder.RegisterType<DMZUnitOfWork>().As<IDMZUnitOfWork>().InstancePerLifetimeScope();

            IContainer container = builder.Build();
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}