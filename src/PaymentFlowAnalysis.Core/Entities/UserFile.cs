using Dapper.Contrib.Extensions;
using System;

namespace PaymentFlowAnalysis.Core.Entities
{
    public class UserFile
    {
        [Key]
        public string HandManID { get; set; }

        public string FileNo { get; set; }

        public string SystemName { get; set; }

        public string FileName { get; set; }

        public string HandMan { get; set; }

        public string Unitcode { get; set; }

        public string Unitname { get; set; }

        public string OutHandMan { get; set; }

        public string OutHandManID { get; set; }

        public string Outunit { get; set; }

        public string OutUnitN { get; set; }

        public string Cexeresult { get; set; }

        public DateTime Createtime { get; set; }

        public string RequesterID { get; set; }

        public string RequesterName { get; set; }

    }
}
