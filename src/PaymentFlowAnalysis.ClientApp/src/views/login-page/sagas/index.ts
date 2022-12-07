import { AdminHttpRequestError, AuthAPI } from '@app/apis/admin';
import { Alert } from '@modules/alert';
import { genSpinnerId, hideSpinnerActionCreator, showSpinnerActionCreator } from '@modules/spinner';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  ActionType,
  InitPageAction,
  initPageSuccessActionCreator,
  LoginAction,
  loginFailureActionCreator,
  loginSuccessActionCreator,
} from '../actions';
import { AuthLoginInfo } from '@shared/types';
import * as Auth from '@shared/auth';

/** 初始頁面 */
function* initPage(action: InitPageAction) {
  /** 是否已登入 */
  const isLogged = Auth.checkIsLogged();

  // 未登入則清除登入資料
  if (!isLogged) {
    Auth.clearLoginInfo();
  }

  yield put(initPageSuccessActionCreator(isLogged));
}

/** 登入 */
function* login(action: LoginAction) {
  const { account, password } = action.payload;

  // 顯示 spinner
  const spinnerId = genSpinnerId();
  yield put(showSpinnerActionCreator(spinnerId));

  try {
    // 呼叫登入 API
    const loginInfo: AuthLoginInfo = yield call(AuthAPI.login, account, password);
    //const loginInfo: AuthLoginInfo = yield call(AuthAPI.login, account, password);

    // TODO: 實作權限
    // const loginInfo = {
    //   permissions: {
    //     sysUserListManagement: true,
    //     bankAccountInfoManagement: true,
    //     cryptoWallertInfoReceiveManagement: true,
    //     blackAccountManagement: true,
    //   },
    // T0033的token
    //   token:
    //     'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJTeXN0ZW1Db2RlIjoidGVzdCIsIlBlcnNvbklkIjoiVDAwMzMiLCJVbml0SWQiOiIzNCIsIlBheWxvYWQiOiJ7XCJVc2VyTmFtZVwiOlwi5piT5Yud5ris6KmmXCJ9IiwiUmVmcmVzaFRva2VuIjoiRVFEVVVMUzNUQUxQRVBGRTJYUU81UEI2N0xXWDhES01ZUUc3MWJjNWVhNS1kOWM5LTQyNDktYWVjZS0zZGY1YzI4MGIyMzkiLCJuYmYiOjE2NTk0MzIyOTYsImV4cCI6MTY3NDk4NDI5NiwiaWF0IjoxNjU5NDMyMjk2fQ.PCb7jQAAL4wtjuYnXmJkv2xjABzHI8UbZwVOvA2BAJN0DTy9L2-MCWToUbbxY158gpSQ2wpfWGQ4k6wo_WWvA7cWBediYmqUCSr7CFgruk4VCW_bX6m80Z7_RzsuhfGb1KC2IHfJkRGQdasuXnqYaQWkeIl7BGT5cR50oq4wQqyQankh-YxFJtv18WhL3L8kc1kkNDKWgg4hFG4o_dHvSs1Qo_TvyEH3bItxAx5q5l3ijaasv7ME42rYYj-xeQHKqoNptFHZZWkWFO-av3v5djMksIlUIK-2ciitiC59IzOp8WQsXC5mtmu_2XdzjNS83AvtfJCF4yif96G--6MdBA',
    //   expires: 1690604378000,
    //   userInfo: {
    //     uid: '',
    //     username: account,
    //   },
    // };

    // 將 登入資訊 存到 LocalStorage
    Auth.setLoginInfo(loginInfo);

    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));
    yield put(loginSuccessActionCreator());
  } catch (error) {
    const err = error as AdminHttpRequestError;

    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));

    // 顯示錯誤訊息
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '登入失敗',
      text: `[${err.status}]\n${err.message}`,
      showCancelButton: false,
    });

    yield put(loginFailureActionCreator());
  }
}

/** LoginPage RootSaga */
export function* loginPageRootSaga() {
  yield all([takeEvery(ActionType.INIT_PAGE, initPage), takeEvery(ActionType.LOGIN, login)]);
}
