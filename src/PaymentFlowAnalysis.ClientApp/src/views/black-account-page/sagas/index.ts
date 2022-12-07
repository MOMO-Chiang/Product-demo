import { AdminHttpRequestError, BlackAccountsAPI } from '@app/apis/admin';
import { Alert } from '@modules/alert';
import { genSpinnerId, hideSpinnerActionCreator, showSpinnerActionCreator } from '@modules/spinner';
import { SelectOptionConfig } from '@shared/types';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  ActionType,
  CreateBlackAccountAction,
  createBlackAccountFailureActionCreator,
  createBlackAccountSuccessActionCreator,
  ExportExcelAction,
  ExportOdsAction,
  FetchBlackAccountAction,
  fetchBlackAccountFailureActionCreator,
  FetchBlackAccountsAction,
  fetchBlackAccountsFailureActionCreator,
  fetchBlackAccountsSuccessActionCreator,
  fetchBlackAccountSuccessActionCreator,
  InitPageAction,
  initPageSuccessActionCreator,
  showEmailListSuccessActionCreator,
  ShowEmailModalAction,
  showIPListSuccessActionCreator,
  ShowIPModalAction,
  showPhoneListSuccessActionCreator,
  ShowPhoneModalAction,
  UpdateBlackAccountAction,
  updateBlackAccountFailureActionCreator,
  updateBlackAccountSuccessActionCreator,
} from '../actions';

/** 初始頁面 */
function* initPage(action: InitPageAction) {
  const RiskLevelOptions: SelectOptionConfig[] = yield call(BlackAccountsAPI.fetchRisklevelOptions);
  yield put(
    initPageSuccessActionCreator({
      RiskLevelOptions,
    }),
  );
}

/**
 * 取得帳號資料
 * @param action FetchBlackAccountsAction
 */
function* fetchBlackAccounts(action: FetchBlackAccountsAction) {
  const { params } = action.payload;

  try {
    // 取得帳號列表
    const response: BlackAccountsAPI.FetchBlackAccountsResponse = yield call(BlackAccountsAPI.fetchBlackAccounts, params);
    yield put(fetchBlackAccountsSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得黑名單資料發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
    yield put(fetchBlackAccountsFailureActionCreator());
  }
}

/**
 * 取得單一帳號資料
 * @param action FetchBlackAccountsAction
 */
function* fetchBlackAccount(action: FetchBlackAccountAction) {
  const { userId } = action.payload;

  try {
    // 取得帳號列表
    const response: BlackAccountsAPI.FetchBlackAccountResponse = yield call(BlackAccountsAPI.fetchBlackAccount, userId);
    yield put(fetchBlackAccountSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得黑名單資料發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
    yield put(fetchBlackAccountFailureActionCreator());
  }
}

/**
 * 新增帳號資料
 * @param action CreateBlackAccountAction
 */
function* createBlackAccount(action: CreateBlackAccountAction) {
  const { params } = action.payload;

  // 顯示 spinner
  const spinnerId = genSpinnerId();
  yield put(showSpinnerActionCreator(spinnerId));

  try {
    // 新增 BlackAccount
    yield call(BlackAccountsAPI.createBlackAccount, params);
    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));

    // 顯示成功訊息
    yield call(Alert.show, {
      type: Alert.AlertType.Success,
      title: '新增黑名單成功',
      showCancelButton: false,
    });

    yield put(createBlackAccountSuccessActionCreator());
  } catch (error) {
    const err = error as AdminHttpRequestError;

    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));

    // 顯示錯誤訊息
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '新增黑名單發生錯誤',
      text: `[${err.status}]\n${err.message}`,
      showCancelButton: false,
    });

    yield put(createBlackAccountFailureActionCreator());
  }
}

/**
 * 更新 BlackAccount 資料
 * @param action UpdateBlackAccountAction
 */
function* updateBlackAccount(action: UpdateBlackAccountAction) {
  const { userId, params } = action.payload;

  // 顯示 spinner
  const spinnerId = genSpinnerId();
  yield put(showSpinnerActionCreator(spinnerId));

  try {
    // 更新 BlackAccount
    yield call(BlackAccountsAPI.updateBlackAccount, userId, params);

    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));

    // 顯示成功訊息
    yield call(Alert.show, {
      type: Alert.AlertType.Success,
      title: '更新黑名單成功',
      showCancelButton: false,
    });

    yield put(updateBlackAccountSuccessActionCreator());
  } catch (error) {
    const err = error as AdminHttpRequestError;

    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));

    // 顯示錯誤訊息
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '更新黑名單發生錯誤',
      text: `[${err.status}]\n${err.message}`,
      showCancelButton: false,
    });

    yield put(updateBlackAccountFailureActionCreator());
  }
}

/**
 * 匯出excel
 * @param action exportCryptoWallertInfoReceivesExcel
 */
function* exportBlackAccountExcel(action: ExportExcelAction) {
  const { params } = action.payload;

  try {
    const response: BlackAccountsAPI.FetchBlackAccountsResponse = yield call(
      BlackAccountsAPI.downloadBlackAccountExcel,
      params,
    );
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '匯出excel發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
  }
}

/**
 * 匯出ods
 * @param action exportCryptoWallertInfoReceivesExcel
 */
function* exportBlackAccountOds(action: ExportOdsAction) {
  const { params } = action.payload;

  try {
    const response: BlackAccountsAPI.FetchBlackAccountsResponse = yield call(BlackAccountsAPI.downloadBlackAccountOds, params);
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '匯出ods發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
  }
}

/**
 * 取得電話彈窗資料
 * @param action FetchBlackAccountsAction
 */
function* getPhoneShowModal(action: ShowPhoneModalAction) {
  const { walletAddress } = action.payload;
  try {
    // 取得電話列表
    const response: BlackAccountsAPI.FetchPhoneShowModalResponse = yield call(
      BlackAccountsAPI.getPhoneShowModal,
      walletAddress,
      'phone',
    );
    yield put(showPhoneListSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得電話資料列表發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
  }
}

/**
 * 取得信箱彈窗資料
 * @param action FetchBlackAccountsAction
 */
function* getEmailShowModal(action: ShowEmailModalAction) {
  const { walletAddress } = action.payload;
  try {
    // 取得信箱列表
    const response: BlackAccountsAPI.FetchEmailShowModalResponse = yield call(
      BlackAccountsAPI.getEmailShowModal,
      walletAddress,
      'email',
    );
    yield put(showEmailListSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得信箱資料列表發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
  }
}

/**
 * 取得ip彈窗資料
 * @param action FetchBlackAccountsAction
 */
function* getIPShowModal(action: ShowIPModalAction) {
  const { walletAddress } = action.payload;
  try {
    // 取得ip列表
    const response: BlackAccountsAPI.FetchIPShowModalResponse = yield call(
      BlackAccountsAPI.getIPShowModal,
      walletAddress,
      'ip',
    );
    yield put(showIPListSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得ip資料列表發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
  }
}

/** BlackAccountsPage RootSaga */
export function* blackAccountsPageRootSaga() {
  yield all([
    takeEvery(ActionType.INIT_PAGE, initPage),
    takeEvery(ActionType.FETCH_BLACKACCOUNTS, fetchBlackAccounts),
    takeEvery(ActionType.FETCH_BLACKACCOUNT, fetchBlackAccount),
    takeEvery(ActionType.CREATE_BLACKACCOUNT, createBlackAccount),
    takeEvery(ActionType.UPDATE_BLACKACCOUNT, updateBlackAccount),
    takeEvery(ActionType.EXPORT_EXCEL, exportBlackAccountExcel),
    takeEvery(ActionType.EXPORT_ODS, exportBlackAccountOds),
    takeEvery(ActionType.SHOW_PHONE_MODAL, getPhoneShowModal),
    takeEvery(ActionType.SHOW_EMAIL_MODAL, getEmailShowModal),
    takeEvery(ActionType.SHOW_IP_MODAL, getIPShowModal),
  ]);
}
