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
    public class BankSafeDepositBoxService : IBankSafeDepositBoxService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public BankSafeDepositBoxService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public MemoryStream ExportFile(BankSafeDepositBoxSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            IEnumerable<BankSafeDepositBox> result = _unitOfWork.BankSafeDepositBoxRepository.Search(entity, paginated);
            var resultDTO = _mapper.Map<List<BankSafeDepositBox>, List<BankSafeDepositBoxDTO>>(result.ToList());
            IWorkbook workbook = new XSSFWorkbook();

            ISheet sheet = workbook.CreateSheet("sheet1");
            List<string> columns = new List<string>()
            {
                "身分證字號","出租行總分支機構代碼","承租種類","承租人","市內電話","行動電話"
                ,"戶籍地址","通訊地址","箱號或室號","資料提供日","承租日","退租日","備註"
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
                dataRow.CreateCell(0).SetCellValue(r.IdCardNumber);
                dataRow.CreateCell(1).SetCellValue(r.BankBranchCode);
                dataRow.CreateCell(2).SetCellValue(r.BoxRentType);
                dataRow.CreateCell(3).SetCellValue(r.Renter);
                dataRow.CreateCell(4).SetCellValue(r.LocalPhone);
                dataRow.CreateCell(5).SetCellValue(r.MobilePhone);
                dataRow.CreateCell(6).SetCellValue(r.ResidenceAddress);
                dataRow.CreateCell(7).SetCellValue(r.MailingAddress);
                dataRow.CreateCell(8).SetCellValue(r.BoxNumber);
                dataRow.CreateCell(9).SetCellValue(r.DataProvidedTime_Cov);
                dataRow.CreateCell(10).SetCellValue(r.RentDate_Cov);
                dataRow.CreateCell(11).SetCellValue(r.LeaseCancellationDate_Cov);
                dataRow.CreateCell(12).SetCellValue(r.Remark);

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
        }

        public IEnumerable<BankSafeDepositBox> GetAll()
        {
            return _unitOfWork.BankSafeDepositBoxRepository.GetAll();
        }

        public PaginatedResult<BankSafeDepositBoxDTO> GetPaginatedResult(BankSafeDepositBoxSearchModel queryModel, PaginationWithSortedQueryModel paginated)
        {
            Tuple<IEnumerable<BankSafeDepositBox>, int> tuple = _unitOfWork.BankSafeDepositBoxRepository.SearchPaginated(queryModel, paginated);
            IEnumerable<BankSafeDepositBox> userLists = tuple.Item1;
            var totalCount = tuple.Item2;

            PaginatedResult<BankSafeDepositBoxDTO> pageResult = new PaginatedResult<BankSafeDepositBoxDTO>
            {
                PaginatedInfo = new PaginatedInfo
                {
                    Page = paginated.Page,
                    PageSize = paginated.PageSize,
                    TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                    PageCount = userLists.Count(),
                    TotalCount = totalCount
                },
                Data = _mapper.Map<List<BankSafeDepositBox>, List<BankSafeDepositBoxDTO>>(userLists.ToList()),
            };
            return pageResult;
        }

        public void Insert(BankSafeDepositBox BankSafeDepositBox)
        {
            _unitOfWork.BankSafeDepositBoxRepository.Insert(BankSafeDepositBox, _unitOfWork);
        }

        public void InsertImport(BankSafeDepositBoxImport bankSafeDepositBoxImport)
        {
            _unitOfWork.BankSafeDepositBoxImportRepository.Insert(bankSafeDepositBoxImport, _unitOfWork);
        }
    }
}
