using PaymentFlowAnalysis.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentFlowAnalysis.Service.Models
{
    public class AuthLoginInfo
    {
        /// <summary>
        /// Token
        /// </summary>
        public string Token { get; set; }

        /// <summary>
        /// 到期時間戳 (13碼)
        /// </summary>
        public long Expires { get; set; }

        /// <summary>
        /// 登入使用者資料
        /// </summary>
        public AuthLoginUserInfo UserInfo { get; set; }

        /// <summary>
        /// 使用者權限
        /// </summary>
        public Permission Permissions { get; set; }

        //public List<UserFile> UserFiles { get; set; }
    }

    public class AuthLoginUserInfo
    {
        /// <summary>
        /// 登入者 id
        /// </summary>
        public string Uid { get; set; }

        /// <summary>
        /// 登入者姓名
        /// </summary>
        public string Username { get; set; }
    }

    public class Permission
    {
        /// <summary>
        /// 帳號管理
        /// </summary>
        public bool SysUserListManagement { get; set; }

        /// <summary>
        /// 開戶帳號
        /// </summary>
        public bool BankAccountInfoManagement { get; set; }

        /// <summary>
        /// 定期資料交換
        /// </summary>
        public bool CryptoWallertInfoReceiveManagement { get; set; }

        /// <summary>
        /// 黑名單
        /// </summary>
        public bool BlackAccountManagement { get; set; }

        /// <summary>
        /// 保險箱帳號
        /// </summary>
        public bool BankSafeDepositBoxManagement { get; set; }

        /// <summary>
        /// 大額交易
        /// </summary>
        public bool BigTradeManagement { get; set; }

        /// <summary>
        /// 交易明細
        /// </summary>
        public bool BankTransactionManagement { get; set; }

        /// <summary>
        /// 使用者資料調閱
        /// </summary>
        public bool CryptoQueryManagement { get; set; }
    }
}
