import { AdminHttpRequestError, BankSafeDepositBoxsAPI } from '@app/apis/admin';
import { AppState } from '@app/store';
import { Alert } from '@modules/alert';
import { genSpinnerId, hideSpinnerActionCreator, showSpinnerActionCreator } from '@modules/spinner';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  ActionType,
  FetchBankSafeDepositBoxsAction,
  fetchBankSafeDepositBoxsFailureActionCreator,
  fetchBankSafeDepositBoxsSuccessActionCreator,
  InitPageAction,
  ExportExcelAction,
  ParseCsvAction,
  ExportOdsAction,
  IsAccountMarkAction,
  fetchBankSafeDepositBoxsActionCreator,
} from '../actions';
import { BankSafeDepositBoxPageReduxState } from '../reducer';

/** 初始頁面 */
function* initPage(action: InitPageAction) {}

/**
 * 取得黑名單帳號
 * @param action FetchBankSafeDepositBoxsAction
 */
function* fetchBankSafeDepositBoxs(action: FetchBankSafeDepositBoxsAction) {
  const { params } = action.payload;

  try {
    // 取得帳號列表
    const response: BankSafeDepositBoxsAPI.FetchBankSafeDepositBoxsResponse = yield call(
      BankSafeDepositBoxsAPI.fetchBankSafeDepositBoxs,
      params,
    );
    yield put(fetchBankSafeDepositBoxsSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得黑名單資料發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
    yield put(fetchBankSafeDepositBoxsFailureActionCreator());
  }
}

/**
 * 匯出excel
 * @param action exportBankSafeDepositBoxsExcel
 */
function* exportBankSafeDepositBoxsExcel(action: ExportExcelAction) {
  const { params } = action.payload;

  try {
    const response: BankSafeDepositBoxsAPI.FetchBankSafeDepositBoxsResponse = yield call(
      BankSafeDepositBoxsAPI.downloadBankSafeDepositBoxExcel,
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
function* exportBankSafeDepositBoxsOds(action: ExportOdsAction) {
  const { params } = action.payload;

  try {
    const response: BankSafeDepositBoxsAPI.FetchBankSafeDepositBoxsResponse = yield call(
      BankSafeDepositBoxsAPI.downloadBankSafeDepositBoxOds,
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

function* importBankSafeDepositBoxsCsv(action: ParseCsvAction) {
  const { params } = action.payload;
  try {
    yield call(BankSafeDepositBoxsAPI.fetchParseExcel, params);
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
  const getItems = (state: AppState) => state.pages.bankSafeDepositBox;

  const items: BankSafeDepositBoxPageReduxState = yield select(getItems);
  yield put(showSpinnerActionCreator(spinnerId));
  try {
    yield call(BankSafeDepositBoxsAPI.isAccountMark, seq, isAccountMark);
    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));
    yield put(fetchBankSafeDepositBoxsActionCreator(items.currentFetchBankSafeDepositBoxParams));
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

/** BankSafeDepositBoxPage RootSaga */
export function* bankSafeDepositBoxPageRootSaga() {
  yield all([
    takeEvery(ActionType.INIT_PAGE, initPage),
    takeEvery(ActionType.FETCH_BANKSAFEDEPOSITBOXS, fetchBankSafeDepositBoxs),
    takeEvery(ActionType.EXPORT_EXCEL, exportBankSafeDepositBoxsExcel),
    takeEvery(ActionType.EXPORT_ODS, exportBankSafeDepositBoxsOds),
    takeEvery(ActionType.PARSE_CSV, importBankSafeDepositBoxsCsv),
    takeEvery(ActionType.IS_ACCOUNT_MARK, isAccountMark),
  ]);
}
