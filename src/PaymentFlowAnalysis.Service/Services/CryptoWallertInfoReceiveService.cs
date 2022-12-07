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
    public class CryptoWallertInfoReceiveService : ICryptoWallertInfoReceiveService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CryptoWallertInfoReceiveService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public MemoryStream ExportFile(CryptoWallertInfoReceiveSearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            IEnumerable<CryptoWallertInfoReceive> result = _unitOfWork.CryptoWallertInfoReceiveRepository.Search(entity, paginated);
            var resultDTO = _mapper.Map<List<CryptoWallertInfoReceive>, List<CryptoWallertInfoReceiveDTO>>(result.ToList());
            IWorkbook workbook = new XSSFWorkbook();

            ISheet sheet = workbook.CreateSheet("sheet1");
            List<string> columns = new List<string>()
            {
                "資料來源機構","資料接收時間","錢包地址","錢包幣別","錢包地址發行時間","錢包地址分配時間","是否為熱錢包"
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
                dataRow.CreateCell(0).SetCellValue(r.ExchangeTypeCodeStr);
                dataRow.CreateCell(1).SetCellValue(r.CreateTime.ToString());
                dataRow.CreateCell(2).SetCellValue(r.WalletAddress);
                dataRow.CreateCell(3).SetCellValue(r.CurrencyType);
                dataRow.CreateCell(4).SetCellValue(r.PublishTime_Cov.ToString());
                dataRow.CreateCell(5).SetCellValue(r.DistributionTime_Cov.ToString());
                dataRow.CreateCell(6).SetCellValue(r.HotWallet);

                rowIndex++;
            }

            for (int j = 0; j < 7; j++)
            {
                sheet.AutoSizeColumn(j);
            }

            var stream = new MemoryStream();
            // processing the stream.
            workbook.Write(stream);

            return stream;
            //throw new NotImplementedException();
        }

        public IEnumerable<CryptoWallertInfoReceive> GetAll()
        {
            return _unitOfWork.CryptoWallertInfoReceiveRepository.GetAll();
        }

        public PaginatedResult<CryptoWallertInfoReceiveDTO> GetPaginatedResult(CryptoWallertInfoReceiveSearchModel queryModel, PaginationWithSortedQueryModel paginated)
        {
            Tuple<IEnumerable<CryptoWallertInfoReceive>, int> tuple = _unitOfWork.CryptoWallertInfoReceiveRepository.SearchPaginated(queryModel, paginated);
            IEnumerable<CryptoWallertInfoReceive> userLists = tuple.Item1;
            var totalCount = tuple.Item2;

            PaginatedResult<CryptoWallertInfoReceiveDTO> pageResult = new PaginatedResult<CryptoWallertInfoReceiveDTO>
            {
                PaginatedInfo = new PaginatedInfo
                {
                    Page = paginated.Page,
                    PageSize = paginated.PageSize,
                    TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                    PageCount = userLists.Count(),
                    TotalCount = totalCount
                },
                Data = _mapper.Map<List<CryptoWallertInfoReceive>, List<CryptoWallertInfoReceiveDTO>>(userLists.ToList()),
            };
            return pageResult;
        }
    }
}
