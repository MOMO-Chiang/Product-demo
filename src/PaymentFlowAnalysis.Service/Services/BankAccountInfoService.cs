using AutoMapper;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using PaymentFlowAnalysis.Common.Constants;
using PaymentFlowAnalysis.Common.Utilities;
using PaymentFlowAnalysis.Core.DbConnectionFactory;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Core.Repositories.Interfaces;
using PaymentFlowAnalysis.Core.UnitOfWork;
using PaymentFlowAnalysis.Service.Models;
using PaymentFlowAnalysis.Service.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace PaymentFlowAnalysis.Service.Services
{
    public class BankAccountInfoService : IBankAccountInfoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public BankAccountInfoService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public MemoryStream ExportFile(BankAccountInfoSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            IEnumerable<BankAccountInfo> result = _unitOfWork.BankAccountInfoRepository.Search(entity, paginated);
            var resultDTO = _mapper.Map<List<BankAccountInfo>, List<BankAccountInfoDTO>>(result.ToList());
            IWorkbook workbook = new XSSFWorkbook();

            ISheet sheet = workbook.CreateSheet("sheet1");
            List<string> columns = new List<string>()
            {
                "銀行帳號","身分證字號","開戶行總分支機構代碼","存款種類","幣別","戶名","住家電話",
                "行動電話","戶籍地址","通訊地址","資料提供日","開戶日","結清日","資料提供日結餘","備註"
            };
            IRow headerRow = sheet.CreateRow(0);
            for (var i = 0; i < columns.Count; i++)
            {
                headerRow.CreateCell(i).SetCellValue(columns[i]);
            }

            int rowIndex = 1;
            foreach (var r in resultDTO)
            {
                IRow dataRow = sheet.CreateRow(rowIndex);
                dataRow.CreateCell(0).SetCellValue(r.AccountId);
                dataRow.CreateCell(1).SetCellValue(r.IdCardNumber);
                dataRow.CreateCell(2).SetCellValue(r.BankBranchCode);
                dataRow.CreateCell(3).SetCellValue(r.AccountType);
                dataRow.CreateCell(4).SetCellValue(r.CurrencyType);
                dataRow.CreateCell(5).SetCellValue(r.AccountName);
                dataRow.CreateCell(6).SetCellValue(r.LocalPhone);
                dataRow.CreateCell(7).SetCellValue(r.MobilePhone);
                dataRow.CreateCell(8).SetCellValue(r.ResidenceAddress);
                dataRow.CreateCell(9).SetCellValue(r.MailingAddresses);
                dataRow.CreateCell(10).SetCellValue(r.DataProvidedDate_Cov);
                dataRow.CreateCell(11).SetCellValue(r.AccountOpeningDate_Cov);
                dataRow.CreateCell(12).SetCellValue(r.AccountClosingDate_Cov);
                dataRow.CreateCell(13).SetCellValue(r.AccountBalance);
                dataRow.CreateCell(14).SetCellValue(r.Remark);

                rowIndex++;
            }

            for (int j = 0; j < 13; j++)
            {
                sheet.AutoSizeColumn(j);
            }

            var stream = new MemoryStream();
            // processing the stream.
            workbook.Write(stream);

            return stream;
            //throw new NotImplementedException();
        }

        public IEnumerable<BankAccountInfo> GetAll()
        {
            return _unitOfWork.BankAccountInfoRepository.GetAll();
        }

        public PaginatedResult<BankAccountInfoDTO> GetPaginatedResult(BankAccountInfoSearchModel queryModel, PaginationWithSortedQueryModel paginated)
        {
            Tuple<IEnumerable<BankAccountInfo>, int> tuple = _unitOfWork.BankAccountInfoRepository.SearchPaginated(queryModel, paginated);
            IEnumerable<BankAccountInfo> userLists = tuple.Item1;
            var totalCount = tuple.Item2;

            PaginatedResult<BankAccountInfoDTO> pageResult = new PaginatedResult<BankAccountInfoDTO>
            {
                PaginatedInfo = new PaginatedInfo
                {
                    Page = paginated.Page,
                    PageSize = paginated.PageSize,
                    TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                    PageCount = userLists.Count(),
                    TotalCount = totalCount
                },
                Data = _mapper.Map<List<BankAccountInfo>, List<BankAccountInfoDTO>>(userLists.ToList()),
            };
            return pageResult;
        }

        public void Insert(BankAccountInfo bankAccountInfo)
        {
            _unitOfWork.BankAccountInfoRepository.Insert(bankAccountInfo, _unitOfWork);
        }

        public void InsertImport(BankAccountImport bankAccountImport)
        {
            _unitOfWork.BankAccountImportRepository.Insert(bankAccountImport, _unitOfWork);
        }
    }
}
