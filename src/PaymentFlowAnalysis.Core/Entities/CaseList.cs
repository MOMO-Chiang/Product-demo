using Dapper.Contrib.Extensions;
using System;

namespace PaymentFlowAnalysis.Core.Entities
{
    public class CaseList
    {
        [Key]
        public string HandManID { get; set; }

        public string FileNo { get; set; }

        public string SystemName { get; set; }

        public string FileName { get; set; }

        public string HandMan { get; set; }

        public string unitcode { get; set; }

        public string unitname { get; set; }

        public string OutHandMan { get; set; }

        public string OutHandManID { get; set; }

        public string outunit { get; set; }

        public string OutUnitN { get; set; }

        public string Cexeresult { get; set; }

        public DateTime createtime { get; set; }

        public string RequesterID { get; set; }

        public string RequesterName { get; set; }

    }
}
