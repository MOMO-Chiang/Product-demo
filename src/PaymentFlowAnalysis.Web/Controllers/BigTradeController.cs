using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using PaymentFlowAnalysis.Common.Constants;
using PaymentFlowAnalysis.Common.Securities;
using PaymentFlowAnalysis.Common.Utilities;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Core.UnitOfWork;
using PaymentFlowAnalysis.Service.Services.Interfaces;
using PaymentFlowAnalysis.Web.Helpers;
using PaymentFlowAnalysis.Web.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Http;
using FromBodyAttribute = System.Web.Http.FromBodyAttribute;
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;
using RouteAttribute = System.Web.Http.RouteAttribute;

namespace PaymentFlowAnalysis.Web.Controllers
{
    [RoutePrefix("api/bigtrade")]
    public class BigTradeController : ApiController
    {
        private readonly IBigTradeService _BigTradeService;
        private readonly IUnitOfWork _unitOfWork;
        public BigTradeController(IBigTradeService BigTradeService, IUnitOfWork unitOfWork)
        {
            _BigTradeService = BigTradeService;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get([FromUri] BigTradeQueryParams queryParams)
        {
            BigTradeSearchModel queryModel = new BigTradeSearchModel
            {
                RemitterId = queryParams.RemitterId,
                RemitterName = queryParams.RemitterName,
                RemitterPhone = queryParams.RemitterPhone,
                CustomerAddress = queryParams.CustomerAddress,
                BeneficiaryId = queryParams.BeneficiaryId,
                Beneficiary = queryParams.Beneficiary,
                RemitTimeStart = !string.IsNullOrEmpty(queryParams.RemitTimeStart) ? Convert.ToDateTime(queryParams.RemitTimeStart) : (DateTime?)null,
                RemitTimeEnd = !string.IsNullOrEmpty(queryParams.RemitTimeEnd) ? Convert.ToDateTime(queryParams.RemitTimeEnd) : (DateTime?)null,
            };
            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };

            var result = _BigTradeService.GetPaginatedResult(queryModel, paginated);

            return Ok(result);
        }

        ///// <summary>
        ///// 匯出大額交易
        ///// </summary>
        ///// <param name="queryParams"></param>
        ///// <returns></returns>
        [Route("exportexcel")]
        [HttpPost]
        public IHttpActionResult ExportBigTradeExcel([FromBody] BigTradeQueryParams queryParams)
        {
            BigTradeSearchModel queryModel = new BigTradeSearchModel
            {
                RemitterId = queryParams.RemitterId,
                RemitterName = queryParams.RemitterName,
                RemitterPhone = queryParams.RemitterPhone,
                CustomerAddress = queryParams.CustomerAddress,
                BeneficiaryId = queryParams.BeneficiaryId,
                Beneficiary = queryParams.Beneficiary,
                RemitTimeStart = !string.IsNullOrEmpty(queryParams.RemitTimeStart) ? Convert.ToDateTime(queryParams.RemitTimeStart) : (DateTime?)null,
                RemitTimeEnd = !string.IsNullOrEmpty(queryParams.RemitTimeEnd) ? Convert.ToDateTime(queryParams.RemitTimeEnd) : (DateTime?)null,
            };
            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };
            var stream = _BigTradeService.ExportFile(queryModel, paginated);

            var res = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(stream.ToArray())
            };
            res.Content.Headers.ContentDisposition =
                new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = HttpUtility.UrlEncode("大額交易.xlsx")
                };
            res.Content.Headers.ContentType =
                new MediaTypeHeaderValue("application/vnd.ms-excel");

            return ResponseMessage(res);
        }

        ///// <summary>
        ///// 匯入xls檔案
        ///// </summary>
        ///// <param name="queryParams"></param>
        ///// <returns></returns>
        [Route("importxls")]
        [HttpPost]
        public IHttpActionResult ImportBigTradeXls()
        {
            try
            {
                var importfilereq = HttpContext.Current.Request;
                if (importfilereq.Files.Count > 0)
                {
                    var docfiles = new List<string>();
                    var postedFile = importfilereq.Files[0];

                    string fileExtension = Path.GetExtension(Path.GetFileName(postedFile.FileName));
                    var filePath = HttpContext.Current.Server.MapPath("~/" + postedFile.FileName);
                    postedFile.SaveAs(filePath);
                    docfiles.Add(filePath);
                    FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.None);

                    IWorkbook workbook;

                    switch (fileExtension)
                    {
                        case ".xls":
                            workbook = new HSSFWorkbook(fs);
                            break;
                        case ".xlsx":
                            workbook = new XSSFWorkbook(fs);
                            break;
                        default:
                            throw new OperationalException(
                            ErrorType.INSTANCE_NOT_FOUND,
                            $"檔案格式不支援");
                    }
                    fs.Close();
                    FileStream fsr = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.None);
                    MD5 md5 = new MD5CryptoServiceProvider();
                    string md5String = BitConverter.ToString(md5.ComputeHash(fsr)).Replace("-", "");
                    if (_unitOfWork.BigTradeImportRepository.GetByMD5(md5String).Count() > 0)
                    {
                        throw new OperationalException(
                        ErrorType.INSTANCE_NOT_FOUND,
                        $"此檔案已匯入過");
                    }
                    string bankCode = "";
                    var importuid = Guid.NewGuid();
                    for (var i = 0; i < workbook.NumberOfSheets; i++)
                    {
                        ISheet sheet = workbook.GetSheetAt(i);
                        for (int j = 1; j <= sheet.LastRowNum; j++)
                        {
                            IRow row = sheet.GetRow(j);
                            if (row != null)
                            {
                                List<string> list = new List<string>();
                                for (int k = 0; k < 18; k++)
                                {
                                    var cell = row.GetCell(k);
                                    list.Add(cell == null ? "" : cell.ToString());
                                }

                                if (!DateTime.TryParseExact(list[3], "yyyyMMdd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime OpenAccountDate))
                                {
                                    throw new OperationalException(
                                    ErrorType.INSTANCE_NOT_FOUND,
                                    $"開戶時間格式轉換錯誤");
                                }

                                if (!DateTime.TryParseExact(list[7], "yyyyMMddHHmm", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime RemitTime))
                                {
                                    throw new OperationalException(
                                    ErrorType.INSTANCE_NOT_FOUND,
                                    $"交易時間格式轉換錯誤");
                                }

                                if (!DateTime.TryParseExact(list[14], "yyyyMMddhhmmss", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime DeclarationTime))
                                {
                                    throw new OperationalException(
                                    ErrorType.INSTANCE_NOT_FOUND,
                                    $"申報時間格式轉換錯誤");
                                }
                                BigTrade BigTrade = new BigTrade
                                {
                                    BankTradeImportSeq = importuid.ToString(),
                                    BigTradeId = list[0],
                                    CustomerAccountId = list[1],
                                    CustomerName = list[2],
                                    OpenAccountDate = OpenAccountDate,
                                    CustomerId = list[4],
                                    RemitterName = list[5],
                                    RemitterId = list[6],
                                    RemitTime = RemitTime,
                                    RemitAmount = Int32.Parse(list[8]),
                                    RemitBank = list[9],
                                    RemitType = list[10],
                                    Beneficiary = list[11],
                                    BeneficiaryAccountId = list[12],
                                    Memo = list[13],
                                    DeclarationTime = DeclarationTime,
                                    CustomerPhone = list[15],
                                    CustomerAddress = list[16],
                                    RemitterPhone = list[17],
                                };

                                if (list[1] != "")
                                {
                                    bankCode = list[1];
                                }
                                _BigTradeService.Insert(BigTrade);
                            }
                        }
                    }


                    BigTradeImport bigTradeImport = new BigTradeImport
                    {

                        BankTradeImportSeq = importuid,
                        CaseNo = importfilereq.Form["caseno"],
                        CaseName = importfilereq.Form["caseno"] == "" ? "" : importfilereq.Form["casename"],
                        PersonalId = Request.GetUserIdFromToken(),
                        BankCode = bankCode.Substring(0, 3),
                        OriginCsvFileName = postedFile.FileName,
                        NewCsvFileName = importuid + ".csv",
                        SubCsvFilePath = "~MJIB/fileserver/",
                        CreateTime = DateTime.Now,
                        FileMD5 = md5String,
                    };
                    _BigTradeService.InsertImport(bigTradeImport);
                    fsr.Close();
                    return Ok();

                }
                else
                {
                    throw new OperationalException(
                    ErrorType.INSTANCE_NOT_FOUND,
                    $"請上傳檔案");
                }

            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }
    }
}