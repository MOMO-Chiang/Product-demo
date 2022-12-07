import React, { useEffect } from 'react';
import { Outlet, useRoutes, useNavigate } from 'react-router-dom';
import * as RouteConfig from './RouteConfig';
import * as Auth from '@shared/auth';
import { AdminLayout, MenuConfig } from '@views/admin-layout';
import { HomePage } from '@views/home';
import { LoginPage } from '@views/login-page';
import { AdminPermission } from '@shared/enums';
import { SysUserListsPage } from '@views/sys-userlists-page';
import { RedirectPage } from '@views/redirect-page';
import { BankAccountInfoListsPage } from '@views/bank-account-info-page';
import { CryptoWallertInfoReceivePage } from '@views/crypto-wallertinfo-receive-page';
import { BlackAccountsPage } from '@views/black-account-page';
import { CryptoPersonalInfoPage } from '@views/crypto-personalnfo-page';
import { RelevantCryptoPersonalInfoPage } from '@views/relevantcrypto-personalinfo-page';
import { CryptoTransactionInfoPage } from '@views/crypto-transactioninfo-page';
import { BankSafeDepositBoxPage } from '@views/bank-safedeposit-box-page';
import { BigTradePage } from '@views/big-trade-page';
import { BankTransactionPage } from '@views/bank-transaction-page';
import { CryptoQueryPage } from '@views/crypto-query-page';

/** Sidebar 頁籤設定 */
const MenuConfigs: MenuConfig[] = [
  {
    id: 'M01_F01',
    path: '',
    title: '虛擬貨幣交易所',
    subMenu: [
      {
        id: 'M01_F01_P02',
        path: RouteConfig.CRYPTO_PERSONAL_INFO,
        title: '個資資料調閱',
        permissionKey: AdminPermission.sysUserListManagement,
      },
      {
        id: 'M01_F01_P03',
        path: RouteConfig.RELEVANT_CRYPTO_PERSONAL_INFO,
        title: '相關帳戶個資調閱',
        permissionKey: AdminPermission.sysUserListManagement,
      },
      {
        id: 'M01_F01_P04',
        path: RouteConfig.CRYPTO_TRANSACTION_INFO,
        title: '交易資料調閱',
        permissionKey: AdminPermission.sysUserListManagement,
      },
    ],
  },
  {
    id: 'M01_F02',
    path: '',
    title: '金融機構資料',
    subMenu: [
      {
        id: 'M01_F02_P01',
        path: RouteConfig.BANK_ACCOUNT_INFO,
        title: '開戶資料',
        permissionKey: AdminPermission.bankAccountInfoManagement,
      },
      {
        id: 'M01_F02_P02',
        path: RouteConfig.BANK_TRANSACTION,
        title: '交易明細',
        permissionKey: AdminPermission.bankTransactionManagement,
      },
      {
        id: 'M01_F02_P03',
        path: RouteConfig.BANK_SAFEDEPOSIT_BOX,
        title: '保險箱資料',
        permissionKey: AdminPermission.bankSafeDepositBoxManagement,
      },
      {
        id: 'M01_F02_P04',
        path: RouteConfig.BIG_TRADE,
        title: '大額交易',
        permissionKey: AdminPermission.bigTradeManagement,
      },
    ],
  },
  {
    id: 'M01_F03',
    path: '',
    title: '資金流向關聯圖',
    subMenu: [],
  },
  {
    id: 'M01_F04',
    path: '',
    title: '系統管理員',
    subMenu: [
      {
        id: 'M01_F04_P01',
        path: RouteConfig.CRYPTO_WALLERTINFO_RECEIVE,
        title: '定期接收帳戶資料',
        permissionKey: AdminPermission.cryptoWallertInfoReceiveManagement,
      },
      {
        id: 'M01_F04_P02',
        path: RouteConfig.BLABK_ACCOUNT,
        title: '黑名單資料交換',
        permissionKey: AdminPermission.blackAccountManagement,
      },
      {
        id: 'M01_F04_P03',
        path: RouteConfig.SYS_USERLISTS,
        title: '使用者帳號管理',
        permissionKey: AdminPermission.sysUserListManagement,
      },
      {
        id: 'M01_F04_P04',
        path: RouteConfig.CRYPTO_QUERY,
        title: '使用者調閱紀錄',
        permissionKey: AdminPermission.cryptoQueryManagement,
      },
    ],
  },
];

/**
 * AdminLayout 元件
 */
const AdminLayoutOutlet: React.FC = () => (
  <AdminLayout menuConfigs={MenuConfigs}>
    <Outlet />
  </AdminLayout>
);

const requireAuth = (element: React.ReactNode, permissionKey?: keyof typeof AdminPermission) => {
  const RequireAuth: React.FC = () => {
    const navigate = useNavigate();

    const isLogged = Auth.checkIsLogged();
    const hasPermission = permissionKey ? Auth.checkHasPermissionByKey(permissionKey) : true;

    useEffect(() => {
      // 未登入，redirect to LoginPage
      if (!isLogged) {
        navigate(RouteConfig.LOGIN, { replace: true });
      }

      // 沒權限，redirect to HomePage
      if (!hasPermission) {
        navigate(RouteConfig.HOME, { replace: true });
      }
    }, []);

    return isLogged && hasPermission ? <>{element}</> : null;
  };

  return <RequireAuth />;
};

/**
 * 404 頁面元件
 *
 * TODO: 完善頁面內容
 */
const NotFound: React.FC = () => <div>404</div>;

/**
 * App Router 元件
 */
export const AppRouterComponent = () => {
  const element = useRoutes([
    {
      path: RouteConfig.LOGIN,
      element: <LoginPage />,
    },
    {
      path: RouteConfig.REDIRECT,
      element: <RedirectPage />,
    },
    {
      path: RouteConfig.ADMIN_BASE,
      element: <AdminLayoutOutlet />,
      children: [
        {
          path: RouteConfig.ADMIN_BASE,
          element: requireAuth(<CryptoPersonalInfoPage />),
        },
        /** 使用者帳號管理 */
        {
          path: RouteConfig.SYS_USERLISTS,
          element: requireAuth(<SysUserListsPage />, AdminPermission.sysUserListManagement),
        },
        /** 開戶帳號 */
        {
          path: RouteConfig.BANK_ACCOUNT_INFO,
          element: requireAuth(<BankAccountInfoListsPage />, AdminPermission.bankAccountInfoManagement),
        },
        /** 定期接收帳戶資料 */
        {
          path: RouteConfig.CRYPTO_WALLERTINFO_RECEIVE,
          element: requireAuth(<CryptoWallertInfoReceivePage />, AdminPermission.cryptoWallertInfoReceiveManagement),
        },
        /** 黑名單資料交換 */
        {
          path: RouteConfig.BLABK_ACCOUNT,
          element: requireAuth(<BlackAccountsPage />, AdminPermission.blackAccountManagement),
        },
        /** 個資資料調閱 */
        {
          path: RouteConfig.CRYPTO_PERSONAL_INFO,
          element: requireAuth(<CryptoPersonalInfoPage />),
        },
        /** 相關帳戶個資資料調閱 */
        {
          path: RouteConfig.RELEVANT_CRYPTO_PERSONAL_INFO,
          element: requireAuth(<RelevantCryptoPersonalInfoPage />),
        },
        /** 交易資料調閱 */
        {
          path: RouteConfig.CRYPTO_TRANSACTION_INFO,
          element: requireAuth(<CryptoTransactionInfoPage />),
        },
        /** 保險箱資料 */
        {
          path: RouteConfig.BANK_SAFEDEPOSIT_BOX,
          element: requireAuth(<BankSafeDepositBoxPage />, AdminPermission.bankSafeDepositBoxManagement),
        },

        /** 保險箱資料 */
        {
          path: RouteConfig.BIG_TRADE,
          element: requireAuth(<BigTradePage />, AdminPermission.bigTradeManagement),
        },

        /** 交易明細 */
        {
          path: RouteConfig.BANK_TRANSACTION,
          element: requireAuth(<BankTransactionPage />, AdminPermission.bankTransactionManagement),
        },

        /** 資料調閱 */
        {
          path: RouteConfig.CRYPTO_QUERY,
          element: requireAuth(<CryptoQueryPage />, AdminPermission.cryptoQueryManagement),
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return element;
};
