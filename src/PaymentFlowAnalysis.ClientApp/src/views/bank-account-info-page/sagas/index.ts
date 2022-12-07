import { AdminHttpRequestError, BankAccountInfoAPI } from '@app/apis/admin';
import { AppState } from '@app/store';
import { Alert } from '@modules/alert';
import { genSpinnerId, hideSpinnerActionCreator, showSpinnerActionCreator } from '@modules/spinner';
import { useReducer } from 'react';
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import {
  ActionType,
  FetchBankAccountInfosAction,
  fetchBankAccountInfosFailureActionCreator,
  fetchBankAccountInfosSuccessActionCreator,
  InitPageAction,
  ExportExcelAction,
  ParseCsvAction,
  ExportOdsAction,
  IsAccountMarkAction,
  isAccountMarkSuccessActionCreator,
  fetchBankAccountInfosActionCreator,
} from '../actions';
import { bankAccountInfoPageReducer, BankAccountInfoPageReduxState } from '../reducer';

/** 初始頁面 */
function* initPage(action: InitPageAction) {}

/**
 * 取得開戶帳號
 * @param action FetchBankAccountInfosAction
 */
function* fetchBankAccountInfos(action: FetchBankAccountInfosAction) {
  const { params } = action.payload;

  try {
    // 取得帳號列表
    const response: BankAccountInfoAPI.FetchBankAccountInfosResponse = yield call(
      BankAccountInfoAPI.fetchBankAccountInfos,
      params,
    );
    yield put(fetchBankAccountInfosSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得開戶帳號發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
    yield put(fetchBankAccountInfosFailureActionCreator());
  }
}

/**
 * 匯出excel
 * @param action exportBankAccountInfosExcel
 */
function* exportBankAccountInfosExcel(action: ExportExcelAction) {
  const { params } = action.payload;

  try {
    const response: BankAccountInfoAPI.FetchBankAccountInfosResponse = yield call(
      BankAccountInfoAPI.downloadBankAccountInfoExcel,
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
function* exportBankAccountInfosOds(action: ExportOdsAction) {
  const { params } = action.payload;

  try {
    const response: BankAccountInfoAPI.FetchBankAccountInfosResponse = yield call(
      BankAccountInfoAPI.downloadBankAccountInfoOds,
      params,
    );
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

function* importBankAccountInfosCsv(action: ParseCsvAction) {
  const { params } = action.payload;
  try {
    yield call(BankAccountInfoAPI.fetchParseExcel, params);
    yield call(Alert.show, {
      type: Alert.AlertType.Success,
      title: '匯入資料成功',
      showCancelButton: false,
    });
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '匯入時發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
  }
}

function* isAccountMark(action: IsAccountMarkAction) {
  const { seq, isAccountMark } = action.payload;
  // 顯示 spinner
  const spinnerId = genSpinnerId();
  const getItems = (state: AppState) => state.pages.bankAccountInfo;

  const items: BankAccountInfoPageReduxState = yield select(getItems);
  yield put(showSpinnerActionCreator(spinnerId));
  try {
    yield call(BankAccountInfoAPI.isAccountMark, seq, isAccountMark);
    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));
    yield put(fetchBankAccountInfosActionCreator(items.currentFetchBankAccountInfoParams));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '轉換錯誤，請在試一次',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));
  }
}

/** BankAccountInfoPage RootSaga */
export function* bankAccountInfoPageRootSaga() {
  yield all([
    takeEvery(ActionType.INIT_PAGE, initPage),
    takeEvery(ActionType.FETCH_BANKACCOUNTINFOS, fetchBankAccountInfos),
    takeEvery(ActionType.EXPORT_EXCEL, exportBankAccountInfosExcel),
    takeEvery(ActionType.EXPORT_ODS, exportBankAccountInfosOds),
    takeEvery(ActionType.PARSE_CSV, importBankAccountInfosCsv),
    takeEvery(ActionType.IS_ACCOUNT_MARK, isAccountMark),
  ]);
}
