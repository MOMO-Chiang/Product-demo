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
    [RoutePrefix("api/banktransaction")]
    public class BankTransactionController : ApiController
    {
        private readonly IBankTransactionService _BankTransactionService;
        private readonly IUnitOfWork _unitOfWork;
        public BankTransactionController(IBankTransactionService BankTransactionService, IUnitOfWork unitOfWork)
        {
            _BankTransactionService = BankTransactionService;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get([FromUri] BankTransactionQueryParams queryParams)
        {
            BankTransactionSearchModel queryModel = new BankTransactionSearchModel
            {
                IdCardNumber = queryParams.IdCardNumber,
                TransactionAccountId = queryParams.TransactionAccountId,
                TransactionBank = queryParams.TransactionBank,
                TransactionSummary = queryParams.TransactionSummary,
                TransactionTimeStart = !string.IsNullOrEmpty(queryParams.TransactionTimeStart) ? Convert.ToDateTime(queryParams.TransactionTimeStart) : (DateTime?)null,
                TransactionTimeEnd = !string.IsNullOrEmpty(queryParams.TransactionTimeEnd) ? Convert.ToDateTime(queryParams.TransactionTimeEnd) : (DateTime?)null,
            };
            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };

            var result = _BankTransactionService.GetPaginatedResult(queryModel, paginated);

            return Ok(result);
        }

        ///// <summary>
        ///// 匯出交易明細
        ///// </summary>
        ///// <param name="queryParams"></param>
        ///// <returns></returns>
        [Route("exportexcel")]
        [HttpPost]
        public IHttpActionResult ExportBankTransactionExcel([FromBody] BankTransactionQueryParams queryParams)
        {
            BankTransactionSearchModel queryModel = new BankTransactionSearchModel
            {
                IdCardNumber = queryParams.IdCardNumber,
                TransactionAccountId = queryParams.TransactionAccountId,
                TransactionBank = queryParams.TransactionBank,
                TransactionSummary = queryParams.TransactionSummary,
                TransactionTimeStart = !string.IsNullOrEmpty(queryParams.TransactionTimeStart) ? Convert.ToDateTime(queryParams.TransactionTimeStart) : (DateTime?)null,
                TransactionTimeEnd = !string.IsNullOrEmpty(queryParams.TransactionTimeEnd) ? Convert.ToDateTime(queryParams.TransactionTimeEnd) : (DateTime?)null,
            };
            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };
            var stream = _BankTransactionService.ExportFile(queryModel, paginated);

            var res = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(stream.ToArray())
            };
            res.Content.Headers.ContentDisposition =
                new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = HttpUtility.UrlEncode("交易明細.xlsx")
                };
            res.Content.Headers.ContentType =
                new MediaTypeHeaderValue("application/vnd.ms-excel");

            return ResponseMessage(res);
        }

        ///// <summary>
        ///// 匯入csv檔案
        ///// </summary>
        ///// <param name="queryParams"></param>
        ///// <returns></returns>
        [Route("importcsv")]
        [HttpPost]
        public IHttpActionResult ImportBankTransactionCsv()
        {
            try
            {
                var importfilereq = HttpContext.Current.Request;
                if (importfilereq.Files.Count > 0)
                {
                    var docfiles = new List<string>();
                    var postedFile = importfilereq.Files[0];
                    if (!postedFile.FileName.ToLower().Contains(".csv"))
                    {
                        throw new OperationalException(
                        ErrorType.INSTANCE_NOT_FOUND,
                        $"請上傳csv檔");
                    };
                    var filePath = HttpContext.Current.Server.MapPath("~/" + postedFile.FileName);
                    postedFile.SaveAs(filePath);
                    docfiles.Add(filePath);
                    FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.None);
                    MD5 md5 = new MD5CryptoServiceProvider();
                    string md5String = BitConverter.ToString(md5.ComputeHash(fs)).Replace("-", "");
                    if (_unitOfWork.BankTransactionImportRepository.GetByMD5(md5String).Count() > 0)
                    {
                        throw new OperationalException(
                        ErrorType.INSTANCE_NOT_FOUND,
                        $"此檔案已匯入過");
                    }
                    fs.Close();
                    var importuid = Guid.NewGuid();
                    FileStream fsr = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.None);
                    StreamReader sr = new StreamReader(fsr, Encoding.Default);
                    string str = "";
                    string bankCode = "";
                    while (str != null)
                    {
                        str = sr.ReadLine();
                        if (str == null)
                            break;
                        var importdata = str.Split(',');

                        if (!importdata[0].Contains("身分證"))
                        {

                            BankTransaction BankTransaction = new BankTransaction
                            {
                                BankTransactionImportSeq = importuid.ToString(),
                                IdCardNumber = importdata[0],
                                TransactionAccountId = importdata[1],
                                TransactionId = importdata[2],
                                TransactionDate = importdata[3],
                                TransactionTime = importdata[4],
                                TransactionBank = importdata[5],
                                TransactionSummary = importdata[6],
                                CurrencyType = importdata[7],
                                PayoutMoneyAmount = importdata[8],
                                DepositMoneyAmount = importdata[9],
                                Balance = importdata[10],
                                AtmDeviceCode = importdata[11],
                                BankTellerId = importdata[12],
                                BankCodeAccount = importdata[13],
                                Remark = importdata[14],
                                CreateTime = DateTime.Now,
                            };
                            _BankTransactionService.Insert(BankTransaction);
                            if (importdata[1] != "")
                            {
                                bankCode = importdata[1];
                            }
                        }
                    }
                    BankTransactionImport BankTransactionImport = new BankTransactionImport
                    {

                        BankAccountImportSeq = importuid,
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
                    _BankTransactionService.InsertImport(BankTransactionImport);
                    sr.Close();
                    File.Delete(filePath);
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

        ///// <summary>
        ///// 取得摺疊明細資料
        ///// </summary>
        ///// <param name="queryParams"></param>
        ///// <returns></returns>
        [HttpGet]
        [Route("detail")]
        public IHttpActionResult QuertDetail([FromUri] BankTransactionQueryParams queryParams)
        {
            BankTransactionSearchModel queryModel = new BankTransactionSearchModel
            {
                IdCardNumber = queryParams.IdCardNumber,
                TransactionAccountId = queryParams.TransactionAccountId,
                TransactionBank = queryParams.TransactionBank,
                TransactionSummary = queryParams.TransactionSummary,
                TransactionTimeStart = !string.IsNullOrEmpty(queryParams.TransactionTimeStart) ? Convert.ToDateTime(queryParams.TransactionTimeStart) : (DateTime?)null,
                TransactionTimeEnd = !string.IsNullOrEmpty(queryParams.TransactionTimeEnd) ? Convert.ToDateTime(queryParams.TransactionTimeEnd) : (DateTime?)null,
            };
            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };
            var bankTransactionDetail = _BankTransactionService.GetDetail(queryModel, paginated);
            return Ok(bankTransactionDetail);

        }
    }
}