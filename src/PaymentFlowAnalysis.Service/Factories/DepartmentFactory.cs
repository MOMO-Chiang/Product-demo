using PaymentFlowAnalysis.Common.Enums;
using PaymentFlowAnalysis.Core.Models;

namespace PaymentFlowAnalysis.Service.Factories
{
    public class DepartmentFactory
    {
        /// <summary>
        /// 取得連線字串Name 以及 資料表名稱
        /// </summary>
        /// <param name="department"></param>
        /// <returns></returns>
        public DepartmentDBInfo GetDepartmentInfo(Department department)
        {
            DepartmentDBInfo departmentInfo = new DepartmentDBInfo();
            switch (department)
            {
                case Department.TEMPFILE:
                    departmentInfo.ConnectionName = "TEMPFILE";
                    departmentInfo.TableName = "TEMP_FILE";
                    break;
                case Department.DRUG:
                    departmentInfo.ConnectionName = "Control34";
                    departmentInfo.TableName = "View34_2";
                    break;
                case Department.INCORRUPT:
                    departmentInfo.ConnectionName = "Control31";
                    departmentInfo.TableName = "View31_2";
                    break;
                case Department.ECONOMIC:
                    departmentInfo.ConnectionName = "Control25";
                    departmentInfo.TableName = "View25_2";
                    break;
                case Department.COMPUTER_CRIMINAL:
                    departmentInfo.ConnectionName = "Control14";
                    departmentInfo.TableName = "View14_2";
                    break;
                //case Department.GUOWEI:
                //    departmentInfo.ConnectionName = "Control20";
                //    departmentInfo.TableName = "View20_2";
                //    break;
            }

            return departmentInfo;
        }
    }
}
