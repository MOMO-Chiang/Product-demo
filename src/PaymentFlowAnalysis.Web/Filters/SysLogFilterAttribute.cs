using System;
using System.Configuration;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.IO;
using System.Text;
using PaymentFlowAnalysis.Service.Services.Interfaces;
using PaymentFlowAnalysis.Service.Services;
using PaymentFlowAnalysis.Core.Entities;
using Newtonsoft.Json;
using PaymentFlowAnalysis.Core.UnitOfWork;
using PaymentFlowAnalysis.Core.DbConnectionFactory;
using System.Net.Http;
using System.Collections.Generic;
using System.Web.Services.Description;
using System.Runtime.Remoting.Contexts;

namespace PaymentFlowAnalysis.Web.Filters
{

    /// <summary>
    ///  紀錄 request response
    /// </summary>
    public class SysLogFilterAttribute : ActionFilterAttribute
    {
        private readonly IMainLogService _mainLogService;

        private readonly IUnitOfWork _unitOfWor;

        public SysLogFilterAttribute()
        {
            IDbConnectionFactory ConnectionFactory = new DbConnectionFactory();
            _unitOfWor = new UnitOfWork(ConnectionFactory);
            _mainLogService = new MainLogService(_unitOfWor);

        }

        /// <summary>
        /// 是否開啟紀錄
        /// </summary>
        private static bool UseSysLog = Boolean.Parse(ConfigurationManager.AppSettings["UseSysLog"]);
        /// <summary>
        ///  紀錄 request 開始的時間點
        /// </summary>
        private static readonly string key = "QTime";


        public override void OnActionExecuting(HttpActionContext context)
        {
            if (UseSysLog)

                //先記錄進入請求的時間
                context.Request.Properties[key] = DateTime.Now.ToBinary();

        }

        public override void OnActionExecuted(HttpActionExecutedContext context)
        {

            if (UseSysLog)
            {   // test SysUserList
                //if (context.ActionContext.ActionDescriptor.ControllerDescriptor.ControllerName == "SysUserList")
                //{
                //    var objectRequestContent = context.Request.Content as ObjectContent;
                //    var Requestdata = objectRequestContent?.Value;

                //    var objectResponseContent = context.Response.Content as ObjectContent;
                //    var Responsedata = objectResponseContent?.Value;
                //}

                object beginTime = null;
                string actionName = context.ActionContext.ActionDescriptor.ActionName;
                string controllerName = context.ActionContext.ActionDescriptor.ControllerDescriptor.ControllerName;
                if (context.Request.Properties.TryGetValue(key, out beginTime))
                {
                    try
                    {
                        DateTime time = DateTime.FromBinary(Convert.ToInt64(beginTime));
                        HttpRequest request = HttpContext.Current.Request;
                        #region 改到Service處理

                        MainLog mainLog = new MainLog
                        {
                            QDept = "34",    //單位
                            QMan = "12345",  //人事五碼
                            QTime = time,    // request 開始時間
                            QIp = request.UserHostAddress.Replace("::1", "127.0.0.1"), //用戶 ip
                            QSystemCode = "A77889",        //系統代碼,後續再提供
                            QCaseName = "12345",           //案號或案名 
                            QManClient = "12345",          //委託查詢  可能是別的用戶代查之類..
                            QItem = GetRequestValues(context),  //請求內容
                            QContent = GetResponseValues(context), //回覆內容
                            QDataTime = (DateTime.Now - time).TotalMilliseconds,  //從request 到 Response 花費多少毫秒
                            QPrint = "0",                                         // 測試:0 / 正式1
                            //  CreateTime = DateTime.Now,
                            ActionName = context.ActionContext.ActionDescriptor.ActionName,  //Controller 內 Action 名稱 後續需要建立功能對照表
                            ControllerName = context.ActionContext.ActionDescriptor.ControllerDescriptor.ControllerName,  //Controller 名稱
                            UserAgent = request.UserAgent,
                            Browser = request.Browser.Browser + " - " + request.Browser.Version + " - " + request.Browser.Type,  //瀏覽器版本資訊
                            RequestUri = request.Url.AbsoluteUri,
                            Paramaters = request.Url.Query,
                            Qmemo = ""  //JsonConvert.SerializeObject(context.Request.requestdata ?? ""),  // 註記

                        };
                        _mainLogService.Insert(mainLog);

                        #endregion
                    }
                    catch (Exception ex)
                    {

                    }
                }
            }
        }

        public string GetRequestValues(HttpActionExecutedContext actionExecutedContext)
        {
            /* 2022/09/01 改用ReadAsStringAsync 
            Stream stream = actionExecutedContext.Request.Content.ReadAsStreamAsync().Result;
            Encoding encoding = Encoding.UTF8;
            var reader = new StreamReader(stream, encoding);
            string result = reader.ReadToEnd();
            stream.Position = 0;
            return result;

                            var objectRequestContent = actionExecutedContext.Request.Content as ObjectContent;
                var Requestdata = objectRequestContent?.Value;
           */

            string ActionContextresult = String.Empty;
            string result = actionExecutedContext.Request.Content.ReadAsStringAsync().Result;
            if (!string.IsNullOrEmpty(result))
                return result;
            else {
                var list = new List<string>();
                foreach (var item in actionExecutedContext.ActionContext.ActionArguments)
                {
                    byte[] utf8bytesJson = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(item.Value));   //JsonSerializer.SerializeToUtf8Bytes(dept);
                    string strResult = System.Text.Encoding.UTF8.GetString(utf8bytesJson);
                    list.Add(strResult);
                }
                ActionContextresult = String.Join("\n", list.ToArray());
                return ActionContextresult;

            }
        }
        /// <summary>
        /// stream 如果直接用,後面會出錯
        /// </summary>
        /// <param name="actionExecutedContext"></param>
        /// <returns></returns>
        public string GetResponseValues(HttpActionExecutedContext actionExecutedContext)
        {
            if (actionExecutedContext.Response == null) return "Response == null"; //actionExecutedContext.Response.StatusCode.ToString()
            if (actionExecutedContext.Response.Content == null) return actionExecutedContext.Response.StatusCode.ToString();
            try
            {
                Stream stream = actionExecutedContext.Response.Content.ReadAsStreamAsync().Result;
                Encoding encoding = Encoding.UTF8;
                var reader = new StreamReader(stream, encoding);
                string result = reader.ReadToEnd();
                stream.Position = 0;
                return result;

            }
            catch (Exception)
            {
                return actionExecutedContext.Response.StatusCode.ToString();
            }
        }
    }
}