import { AdminHttpRequestError, BankTransactionAPI } from '@app/apis/admin';
import { AppState } from '@app/store';
import { Alert } from '@modules/alert';
import { genSpinnerId, hideSpinnerActionCreator, showSpinnerActionCreator } from '@modules/spinner';
import { useReducer } from 'react';
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import {
  ActionType,
  FetchBankTransactionsAction,
  fetchBankTransactionsFailureActionCreator,
  fetchBankTransactionsSuccessActionCreator,
  InitPageAction,
  ExportExcelAction,
  ParseCsvAction,
  ExportOdsAction,
  fetchBankTransactionsActionCreator,
} from '../actions';
import { bankTransactionPageReducer, BankTransactionPageReduxState } from '../reducer';

/** 初始頁面 */
function* initPage(action: InitPageAction) {}

/**
 * 取得開戶帳號
 * @param action FetchBankTransactionsAction
 */
function* fetchBankTransactions(action: FetchBankTransactionsAction) {
  const { params } = action.payload;

  try {
    // 取得帳號列表
    const response: BankTransactionAPI.FetchBankTransactionsResponse = yield call(
      BankTransactionAPI.fetchBankTransactions,
      params,
    );
    yield put(fetchBankTransactionsSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得開戶帳號發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
    yield put(fetchBankTransactionsFailureActionCreator());
  }
}

/**
 * 匯出excel
 * @param action exportBankTransactionsExcel
 */
function* exportBankTransactionsExcel(action: ExportExcelAction) {
  const { params } = action.payload;

  try {
    const response: BankTransactionAPI.FetchBankTransactionsResponse = yield call(
      BankTransactionAPI.downloadBankTransactionExcel,
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
function* exportBankTransactionsOds(action: ExportOdsAction) {
  const { params } = action.payload;

  try {
    const response: BankTransactionAPI.FetchBankTransactionsResponse = yield call(
      BankTransactionAPI.downloadBankTransactionOds,
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

function* importBankTransactionsCsv(action: ParseCsvAction) {
  const { params } = action.payload;
  try {
    yield call(BankTransactionAPI.fetchParseExcel, params);
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

/** BankTransactionPage RootSaga */
export function* bankTransactionPageRootSaga() {
  yield all([
    takeEvery(ActionType.INIT_PAGE, initPage),
    takeEvery(ActionType.FETCH_BANKTRANSACTIONS, fetchBankTransactions),
    takeEvery(ActionType.EXPORT_EXCEL, exportBankTransactionsExcel),
    takeEvery(ActionType.EXPORT_ODS, exportBankTransactionsOds),
    takeEvery(ActionType.PARSE_CSV, importBankTransactionsCsv),
  ]);
}
