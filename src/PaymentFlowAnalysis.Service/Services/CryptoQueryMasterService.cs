using AutoMapper;
using Newtonsoft.Json;
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
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Service.Services
{
    public class CryptoQueryMasterService : ICryptoQueryMasterService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CryptoQueryMasterService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public MemoryStream ExportExcel(CryptoQueryMasterServiceModel queryParams)
        {
            var result = GetMasterPaginatedResult(queryParams);

            IWorkbook workbook = new XSSFWorkbook();

            ISheet sheet = workbook.CreateSheet("sheet1");
            List<string> columns = new List<string>()
            {
                "調閱時間","調閱主序號","案號","案名","資料回覆"
                ,"本案標記","照片列表","身分證字號","姓名","交易所","交易所帳號","錢包地址","電話列表","電子信箱","登入IP列表","性別","生日","通訊地址","帳號註冊時間","總資產價值(台幣)","銀行代碼","銀行分支機構代碼","銀行帳號","認證銀行代碼","認證日期","調閱單號","資料建立時間"
            };
            IRow headerRow = sheet.CreateRow(0);
            for (var i = 0; i < columns.Count; i++)
            {
                headerRow.CreateCell(i).SetCellValue(columns[i]);
            }

            int rowIndex = 1;
            foreach (var master in result.Data)
            {
                List<CryptoQueryDetail> cryptoQueryDetails = JsonConvert.DeserializeObject<List<CryptoQueryDetail>>(master.DetailData);
                foreach (var detail in cryptoQueryDetails)
                {
                    IRow row = sheet.CreateRow(rowIndex);
                    row.CreateCell(0).SetCellValue(master.QueryOrderTime);
                    row.CreateCell(1).SetCellValue(master.OrderMasterNumber);
                    row.CreateCell(2).SetCellValue(master.CaseNo);
                    row.CreateCell(3).SetCellValue(master.CaseName);
                    row.CreateCell(4).SetCellValue(master.OrderDetailCount);
                    row.CreateCell(5).SetCellValue(detail.IsCaseMark);
                    row.CreateCell(6).SetCellValue(detail.PictureSubPath);
                    row.CreateCell(7).SetCellValue(detail.IdCardNum);
                    row.CreateCell(8).SetCellValue(detail.Name);
                    row.CreateCell(9).SetCellValue(detail.ExchangeTypeCode);
                    row.CreateCell(10).SetCellValue(detail.AccountID);
                    row.CreateCell(11).SetCellValue(detail.WallerAddress);
                    row.CreateCell(12).SetCellValue(detail.Phone);
                    row.CreateCell(13).SetCellValue(detail.Email);
                    row.CreateCell(14).SetCellValue(detail.IP);
                    row.CreateCell(15).SetCellValue(detail.Sexual_Cov);
                    row.CreateCell(16).SetCellValue(detail.Birthday_Cov);
                    row.CreateCell(17).SetCellValue(detail.Address);
                    row.CreateCell(18).SetCellValue(detail.RegisterDate_Cov);
                    row.CreateCell(19).SetCellValue(detail.TotalProperty);
                    row.CreateCell(20).SetCellValue(detail.BankName);
                    row.CreateCell(21).SetCellValue(detail.Branch);
                    row.CreateCell(22).SetCellValue(detail.BankAccount);
                    row.CreateCell(23).SetCellValue(detail.Verifiedbank);
                    row.CreateCell(24).SetCellValue(detail.VerifyDate_Cov);
                    row.CreateCell(25).SetCellValue(detail.OrderNumber);
                    row.CreateCell(26).SetCellValue(detail.CreateTime);

                    rowIndex++;
                }
            }

            for (int j = 0; j < columns.Count; j++)
            {
                sheet.AutoSizeColumn(j);
            }

            MemoryStream stream = new MemoryStream();
            workbook.Write(stream);

            return stream;
        }

        private PaginatedResult<CryptoQueryMasterDTO> GetMasterPaginatedResult(CryptoQueryMasterServiceModel queryParams)
        {
            throw new NotImplementedException();
        }

        public PaginatedResult<CryptoQueryMasterDTO> GetPaginatedResult(CryptoQueryMasterSearchModel queryModel, PaginationWithSortedQueryModel paginated)
        {
            Tuple<IEnumerable<CryptoQueryMaster>, int> tuple = _unitOfWork.CryptoQueryMasterRepository.SearchPaginated(queryModel, paginated);
            IEnumerable<CryptoQueryMaster> cryptoQueryMaster = tuple.Item1;
            var totalCount = tuple.Item2;

            PaginatedResult<CryptoQueryMasterDTO> pageResult = new PaginatedResult<CryptoQueryMasterDTO>
            {
                PaginatedInfo = new PaginatedInfo
                {
                    Page = paginated.Page,
                    PageSize = paginated.PageSize,
                    TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                    PageCount = cryptoQueryMaster.Count(),
                    TotalCount = totalCount
                },
                Data = _mapper.Map<List<CryptoQueryMaster>, List<CryptoQueryMasterDTO>>(cryptoQueryMaster.ToList()),

            };
            return pageResult;
        }

        public PaginatedResult<CryptoQueryMaster> GetSearchParams(CryptoQueryMasterSearchModel queryModel, PaginationWithSortedQueryModel paginated)
        {
            Tuple<IEnumerable<CryptoQueryMaster>, int> tuple = _unitOfWork.CryptoQueryMasterRepository.SearchParams(queryModel, paginated);
            IEnumerable<CryptoQueryMaster> cryptoQueryMaster = tuple.Item1;
            var totalCount = tuple.Item2;

            PaginatedResult<CryptoQueryMaster> pageResult = new PaginatedResult<CryptoQueryMaster>
            {
                PaginatedInfo = new PaginatedInfo
                {
                    Page = paginated.Page,
                    PageSize = paginated.PageSize,
                    TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                    PageCount = cryptoQueryMaster.Count(),
                    TotalCount = totalCount
                },
                Data = cryptoQueryMaster.ToList(),
            };
            return pageResult;
        }
    }
}
