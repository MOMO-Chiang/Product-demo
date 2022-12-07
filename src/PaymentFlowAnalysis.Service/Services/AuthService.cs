using Newtonsoft.Json;
using PaymentFlowAnalysis.Common.Constants;
using PaymentFlowAnalysis.Common.Securities;
using PaymentFlowAnalysis.Common.Utilities;
using PaymentFlowAnalysis.Core.DbConnectionFactory;
using PaymentFlowAnalysis.Core.Entities;
using PaymentFlowAnalysis.Core.Repositories;
using PaymentFlowAnalysis.Core.UnitOfWork;
using PaymentFlowAnalysis.Service.Models;
using PaymentFlowAnalysis.Service.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;

namespace PaymentFlowAnalysis.Service.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDbConnectionFactory _dbConnectionFactory;
        private static string SYSTEMCODE = ConfigurationManager.AppSettings["SYSTEMCODE"];
        private static string SYSTEMPWD = ConfigurationManager.AppSettings["SYSTEMPWD"];
        public AuthService(IUnitOfWork unitOfWork, IDbConnectionFactory dbConnectionFactory)
        {
            _unitOfWork = unitOfWork;
            _dbConnectionFactory = dbConnectionFactory;
        }

        public async Task<AuthLoginInfo> LoginSSO(string userId)
        {
            if (userId.StartsWith("m") || userId.StartsWith("M"))
            {
                userId = userId.Substring(1);
            }
            SysUserList sysUserList = _unitOfWork.SysUserListRepository.Get(userId);
            if (sysUserList != null && sysUserList.IsValid == false)
            {
                throw new OperationalException(
                    ErrorType.INSTANCE_NOT_FOUND,
                    $"帳號無效");
            }

            // 若使用者不存在, 建立一筆新的
            if (sysUserList == null)
            {
                ForPersonWebRepository forPersonWebRepository = new ForPersonWebRepository(_dbConnectionFactory, "PubInfoCenter");
                ForPersonWeb forPersonWeb = forPersonWebRepository.Get(userId);

                sysUserList = new SysUserList
                {
                    UserId = userId,
                    UnitCode = forPersonWeb?.Unit,
                    UnitName = forPersonWeb?.Unitn,
                    OrderUserName = forPersonWeb?.Name,
                    OrderUserRank = "調查官",
                    OrderUserUnit = forPersonWeb?.Unitn,
                    IsValid = true, // 新資料預設為true
                    //OrderUserEmail = "",
                    //OrderUserPhone = "",
                    //OrderUserProjectCategory = "",
                    //CreateTime = DateTime.Now,
                    //UpdateUserId = "",
                    //UpdateUserName = "",
                    //UpdateTime = null,
                };
                _unitOfWork.SysUserListRepository.Insert(sysUserList);
            }

            AuthorizationCertificate certificate = await CreateToken(userId, sysUserList.OrderUserName, sysUserList.UnitCode);
            Permission permission = GetUserPermission();
            //List<UserFile> userFiles = _userFileService.GetByHandManId(userId).ToList();
            AuthLoginInfo authLoginInfo = new AuthLoginInfo
            {
                Token = certificate.Token,
                Expires = (long)certificate.Expires * 1000, // JavaScript 時間戳為 13 位數，C# 只有 10 碼，故乘以 1000。
                UserInfo = new AuthLoginUserInfo
                {
                    Uid = certificate.UserId,
                    Username = certificate.Username,
                },
                Permissions = permission,
                //UserFiles = userFiles,
            };

            return authLoginInfo;
        }

        public async Task<AuthLoginInfo> LoginAD(string account, string password)
        {
            SysUserList sysUserList = _unitOfWork.SysUserListRepository.Get(account);
            if (sysUserList == null)
            {
                throw new OperationalException(
                    ErrorType.INSTANCE_NOT_FOUND,
                    $"帳號或密碼錯誤");
            }
            // TODO: 加密碼欄位
            //if (sysUserList.password != password)
            //{
            //    throw new OperationalException(
            //        ErrorType.INVALID_REQUEST_PARAMETERS,
            //        $"帳號或密碼錯誤");
            //}

            AuthorizationCertificate certificate = await CreateToken(account, sysUserList.OrderUserName, sysUserList.UnitCode);
            Permission permission = GetUserPermission();
            //List<UserFile> userFiles = _userFileService.GetByHandManId(userId).ToList();
            AuthLoginInfo authLoginInfo = new AuthLoginInfo
            {
                Token = certificate.Token,
                Expires = (long)certificate.Expires * 1000, // JavaScript 時間戳為 13 位數，C# 只有 10 碼，故乘以 1000。
                UserInfo = new AuthLoginUserInfo
                {
                    Uid = certificate.UserId,
                    Username = certificate.Username,
                },
                Permissions = permission,
                //UserFiles = userFiles,
            };

            return authLoginInfo;
        }

        private async Task<AuthorizationCertificate> CreateToken(string userId, string userName, string unitId)
        {
            // Auth Server 取得token
            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(30);
                var content = new
                {
                    SystemCode = SYSTEMCODE,
                    SystemPWD = SYSTEMPWD,
                    PersonId = userId,
                    UnitId = unitId,
                    Today = 123456,
                    Payload = new { },
                };
                var postData = new
                {
                    EncryptText = RSAEncoder.Encrypt(JsonConvert.SerializeObject(content)),
                };
                
                string url = ConfigurationManager.AppSettings["AuthServerURL"];
                StringContent stringContent = new StringContent(new JavaScriptSerializer().Serialize(postData), Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PostAsync(url, stringContent).ConfigureAwait(false);
                response.EnsureSuccessStatusCode();
                string responseStr = await response.Content.ReadAsStringAsync();

                var ret = JsonConvert.DeserializeObject<dynamic>(responseStr);
                var result = new AuthorizationCertificate
                {
                    Token = ret.access_token,
                    RefreshToken = ret.refresh_token,
                    Expires = ret.expires_in,
                    UserId = userId,
                    Username = userName,
                };

                return result;
            }
        }

        private Permission GetUserPermission()
        {
            return new Permission
            {
                SysUserListManagement = true,
                BankAccountInfoManagement = true,
                CryptoWallertInfoReceiveManagement = true,
                BlackAccountManagement = true,
                BankSafeDepositBoxManagement = true,
                BigTradeManagement = true,
                BankTransactionManagement = true,
                CryptoQueryManagement = true,
            };
        }

        public bool TryValidateTokenSystemCode(string token)
        {
            string systemCode = JwtManager.GetSystemCode(token);

            return SYSTEMCODE == systemCode;
        }
    }
}
