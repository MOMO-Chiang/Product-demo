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
    [RoutePrefix("api/bankaccountinfo")]
    public class BankAccountInfoController : ApiController
    {
        private readonly IBankAccountInfoService _bankAccountInfoService;
        private readonly IUnitOfWork _unitOfWork;
        public BankAccountInfoController(IBankAccountInfoService bankAccountInfoService, IUnitOfWork unitOfWork)
        {
            _bankAccountInfoService = bankAccountInfoService;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get([FromUri] BankAccountInfoQueryParams queryParams)
        {
            BankAccountInfoSearchModel queryModel = new BankAccountInfoSearchModel
            {
                AccountId = queryParams.AccountId,
                IdCardNumber = queryParams.IdCardNumber,
                AccountName = queryParams.AccountName,
                MobilePhone = queryParams.MobilePhone,
                AccountOpeningDateStart = !string.IsNullOrEmpty(queryParams.AccountOpeningDateStart) ? Convert.ToDateTime(queryParams.AccountOpeningDateStart) : (DateTime?)null,
                AccountOpeningDateEnd = !string.IsNullOrEmpty(queryParams.AccountOpeningDateEnd) ? Convert.ToDateTime(queryParams.AccountOpeningDateEnd) : (DateTime?)null,
                IsAccountMark = queryParams.IsAccountMark == "1"?true:false,
            };
            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };

            var result = _bankAccountInfoService.GetPaginatedResult(queryModel, paginated);

            return Ok(result);
        }

        ///// <summary>
        ///// 匯出開戶資料
        ///// </summary>
        ///// <param name="queryParams"></param>
        ///// <returns></returns>
        [Route("exportexcel")]
        [HttpPost]
        public IHttpActionResult ExportBankAccountInfoExcel([FromBody] BankAccountInfoQueryParams queryParams)
        {
            BankAccountInfoSearchModel queryModel = new BankAccountInfoSearchModel
            {
                AccountId = queryParams.AccountId,
                IdCardNumber = queryParams.IdCardNumber,
                AccountName = queryParams.AccountName,
                MobilePhone = queryParams.MobilePhone,
                AccountOpeningDateStart = !string.IsNullOrEmpty(queryParams.AccountOpeningDateStart) ? Convert.ToDateTime(queryParams.AccountOpeningDateStart) : (DateTime?)null,
                AccountOpeningDateEnd = !string.IsNullOrEmpty(queryParams.AccountOpeningDateEnd) ? Convert.ToDateTime(queryParams.AccountOpeningDateEnd) : (DateTime?)null,
                IsAccountMark = queryParams.IsAccountMark == "1" ? true : false,
            };
            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };
            var stream = _bankAccountInfoService.ExportFile(queryModel, paginated);

            var res = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(stream.ToArray())
            };
            res.Content.Headers.ContentDisposition =
                new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = HttpUtility.UrlEncode("開戶資料.xlsx")
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
        public IHttpActionResult ImportBankAccountInfoCsv()
        {
            try
            {
                var importfilereq = HttpContext.Current.Request;
                if (importfilereq.Files.Count > 0)
                {
                    var docfiles = new List<string>();
                    var postedFile = importfilereq.Files[0];
                    if (!postedFile.FileName.Contains(".csv"))
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
                    if (_unitOfWork.BankAccountImportRepository.GetByMD5(md5String).Count() > 0)
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
                            BankAccountInfo bankAccountInfo = new BankAccountInfo
                            {
                                BankAccountImportSeq = importuid.ToString(),
                                IdCardNumber = importdata[0],
                                BankBranchCode = importdata[1],
                                AccountType = importdata[2],
                                CurrencyType = importdata[3],
                                AccountName = importdata[4],
                                LocalPhone = importdata[5],
                                MobilePhone = importdata[6],
                                ResidenceAddress = importdata[7],
                                MailingAddresses = importdata[8],
                                AccountId = importdata[9],
                                DataProvidedDate = importdata[10],
                                DataProvidedDate_Cov = importdata[10] == "" ? (DateTime?)null : DateTime.ParseExact(importdata[10], "yyyyMMdd", CultureInfo.InvariantCulture),
                                AccountOpeningDate = importdata[11],
                                AccountOpeningDate_Cov = importdata[11] == "" ? (DateTime?)null : DateTime.ParseExact(importdata[11], "yyyyMMdd", CultureInfo.InvariantCulture),
                                AccountClosingDate = importdata[12],
                                AccountClosingDate_Cov = importdata[12] == "" ? (DateTime?)null : DateTime.ParseExact(importdata[12], "yyyyMMdd", CultureInfo.InvariantCulture),
                                AccountBalance = importdata[13],
                                AccountBalance_Cov = Decimal.ToInt64(Math.Truncate(Convert.ToDecimal(importdata[13]))),
                                Remark = importdata[14],
                                CreateTime = DateTime.Now
                            };
                            _bankAccountInfoService.Insert(bankAccountInfo);
                            if (importdata[1] != "")
                            {
                                bankCode = importdata[1];
                            }
                        }
                    }

                    BankAccountImport bankAccountImport = new BankAccountImport
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
                    _bankAccountInfoService.InsertImport(bankAccountImport);
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
        ///// 本案相關帳戶
        ///// </summary>
        ///// <param name="queryParams"></param>
        ///// <returns></returns>
        [Route("{seq}/isaccountmark")]
        [HttpPatch]
        public IHttpActionResult UpdateIsAccountMark([FromBody] bool isAccountMark,string seq)
        {
            isAccountMark = isAccountMark ? false : true;
            _unitOfWork.BankAccountInfoRepository.UpdateIsAcoountMark(seq, isAccountMark);
            return Ok();
        }
    }
}