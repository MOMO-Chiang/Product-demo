import { AdminHttpRequestError, CryptoQueryAPI } from '@app/apis/admin';
import { Alert } from '@modules/alert';
import { genSpinnerId, hideSpinnerActionCreator, showSpinnerActionCreator } from '@modules/spinner';
import { SelectOptionConfig } from '@shared/types';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  ActionType,
  FetchCryptoQuerysAction,
  fetchCryptoQuerysFailureActionCreator,
  fetchCryptoQuerysSuccessActionCreator,
  InitPageAction,
  ExportExcelAction,
  initPageSuccessActionCreator,
  ExportOdsAction,
} from '../actions';

/** 初始頁面 */
function* initPage(action: InitPageAction) {
  const ExchangeTypeCodeOptions: SelectOptionConfig[] = yield call(CryptoQueryAPI.fetchExchangeTypeCodeOptions);
  const QueryConditionCodeOptions: SelectOptionConfig[] = yield call(CryptoQueryAPI.fetchConditionTypeCodeOptions);
  yield put(
    initPageSuccessActionCreator({
      ExchangeTypeCodeOptions,
      QueryConditionCodeOptions,
    }),
  );
}

/**
 * 取得定期接收帳戶資料
 * @param action FetchCryptoQuerysAction
 */
function* fetchCryptoQuerys(action: FetchCryptoQuerysAction) {
  const { params } = action.payload;

  try {
    // 取得定期接收帳戶資料列表
    const response: CryptoQueryAPI.FetchCryptoQuerysResponse = yield call(CryptoQueryAPI.fetchCryptoQuerys, params);
    yield put(fetchCryptoQuerysSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得定期接收帳戶資料發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
    yield put(fetchCryptoQuerysFailureActionCreator());
  }
}

/**
 * 匯出excel
 * @param action exportCryptoQuerysExcel
 */
function* exportCryptoQuerysExcel(action: ExportExcelAction) {
  const { params } = action.payload;

  try {
    const response: CryptoQueryAPI.FetchCryptoQuerysResponse = yield call(CryptoQueryAPI.downloadCryptoQueryExcel, params);
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
 * @param action exportCryptoQuerysExcel
 */
function* exportCryptoQuerysOds(action: ExportOdsAction) {
  const { params } = action.payload;

  try {
    const response: CryptoQueryAPI.FetchCryptoQuerysResponse = yield call(CryptoQueryAPI.downloadCryptoQueryOds, params);
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

/** CryptoQueryPage RootSaga */
export function* cryptoQueryRootSaga() {
  yield all([
    takeEvery(ActionType.INIT_PAGE, initPage),
    takeEvery(ActionType.FETCH_CRYPTOQUERYS, fetchCryptoQuerys),
    takeEvery(ActionType.EXPORT_EXCEL, exportCryptoQuerysExcel),
    takeEvery(ActionType.EXPORT_ODS, exportCryptoQuerysOds),
  ]);
}
