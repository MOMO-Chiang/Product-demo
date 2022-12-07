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
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Service.Services
{
    public class CryptoQueryDetailService : ICryptoQueryDetailService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CryptoQueryDetailService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        
        public PaginatedResult<CryptoQueryDetailPersonalDTO> SearchPaginatedQuery(CryptoQueryDetailSearchModel queryModel, PaginationWithSortedQueryModel paginated)
        {
            Tuple<IEnumerable<CryptoQueryDetail>, int> tuple = _unitOfWork.CryptoQueryDetailRepository.SearchPaginatedQuery(queryModel, paginated);
            IEnumerable<CryptoQueryDetail> DetailLists = tuple.Item1;
            var totalCount = tuple.Item2;

            PaginatedResult<CryptoQueryDetailPersonalDTO> pageResult = new PaginatedResult<CryptoQueryDetailPersonalDTO>
            {
                PaginatedInfo = new PaginatedInfo
                {
                    Page = paginated.Page,
                    PageSize = paginated.PageSize,
                    TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                    PageCount = DetailLists.Count(),
                    TotalCount = totalCount
                },
                Data = _mapper.Map<List<CryptoQueryDetail>, List<CryptoQueryDetailPersonalDTO>>(DetailLists.ToList()),

            };
            return pageResult;
        }

        public PaginatedResult<CryptoQueryDTO> SearchHistory(CryptoQueryDetailSearchModel queryModel, PaginationWithSortedQueryModel paginated)
        {
            Tuple<IEnumerable<CryptoQuery>, int> tuple = _unitOfWork.CryptoQueryDetailRepository.SearchHistory(queryModel, paginated);
            IEnumerable<CryptoQuery> DetailLists = tuple.Item1;
            var totalCount = tuple.Item2;

            PaginatedResult<CryptoQueryDTO> pageResult = new PaginatedResult<CryptoQueryDTO>
            {
                PaginatedInfo = new PaginatedInfo
                {
                    Page = paginated.Page,
                    PageSize = paginated.PageSize,
                    TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                    PageCount = DetailLists.Count(),
                    TotalCount = totalCount
                },
                Data = _mapper.Map<List<CryptoQuery>, List<CryptoQueryDTO>>(DetailLists.ToList()),
            };
            return pageResult;
        }

        public PaginatedResult<CryptoQueryDetailPersonalDTO> GetParamsResult(CryptoQueryDetailSearchModel queryModel, PaginationWithSortedQueryModel paginated)
        {
            Tuple<IEnumerable<CryptoQueryDetail>, int> tuple = _unitOfWork.CryptoQueryDetailRepository.GetParamsResult(queryModel, paginated);
            IEnumerable<CryptoQueryDetail> DetailLists = tuple.Item1;
            var totalCount = tuple.Item2;

            PaginatedResult<CryptoQueryDetailPersonalDTO> pageResult = new PaginatedResult<CryptoQueryDetailPersonalDTO>
            {
                PaginatedInfo = new PaginatedInfo
                {
                    Page = paginated.Page,
                    PageSize = paginated.PageSize,
                    TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                    PageCount = DetailLists.Count(),
                    TotalCount = totalCount
                },
                Data = _mapper.Map<List<CryptoQueryDetail>, List<CryptoQueryDetailPersonalDTO>>(DetailLists.ToList()),
            };
            return pageResult;
        }

        public MemoryStream ExportFile(CryptoQuerySearchModel entity, PaginationWithSortedQueryModel paginated)
        {
            IEnumerable<CryptoQuery> result = _unitOfWork.CryptoQueryDetailRepository.Search(entity, paginated);
            var resultDTO = _mapper.Map<List<CryptoQuery>, List<CryptoQueryDTO>>(result.ToList());
            IWorkbook workbook = new XSSFWorkbook();

            ISheet sheet = workbook.CreateSheet("sheet1");
            List<string> columns = new List<string>()
            {
                "調閱時間","調閱人人事五碼","目標機構","拋查條件","拋查值","拋查狀態","調閱單號",
                "調閱人姓名","調閱人電話","調閱人Email","調閱人職稱","調閱人任職單位","刑事案類"
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
                dataRow.CreateCell(0).SetCellValue(r.QueryOrderTime);
                dataRow.CreateCell(1).SetCellValue(r.QueryUserId);
                dataRow.CreateCell(2).SetCellValue(r.RequestAgency);
                dataRow.CreateCell(3).SetCellValue(r.QueryConditionType);
                dataRow.CreateCell(4).SetCellValue(r.QueryValue);
                dataRow.CreateCell(5).SetCellValue(r.QueryStatus);
                dataRow.CreateCell(6).SetCellValue(r.OrderDetailNumber);
                dataRow.CreateCell(7).SetCellValue(r.QueryName);
                dataRow.CreateCell(8).SetCellValue(r.QueryPhone);
                dataRow.CreateCell(9).SetCellValue(r.QueryEmail);
                dataRow.CreateCell(10).SetCellValue(r.QueryRank);
                dataRow.CreateCell(11).SetCellValue(r.QueryUnit);
                dataRow.CreateCell(12).SetCellValue(r.ProjectCategory);

                rowIndex++;
            }

            for (int j = 0; j < 12; j++)
            {
                sheet.AutoSizeColumn(j);
            }

            var stream = new MemoryStream();
            // processing the stream.
            workbook.Write(stream);

            return stream;
            //throw new NotImplementedException();
        }

        public PaginatedResult<CryptoQueryDTO> GetPaginatedResult(CryptoQuerySearchModel queryModel, PaginationWithSortedQueryModel paginated)
        {
            Tuple<IEnumerable<CryptoQuery>, int> tuple = _unitOfWork.CryptoQueryDetailRepository.SearchPaginated(queryModel, paginated);
            IEnumerable<CryptoQuery> userLists = tuple.Item1;
            var totalCount = tuple.Item2;

            PaginatedResult<CryptoQueryDTO> pageResult = new PaginatedResult<CryptoQueryDTO>
            {
                PaginatedInfo = new PaginatedInfo
                {
                    Page = paginated.Page,
                    PageSize = paginated.PageSize,
                    TotalPage = (int)Math.Ceiling(totalCount / (double)paginated.PageSize),
                    PageCount = userLists.Count(),
                    TotalCount = totalCount
                },
                Data = _mapper.Map<List<CryptoQuery>, List<CryptoQueryDTO>>(userLists.ToList()),
            };
            return pageResult;
        }

        public IEnumerable<CryptoQuery> GetDetailNumber(List<string> orderMasterNumber)
        {
            var DetailLists = _unitOfWork.CryptoQueryDetailRepository.GetDetailNumber(orderMasterNumber);
            return DetailLists;
        }

        public CryptoQueryDetail Get(string seq)
        {
            var cryptoQueryDetail = _unitOfWork.CryptoQueryDetailRepository.Get(seq);
            if (cryptoQueryDetail == null)
            {
                throw new OperationalException(
                    ErrorType.INSTANCE_NOT_FOUND,
                    $"查無此序號: {seq}");
            }

            return cryptoQueryDetail;
        }
    }
}
