using AutoMapper;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using PaymentFlowAnalysis.Common.Constants;
using PaymentFlowAnalysis.Common.Helpers;
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
    public class BankTransactionService : IBankTransactionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public BankTransactionService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public MemoryStream ExportFile(BankTransactionSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            //var md5 = _unitOfWork.BankTransactionImportRepository.GetAll();
            IEnumerable<BankTransaction> result = _unitOfWork.BankTransactionRepository.Search(entity, paginated);
            var resultDTO = _mapper.Map<List<BankTransaction>, List<BankTransactionDTO>>(result.ToList());
            IWorkbook workbook = new XSSFWorkbook();

            ISheet sheet = workbook.CreateSheet("sheet1");
            List<string> columns = new List<string>()
            {
                "身分證字號","銀行名稱","分行名稱","帳號","交易序號","交易時間","交易行","交易摘要","幣別"
                ,"支出金額","存入金額","餘額","ATM或端末機代號","櫃員代號","轉出入行庫代碼及帳號","備註",
                "資料匯入時間"
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
                dataRow.CreateCell(1).SetCellValue(r.BankName);
                dataRow.CreateCell(2).SetCellValue(r.BankBranchName);
                dataRow.CreateCell(3).SetCellValue(r.TransactionAccountId);
                dataRow.CreateCell(4).SetCellValue(r.TransactionId);
                dataRow.CreateCell(5).SetCellValue(r.TransactionTime);
                dataRow.CreateCell(6).SetCellValue(r.TransactionBank);
                dataRow.CreateCell(7).SetCellValue(r.TransactionSummary);
                dataRow.CreateCell(8).SetCellValue(r.CurrencyType);
                dataRow.CreateCell(9).SetCellValue(r.PayoutMoneyAmount);
                dataRow.CreateCell(10).SetCellValue(r.DepositMoneyAmount);
                dataRow.CreateCell(11).SetCellValue(r.Balance);
                dataRow.CreateCell(12).SetCellValue(r.AtmDeviceCode);
                dataRow.CreateCell(13).SetCellValue(r.BankTellerId);
                dataRow.CreateCell(14).SetCellValue(r.BankCodeAccount);
                dataRow.CreateCell(15).SetCellValue(r.Remark);
                dataRow.CreateCell(16).SetCellValue(r.CreateTime);
                rowIndex++;
            }

            for (int j = 0; j < 18; j++)
            {
                sheet.AutoSizeColumn(j);
            }

            var stream = new MemoryStream();
            // processing the stream.
            workbook.Write(stream);

            return stream;
        }

        public IEnumerable<BankTransaction> GetAll()
        {
            return _unitOfWork.BankTransactionRepository.GetAll();
        }

        public PaginatedResult<BankTransactionDTO> GetPaginatedResult(BankTransactionSearchModel queryModel, PaginationWithSortedQueryModel paginated)
        {
            Tuple<IEnumerable<BankTransaction>, int> tuple = _unitOfWork.BankTransactionRepository.SearchPaginated(queryModel, paginated);
            IEnumerable<BankTransaction> userLists = tuple.Item1;

            var totalCount = tuple.Item2;

            PaginatedResult<BankTransactionDTO> pageResult = new PaginatedResult<BankTransactionDTO>
            {
                PaginatedInfo = new PaginatedInfo
                {
                    Page = paginated.Page,
                    PageSize = paginated.PageSize,
                    TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                    PageCount = userLists.Count(),
                    TotalCount = totalCount
                },
                Data = _mapper.Map<List<BankTransaction>, List<BankTransactionDTO>>(userLists.ToList()),
            };
            return pageResult;
        }

        public void Insert(BankTransaction BankTransaction)
        {
            _unitOfWork.BankTransactionRepository.Insert(BankTransaction, _unitOfWork);
        }

        public void InsertImport(BankTransactionImport BankTransactionImport)
        {
            _unitOfWork.BankTransactionImportRepository.Insert(BankTransactionImport, _unitOfWork);
        }

        public PaginatedResult<BankTransactionDetailDTO> GetDetail(BankTransactionSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            var tuple = _unitOfWork.BankTransactionRepository.GetByTransactionAccountId(entity, paginated);
            IEnumerable<BankTransaction> detailList = tuple.Item1;
            IEnumerable<BankTransactionImport> bankTransactionImports = _unitOfWork.BankTransactionImportRepository.GetBankTransactionImportSeq(detailList.Select(s => s.BankTransactionImportSeq).ToList());

            var totalCount = tuple.Item2;
            var bankTransactionDetails = detailList.Select(s => new BankTransactionDetail
            {
                Seq = s.Seq,
                BankTransactionImportSeq = s.BankTransactionImportSeq,
                TransactionAccountId = s.TransactionAccountId,
                TransactionId = s.TransactionId,
                TransactionDate = s.TransactionDate,
                TransactionTime = s.TransactionTime,
                TransactionBank = s.TransactionBank,
                TransactionSummary = s.TransactionSummary,
                CurrencyType = s.CurrencyType,
                PayoutMoneyAmount = s.PayoutMoneyAmount,
                DepositMoneyAmount = s.DepositMoneyAmount,
                Balance = s.Balance,
                AtmDeviceCode = s.AtmDeviceCode,
                BankTellerId = s.BankTellerId,
                BankCodeAccount = s.BankCodeAccount,
                Remark = s.Remark,
                CreateTime = DateTimeHelper.ConvertToDateTimeString(s.CreateTime),
                FileMD5 = bankTransactionImports.FirstOrDefault(x => x.BankAccountImportSeq.ToString().Equals(s.BankTransactionImportSeq)).FileMD5.ToString(),
            });

            PaginatedResult<BankTransactionDetailDTO> pageResult = new PaginatedResult<BankTransactionDetailDTO>
            {
                PaginatedInfo = new PaginatedInfo
                {
                    Page = paginated.Page,
                    PageSize = paginated.PageSize,
                    TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                    PageCount = detailList.Count(),
                    TotalCount = totalCount
                },
                Data = _mapper.Map<List<BankTransactionDetail>, List<BankTransactionDetailDTO>>(bankTransactionDetails.ToList()),
            };
            return pageResult;
        }
    }
}
