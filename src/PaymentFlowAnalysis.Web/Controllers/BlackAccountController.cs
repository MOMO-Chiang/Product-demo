using PaymentFlowAnalysis.Common.Constants;
using PaymentFlowAnalysis.Common.Utilities;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Models;
using PaymentFlowAnalysis.Service.Services.Interfaces;
using PaymentFlowAnalysis.Web.Helpers;
using PaymentFlowAnalysis.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace PaymentFlowAnalysis.Web.Controllers
{
    [RoutePrefix("api/blackaccount")]
    public class BlackAccountController : ApiController
    {
        private readonly IBlackAccountService _bankAccountService;
        public BlackAccountController(IBlackAccountService bankAccountService)
        {
            _bankAccountService = bankAccountService;
        }

        [HttpGet]
        [Route("")]
        public IHttpActionResult Get([FromUri] BlackAccountQueryParams queryParams)
        {
            BlackAccountSearchModel queryModel = new BlackAccountSearchModel
            {
                IdCardNum = queryParams.IdCardNum,
                WalletAddress = queryParams.WalletAddress,
                Phone = queryParams.Phone,
                Email = queryParams.Email,
                IP = queryParams.IP,
                Url = queryParams.Url,
                Remark = queryParams.Remark,
            };
            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };

            var result = _bankAccountService.GetPaginatedResult(queryModel, paginated);

            return Ok(result);
        }

        ///// <summary>
        ///// 匯出黑名單excel
        ///// </summary>
        ///// <param name="queryParams"></param>
        ///// <returns></returns>
        [HttpPost]
        [Route("exportexcel")]
        public IHttpActionResult ExportBlackAccountExcel([FromBody] BlackAccountQueryParams queryParams)
        {
            BlackAccountSearchModel queryModel = new BlackAccountSearchModel
            {
                IdCardNum = queryParams.IdCardNum,
                WalletAddress = queryParams.WalletAddress,
                Phone = queryParams.Phone,
                Email = queryParams.Email,
                IP = queryParams.IP,
                Url = queryParams.Url,
                Remark = queryParams.Remark,
            };
            PaginationWithSortedQueryModel paginated = new PaginationWithSortedQueryModel
            {
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                IsAll = queryParams.IsAll,
                SortedType = queryParams.SortedType,
                SortedColumn = queryParams.SortedColumn,
            };
            var stream = _bankAccountService.ExportFile(queryModel, paginated);

            var res = new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new ByteArrayContent(stream.ToArray())
            };
            res.Content.Headers.ContentDisposition =
                new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = HttpUtility.UrlEncode("黑名單資料.xlsx")
                };
            res.Content.Headers.ContentType =
                new MediaTypeHeaderValue("application/vnd.ms-excel");

            return ResponseMessage(res);
        }

        ///// <summary>
        ///// 取得編輯黑名單資料
        ///// </summary>
        ///// <param name="queryParams"></param>
        ///// <returns></returns>
        [HttpGet]
        [Route("{walletAddress}")]
        public IHttpActionResult Get(string walletAddress)
        {
            try
            {
                if (walletAddress == null)
                {
                    throw new OperationalException(
                            ErrorType.INVALID_ID,
                            "識別碼不得為空");
                }
                var blackAccount = _bankAccountService.Get(walletAddress);

                return Ok(blackAccount);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        ///// <summary>
        ///// 取得黑名單彈窗資料
        ///// </summary>
        ///// <param name="queryParams"></param>
        ///// <returns></returns>
        [HttpGet]
        [Route("showmodal/{walletAddress}/{type}")]
        public IHttpActionResult ShowModal(string walletAddress, string type)
        {
            try
            {
                if (walletAddress == null)
                {
                    throw new OperationalException(
                            ErrorType.INVALID_ID,
                            "識別碼不得為空");
                }
                if (type=="phone")
                {
                    var blackAccount = _bankAccountService.GetPhone(walletAddress);
                    return Ok(blackAccount);
                } else if (type == "email")
                {
                    var blackAccount = _bankAccountService.GetEmail(walletAddress);
                    return Ok(blackAccount);
                } else
                {
                    var blackAccount = _bankAccountService.GetIP(walletAddress);
                    return Ok(blackAccount);
                }
               
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
        }

        ///// <summary>
        ///// 新增黑名單資料
        ///// </summary>
        ///// <param name="queryParams"></param>
        ///// <returns></returns>
        [HttpPost]
        [Route("")]
        public IHttpActionResult Post([FromBody] BlackAccountInsertData reqParams)
        {
            try
            {
                BlackAccountInsertData blackAccount = new BlackAccountInsertData
                {
                    WalletAddress = reqParams.WalletAddress,
                    CurrencyType = reqParams.CurrencyType,
                    IdCardNum = reqParams.IdCardNum,
                    Risklevel = reqParams.Risklevel,
                    Url = reqParams.Url,
                    Remark = reqParams.Remark,
                    UserPhone = reqParams.UserPhone,
                    UserEmail = reqParams.UserEmail,
                    UserIP = reqParams.UserIP,
                };

                _bankAccountService.InsertAllData(blackAccount);
            }

            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }
            return Ok();
        }

        ///// <summary>
        ///// 更新黑名單資料
        ///// </summary>
        ///// <param name="queryParams"></param>
        ///// <returns></returns>
        [HttpPut]
        [Route("{walletAddress}")]
        public IHttpActionResult Put(string walletAddress, [FromBody] BlackAccountInsertData reqParams)
        {
            try
            {
                BlackAccountInsertData blackAccount = new BlackAccountInsertData
                {
                    WalletAddress = walletAddress,
                    CurrencyType = reqParams.CurrencyType,
                    IdCardNum = reqParams.IdCardNum,
                    Risklevel = reqParams.Risklevel,
                    Url = reqParams.Url,
                    Remark = reqParams.Remark,
                    UserPhone = reqParams.UserPhone,
                    UserEmail = reqParams.UserEmail,
                    UserIP = reqParams.UserIP,
                };
                _bankAccountService.UpdateAllData(blackAccount);
            }
            catch (OperationalException ex)
            {
                return Content(HttpStatusCode.BadRequest, APIHelper.CreateAPIError(ex.ErrorType, ex.Message, ex.Details));
            }

            return Ok();
        }
        /// <summary>
        /// 取得下拉選單
        /// </summary>
        /// <param name="type">風險類別下拉選單</param>
        /// <returns></returns>
        [Route("options")]
        [HttpGet]
        public IHttpActionResult GetOptions()
        {
            //var option = Enum.GetValues(typeof(Common.Enums.AgencyTypeEnum)).ToList().Select();
            var option = Enum.GetValues(typeof(Common.Enums.RiskLevel)).Cast<Common.Enums.RiskLevel>().Select(v => new Option
            {
                Value = ((short)v).ToString(),
                Text = v.ToString()
            });

            return Ok(option);
        }
    }
}