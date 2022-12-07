using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Core.Entities
{
    [Table("for_person_web")]
    public class ForPersonWeb
    {
        [ExplicitKey]
        public string Code { get; set; }

        public string Name { get; set; }

        public string Unit { get; set; }

        public string Unitn { get; set; }

        public string Tit { get; set; }

        public string Titn { get; set; }
    }
}
