import { AdminHttpRequestError, BigTradesAPI } from '@app/apis/admin';
import { Alert } from '@modules/alert';
import { genSpinnerId, hideSpinnerActionCreator, showSpinnerActionCreator } from '@modules/spinner';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  ActionType,
  FetchBigTradesAction,
  fetchBigTradesFailureActionCreator,
  fetchBigTradesSuccessActionCreator,
  InitPageAction,
  ExportExcelAction,
  ParseXlsAction,
  ExportOdsAction,
} from '../actions';

/** 初始頁面 */
function* initPage(action: InitPageAction) {}

/**
 * 取得大額交易帳號
 * @param action FetchBigTradesAction
 */
function* fetchBigTrades(action: FetchBigTradesAction) {
  const { params } = action.payload;

  try {
    // 取得帳號列表
    const response: BigTradesAPI.FetchBigTradesResponse = yield call(BigTradesAPI.fetchBigTrades, params);
    yield put(fetchBigTradesSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得黑名單資料發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
    yield put(fetchBigTradesFailureActionCreator());
  }
}

/**
 * 匯出excel
 * @param action exportBigTradesExcel
 */
function* exportBigTradesExcel(action: ExportExcelAction) {
  const { params } = action.payload;

  try {
    const response: BigTradesAPI.FetchBigTradesResponse = yield call(BigTradesAPI.downloadBigTradeExcel, params);
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
function* exportBigTradesOds(action: ExportOdsAction) {
  const { params } = action.payload;

  try {
    const response: BigTradesAPI.FetchBigTradesResponse = yield call(BigTradesAPI.downloadBigTradeOds, params);
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

function* importBigTradesXls(action: ParseXlsAction) {
  const { params } = action.payload;
  try {
    yield call(BigTradesAPI.fetchParseExcel, params);
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

/** BigTradePage RootSaga */
export function* bigTradePageRootSaga() {
  yield all([
    takeEvery(ActionType.INIT_PAGE, initPage),
    takeEvery(ActionType.FETCH_BIGTRADES, fetchBigTrades),
    takeEvery(ActionType.EXPORT_EXCEL, exportBigTradesExcel),
    takeEvery(ActionType.EXPORT_ODS, exportBigTradesOds),
    takeEvery(ActionType.PARSE_XLS, importBigTradesXls),
  ]);
}
