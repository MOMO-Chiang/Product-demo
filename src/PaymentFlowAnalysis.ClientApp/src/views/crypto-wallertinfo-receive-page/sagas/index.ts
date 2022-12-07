import { AdminHttpRequestError, CryptoWallertInfoReceiveAPI } from '@app/apis/admin';
import { Alert } from '@modules/alert';
import { genSpinnerId, hideSpinnerActionCreator, showSpinnerActionCreator } from '@modules/spinner';
import { SelectOptionConfig } from '@shared/types';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  ActionType,
  FetchCryptoWallertInfoReceivesAction,
  fetchCryptoWallertInfoReceivesFailureActionCreator,
  fetchCryptoWallertInfoReceivesSuccessActionCreator,
  InitPageAction,
  ExportExcelAction,
  initPageSuccessActionCreator,
  ExportOdsAction,
} from '../actions';

/** 初始頁面 */
function* initPage(action: InitPageAction) {
  const ExchangeTypeCodeOptions: SelectOptionConfig[] = yield call(CryptoWallertInfoReceiveAPI.fetchExchangeTypeCodeOptions);
  yield put(
    initPageSuccessActionCreator({
      ExchangeTypeCodeOptions,
    }),
  );
}

/**
 * 取得定期接收帳戶資料
 * @param action FetchCryptoWallertInfoReceivesAction
 */
function* fetchCryptoWallertInfoReceives(action: FetchCryptoWallertInfoReceivesAction) {
  const { params } = action.payload;

  try {
    // 取得定期接收帳戶資料列表
    const response: CryptoWallertInfoReceiveAPI.FetchCryptoWallertInfoReceivesResponse = yield call(
      CryptoWallertInfoReceiveAPI.fetchCryptoWallertInfoReceives,
      params,
    );
    yield put(fetchCryptoWallertInfoReceivesSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得定期接收帳戶資料發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
    yield put(fetchCryptoWallertInfoReceivesFailureActionCreator());
  }
}

/**
 * 匯出excel
 * @param action exportCryptoWallertInfoReceivesExcel
 */
function* exportCryptoWallertInfoReceivesExcel(action: ExportExcelAction) {
  const { params } = action.payload;

  try {
    const response: CryptoWallertInfoReceiveAPI.FetchCryptoWallertInfoReceivesResponse = yield call(
      CryptoWallertInfoReceiveAPI.downloadCryptoWallertInfoReceiveExcel,
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
function* exportCryptoWallertInfoReceivesOds(action: ExportOdsAction) {
  const { params } = action.payload;

  try {
    const response: CryptoWallertInfoReceiveAPI.FetchCryptoWallertInfoReceivesResponse = yield call(
      CryptoWallertInfoReceiveAPI.downloadCryptoWallertInfoReceiveOds,
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

/** CryptoWallertInfoReceivePage RootSaga */
export function* cryptoWallertInfoReceiveRootSaga() {
  yield all([
    takeEvery(ActionType.INIT_PAGE, initPage),
    takeEvery(ActionType.FETCH_CRYPTOWALLERTINFORECEIVES, fetchCryptoWallertInfoReceives),
    takeEvery(ActionType.EXPORT_EXCEL, exportCryptoWallertInfoReceivesExcel),
    takeEvery(ActionType.EXPORT_ODS, exportCryptoWallertInfoReceivesOds),
  ]);
}
