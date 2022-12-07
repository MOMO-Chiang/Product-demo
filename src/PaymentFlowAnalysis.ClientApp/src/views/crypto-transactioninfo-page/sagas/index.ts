import { AdminHttpRequestError, CryptoTransactionInfoAPI } from '@app/apis/admin';
import { Alert } from '@modules/alert';
import { genSpinnerId, hideSpinnerActionCreator, showSpinnerActionCreator } from '@modules/spinner';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  ActionType,
  FetchCryptoTransactionInfosAction,
  fetchCryptoTransactionInfosSuccessActionCreator,
  fetchCryptoTransactionInfosFailureActionCreator,
  FetchCreateTransactionSearchAction,
  fetchCreateTransactionSearchSuccessActionCreator,
  fetchCreateTransactionSearchFailureActionCreator,
  InitPageAction,
  fetchHistoryCryptoTransactionInfosSuccessActionCreator,
  fetchHistoryCryptoTransactionInfosFailureActionCreator,
  ExportExcelAction,
  ExportOdsAction,
  ShowDetailNumberModalAction,
  showDetailNumberListSuccessActionCreator,
} from '../actions';

/** 初始頁面 */
function* initPage(action: InitPageAction) {}

/**
 * 取得交易調閱資料
 * @param action FetchCryptoTransactionInfoAction
 */
function* fetchCryptoTransactionInfos(action: FetchCryptoTransactionInfosAction) {
  const { params } = action.payload;

  try {
    // 取得交易調閱資料列表
    const response: CryptoTransactionInfoAPI.FetchCryptoTransactionInfosResponse = yield call(
      CryptoTransactionInfoAPI.fetchCryptoTransactionInfos,
      params,
    );
    yield put(fetchCryptoTransactionInfosSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得交易調閱資料發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
    yield put(fetchCryptoTransactionInfosFailureActionCreator());
  }
}

/**
 * 取得交易歷史調閱資料
 * @param action FetchCryptoTransactionInfoAction
 */
function* fetchHistoryCryptoTransactionInfos(action: FetchCryptoTransactionInfosAction) {
  const { params } = action.payload;

  try {
    // 取得交易歷史調閱資料列表
    const response: CryptoTransactionInfoAPI.FetchCryptoTransactionInfoHistoryResponse = yield call(
      CryptoTransactionInfoAPI.fetchHistoryCryptoTransactionInfos,
      params,
    );
    yield put(fetchHistoryCryptoTransactionInfosSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得交易歷史調閱資料發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
    yield put(fetchHistoryCryptoTransactionInfosFailureActionCreator());
  }
}

/**
 * 拋查
 * @param action FetchOrderNumberListAction
 */
function* createSearch(action: FetchCreateTransactionSearchAction) {
  const { params } = action.payload;

  try {
    // 取得調閱單號列表
    const response: CryptoTransactionInfoAPI.CreateSearchResponse = yield call(CryptoTransactionInfoAPI.createSearch, params);
    yield put(fetchCreateTransactionSearchSuccessActionCreator(response));
    // 顯示成功訊息
    yield call(Alert.show, {
      type: Alert.AlertType.Success,
      title: `${response}`,
      showCancelButton: false,
    });
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '資料拋查發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
    yield put(fetchCreateTransactionSearchFailureActionCreator());
  }
}

/**
 * 匯出excel
 * @param action exportBankAccountInfosExcel
 */
function* exportCryptoTransactionInfoExcel(action: ExportExcelAction) {
  const { params } = action.payload;

  // 顯示 spinner
  const spinnerId = genSpinnerId();
  yield put(showSpinnerActionCreator(spinnerId));

  try {
    yield call(CryptoTransactionInfoAPI.downloadCryptoTransactionInfoExcel, params);
    yield put(hideSpinnerActionCreator(spinnerId));
  } catch (err) {
    yield put(hideSpinnerActionCreator(spinnerId));
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
 * 匯出Ods
 * @param action exportBankAccountInfosOds
 */
function* exportCryptoTransactionInfoOds(action: ExportOdsAction) {
  const { params } = action.payload;

  // 顯示 spinner
  const spinnerId = genSpinnerId();
  yield put(showSpinnerActionCreator(spinnerId));

  try {
    yield call(CryptoTransactionInfoAPI.downloadCryptoTransactionInfoOds, params);
    yield put(hideSpinnerActionCreator(spinnerId));
  } catch (err) {
    yield put(hideSpinnerActionCreator(spinnerId));
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
 * 取得調閱單號彈窗資料
 * @param action ShowDetailNumberModalAction
 */
function* getDetailNumberShowModal(action: ShowDetailNumberModalAction) {
  const { Seq } = action.payload;
  try {
    // 取得調閱單號
    const response: CryptoTransactionInfoAPI.FetchDetailNumberShowModalResponse = yield call(
      CryptoTransactionInfoAPI.getDetailNumberShowModal,
      Seq,
    );
    yield put(showDetailNumberListSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得調閱單號發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
  }
}

/** CryptoTransactionInfoPage RootSaga */
export function* cryptoTransactionInfoPageRootSaga() {
  yield all([
    takeEvery(ActionType.INIT_PAGE, initPage),
    takeEvery(ActionType.FETCH_CRYPTOTRANSACTIONINFOS, fetchCryptoTransactionInfos),
    takeEvery(ActionType.FETCH_CREATETRANSACTIONSEARCH, createSearch),
    takeEvery(ActionType.FETCH_HISTORYCRYPTOTRANSACTIONINFOS, fetchHistoryCryptoTransactionInfos),
    takeEvery(ActionType.EXPORT_EXCEL, exportCryptoTransactionInfoExcel),
    takeEvery(ActionType.EXPORT_ODS, exportCryptoTransactionInfoOds),
    takeEvery(ActionType.SHOW_DETAILNUMBER_MODAL, getDetailNumberShowModal),
  ]);
}
