import { combineReducers } from 'redux';
import { routerReducer } from '@modules/router';
import { spinnerReducer } from '@modules/spinner';
import { homeModuleReducer } from '@views/home';
import { loginPageReducer } from '@views/login-page';
import { sysUserListsPageReducer } from '@views/sys-userlists-page';
import { CryptoPersonalInfoPageReducer } from '@views/crypto-personalnfo-page';
import { RelevantCryptoPersonalInfoPageReducer } from '@views/relevantcrypto-personalinfo-page';
import { CryptoTransactionInfoPageReducer } from '@views/crypto-transactioninfo-page';
import { redirectPageReducer } from '@views/redirect-page';
import { userFileReducer } from '@modules/userFileSelector';
import { bankAccountInfoPageReducer } from '@views/bank-account-info-page';
import { cryptoWallertInfoReceivePageReducer } from '@views/crypto-wallertinfo-receive-page';
import { blackAccountsPageReducer } from '@views/black-account-page';
import { navbarMenuReducer } from '@modules/navbarMenu';
import { bankSafeDepositBoxPageReducer } from '@views/bank-safedeposit-box-page';
import { bigTradePageReducer } from '@views/big-trade-page';
import { bankTransactionPageReducer } from '@views/bank-transaction-page';
import { cryptoQueryPageReducer } from '@views/crypto-query-page';

/** Pages Reducer */
const pagesReducer = combineReducers({
  home: homeModuleReducer,
  login: loginPageReducer,
  sysUserLists: sysUserListsPageReducer,
  CryptoPersonalInfo: CryptoPersonalInfoPageReducer,
  RelevantCryptoPersonalInfo: RelevantCryptoPersonalInfoPageReducer,
  CryptoTransactionInfo: CryptoTransactionInfoPageReducer,
  redirect: redirectPageReducer,
  bankAccountInfo: bankAccountInfoPageReducer,
  cryptoWallertInfoReceive: cryptoWallertInfoReceivePageReducer,
  blackAccounts: blackAccountsPageReducer,
  bankSafeDepositBox: bankSafeDepositBoxPageReducer,
  bigTrade: bigTradePageReducer,
  bankTransaction: bankTransactionPageReducer,
  cryptoQuery: cryptoQueryPageReducer,
});

/** Root Reducer */
export const rootReducer = combineReducers({
  pages: pagesReducer,
  router: routerReducer,
  spinner: spinnerReducer,
  userFile: userFileReducer,
  navbarMenu: navbarMenuReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
