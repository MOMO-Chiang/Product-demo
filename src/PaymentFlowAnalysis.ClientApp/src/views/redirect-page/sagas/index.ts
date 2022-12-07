import { AdminHttpRequestError, AuthAPI } from '@app/apis/admin';
import { Alert } from '@modules/alert';
import { genSpinnerId, hideSpinnerActionCreator, showSpinnerActionCreator } from '@modules/spinner';
import { AuthLoginInfo } from '@shared/types';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  ActionType,
  InitPageAction,
  LoginADAction,
  loginADFailureActionCreator,
  loginADSuccessActionCreator,
} from '../actions';
import * as Auth from '@shared/auth';
import { REFERRER_WHITELIST } from '@shared/constants';

/** 初始頁面 */
function* initPage(action: InitPageAction) {}

/** 登入 */
function* loginAD(action: LoginADAction) {
  // 驗證來源
  if (!REFERRER_WHITELIST.some((s) => s === document.referrer)) {
    yield put(loginADFailureActionCreator());
    return;
  }

  const params = new URL(window.location.href).searchParams;
  if (!params.has('id') || !params.has('unitid')) {
    yield put(loginADFailureActionCreator());
    return;
  }

  const userId = params.get('id') as string;
  const unitId = params.get('unitid') as string;

  // 顯示 spinner
  const spinnerId = genSpinnerId();
  yield put(showSpinnerActionCreator(spinnerId));

  try {
    // 呼叫登入 API
    const loginInfo: AuthLoginInfo = yield call(AuthAPI.loginSSO, userId, unitId);

    // 將 登入資訊 存到 LocalStorage
    Auth.setLoginInfo(loginInfo);

    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));

    yield put(loginADSuccessActionCreator());
  } catch (error) {
    const err = error as AdminHttpRequestError;

    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));

    // 顯示錯誤訊息
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '驗證失敗',
      text: `[${err.status}]\n${err.message}`,
      showCancelButton: false,
    });

    yield put(loginADFailureActionCreator());
  }
}

/** RedirectPage RootSaga */
export function* redirectPageRootSaga() {
  yield all([takeEvery(ActionType.INIT_PAGE, initPage), takeEvery(ActionType.LOGINAD, loginAD)]);
}
