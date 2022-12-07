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
    public class BigTradeService : IBigTradeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BigTradeService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public MemoryStream ExportFile(BigTradeSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            IEnumerable<BigTrade> result = _unitOfWork.BigTradeRepository.Search(entity, paginated);
            var resultDTO = _mapper.Map<List<BigTrade>, List<BigTradeDTO>>(result.ToList());
            IWorkbook workbook = new XSSFWorkbook();

            ISheet sheet = workbook.CreateSheet("sheet1");
            List<string> columns = new List<string>()
            {
                "大額序號","客戶帳號","客戶名稱","開戶日期","客戶統編","交易人姓名","交易人統編","交易人電話","交易時間",
                "交易金額","交易行","交易種類","受款人","受款帳號","備註","申報時間","客戶電話","客戶地址"
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
                dataRow.CreateCell(0).SetCellValue(r.BigTradeId);
                dataRow.CreateCell(1).SetCellValue(r.CustomerAccountId);
                dataRow.CreateCell(2).SetCellValue(r.CustomerName);
                dataRow.CreateCell(3).SetCellValue(r.OpenAccountDate);
                dataRow.CreateCell(4).SetCellValue(r.CustomerId);
                dataRow.CreateCell(5).SetCellValue(r.RemitterName);
                dataRow.CreateCell(6).SetCellValue(r.RemitterId);
                dataRow.CreateCell(7).SetCellValue(r.RemitterPhone);
                dataRow.CreateCell(8).SetCellValue(r.RemitTime);
                dataRow.CreateCell(9).SetCellValue(r.RemitAmount);
                dataRow.CreateCell(10).SetCellValue(r.RemitBank);
                dataRow.CreateCell(11).SetCellValue(r.RemitType);
                dataRow.CreateCell(12).SetCellValue(r.Beneficiary);
                dataRow.CreateCell(13).SetCellValue(r.BeneficiaryAccountId);
                dataRow.CreateCell(14).SetCellValue(r.Memo);
                dataRow.CreateCell(15).SetCellValue(r.DeclarationTime);
                dataRow.CreateCell(16).SetCellValue(r.CustomerPhone);
                dataRow.CreateCell(17).SetCellValue(r.CustomerAddress);

                rowIndex++;
            }

            for (int j = 0; j < 17; j++)
            {
                sheet.AutoSizeColumn(j);
            }

            var stream = new MemoryStream();
            // processing the stream.
            workbook.Write(stream);

            return stream;
        }

        public IEnumerable<BigTrade> GetAll()
        {
            return _unitOfWork.BigTradeRepository.GetAll();
        }

        public PaginatedResult<BigTradeDTO> GetPaginatedResult(BigTradeSearchModel queryModel, PaginationWithSortedQueryModel paginated)
        {
            Tuple<IEnumerable<BigTrade>, int> tuple = _unitOfWork.BigTradeRepository.SearchPaginated(queryModel, paginated);
            IEnumerable<BigTrade> userLists = tuple.Item1;
            var totalCount = tuple.Item2;

            PaginatedResult<BigTradeDTO> pageResult = new PaginatedResult<BigTradeDTO>
            {
                PaginatedInfo = new PaginatedInfo
                {
                    Page = paginated.Page,
                    PageSize = paginated.PageSize,
                    TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                    PageCount = userLists.Count(),
                    TotalCount = totalCount
                },
                Data = _mapper.Map<List<BigTrade>, List<BigTradeDTO>>(userLists.ToList()),
            };
            return pageResult;
        }

        public void Insert(BigTrade BigTrade)
        {
            _unitOfWork.BigTradeRepository.Insert(BigTrade, _unitOfWork);
        }

        public void InsertImport(BigTradeImport bigTradeImport)
        {
            _unitOfWork.BigTradeImportRepository.Insert(bigTradeImport, _unitOfWork);
        }
    }
}
