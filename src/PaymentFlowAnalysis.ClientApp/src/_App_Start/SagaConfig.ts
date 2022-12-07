import { all, spawn } from 'redux-saga/effects';
import { loginPageRootSaga } from '@views/login-page';
import { sysUserListsPageRootSaga } from '@views/sys-userlists-page';
import { redirectPageRootSaga } from '@views/redirect-page';
import { bankAccountInfoPageRootSaga } from '@views/bank-account-info-page';
import { cryptoWallertInfoReceiveRootSaga } from '@views/crypto-wallertinfo-receive-page';
import { blackAccountsPageRootSaga } from '@views/black-account-page';
import { userFileSaga } from '@modules/userFileSelector';
import { cryptoPersonalInfoPageRootSaga } from '@views/crypto-personalnfo-page';
import { relevantCryptoPersonalInfoPageRootSaga } from '@views/relevantcrypto-personalinfo-page';
import { cryptoTransactionInfoPageRootSaga } from '@views/crypto-transactioninfo-page';
import { navbarMenuSaga } from '@modules/navbarMenu';
import { bankSafeDepositBoxPageRootSaga } from '@views/bank-safedeposit-box-page';
import { bigTradePageRootSaga } from '@views/big-trade-page';
import { bankTransactionPageRootSaga } from '@views/bank-transaction-page';
import { cryptoQueryRootSaga } from '@views/crypto-query-page';

const pageSagas = [
  spawn(loginPageRootSaga),

  spawn(sysUserListsPageRootSaga),
  spawn(bankAccountInfoPageRootSaga),

  spawn(cryptoWallertInfoReceiveRootSaga),
  spawn(blackAccountsPageRootSaga),
  spawn(redirectPageRootSaga),
  spawn(cryptoPersonalInfoPageRootSaga),
  spawn(relevantCryptoPersonalInfoPageRootSaga),
  spawn(cryptoTransactionInfoPageRootSaga),
  spawn(bankSafeDepositBoxPageRootSaga),
  spawn(bigTradePageRootSaga),
  spawn(bankTransactionPageRootSaga),
  spawn(cryptoQueryRootSaga),
];

const moduleSagas = [spawn(userFileSaga), spawn(navbarMenuSaga)];

export function* rootSaga() {
  yield all([...moduleSagas, ...pageSagas]);
}
