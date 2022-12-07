import { AdminHttpRequestError, CryptoPersonalInfoAPI } from '@app/apis/admin';
import { AppState } from '@app/store';
import { Alert } from '@modules/alert';
import { genSpinnerId, hideSpinnerActionCreator, showSpinnerActionCreator } from '@modules/spinner';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  ActionType,
  // FetchCryptoPersonalInfoAction,
  // fetchCryptoPersonalInfoFailureActionCreator,
  FetchOrderNumberListAction,
  fetchOrderNumberListFailureActionCreator,
  fetchOrderNumberListSuccessActionCreator,
  // fetchCryptoPersonalInfoSuccessActionCreator,
  InitPageAction,
  fetchCreatePersonalSearchAction,
  fetchCreatePersonalSearchFailureActionCreator,
  fetchCreatePersonalSearchSuccessActionCreator,
  FetchHistoryOrderNumberListAction,
  fetchHistoryOrderNumberListFailureActionCreator,
  fetchHistoryOrderNumberListSuccessActionCreator,
  ShowPhoneModalAction,
  showPhoneListSuccessActionCreator,
  ShowIPModalAction,
  ShowDetailNumberModalAction,
  showIPListSuccessActionCreator,
  ShowWallerAddressModalAction,
  showWallerAddressListSuccessActionCreator,
  showDetailNumberListSuccessActionCreator,
  ShowPictureModalAction,
  showPictureListSuccessActionCreator,
  IsCaseMarkAction,
  fetchOrderNumberListActionCreator,
  ExportExcelAction,
  ExportOdsAction,
} from '../actions';
import { CryptoPersonalInfoReduxState } from '../reducer';

/** 初始頁面 */
function* initPage(action: InitPageAction) {}

/**
 * 取得調閱主序號資料
 * @param action FetchOrderNumberListAction
 */
function* fetchOrderNumberList(action: FetchOrderNumberListAction) {
  const { params } = action.payload;

  try {
    // 取得調閱單號列表
    const response: CryptoPersonalInfoAPI.FetchOrderNumberListResponse = yield call(
      CryptoPersonalInfoAPI.fetchOrderNumberList,
      params,
    );
    yield put(fetchOrderNumberListSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得調閱主序號資料發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
    yield put(fetchOrderNumberListFailureActionCreator());
  }
}

/**
 * 取得歷史調閱主序號資料
 * @param action FetchOrderNumberListAction
 */
function* fetchHistoryOrderNumberList(action: FetchHistoryOrderNumberListAction) {
  const { params } = action.payload;

  try {
    // 取得調閱單號列表
    const response: CryptoPersonalInfoAPI.FetchOrderNumberListResponse = yield call(
      CryptoPersonalInfoAPI.fetchHistoryOrderNumberList,
      params,
    );
    yield put(fetchHistoryOrderNumberListSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得歷史調閱主序號資料發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
    yield put(fetchHistoryOrderNumberListFailureActionCreator());
  }
}

/**
 * 拋查
 * @param action FetchOrderNumberListAction
 */
function* createSearch(action: fetchCreatePersonalSearchAction) {
  const { params } = action.payload;

  try {
    // 取得調閱單號列表
    const response: CryptoPersonalInfoAPI.CreateSearchResponse = yield call(CryptoPersonalInfoAPI.createSearch, params);
    yield put(fetchCreatePersonalSearchSuccessActionCreator(response));

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
      title: '資料拋查發生錯誤發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
    yield put(fetchCreatePersonalSearchFailureActionCreator());
  }
}

/**
 * 取得電話彈窗資料
 * @param action FetchBlackCasesAction
 */
function* getPhoneShowModal(action: ShowPhoneModalAction) {
  const { PersonalInfoId, params } = action.payload;
  try {
    // 取得電話列表
    const response: CryptoPersonalInfoAPI.FetchPhoneShowModalResponse = yield call(
      CryptoPersonalInfoAPI.getPhoneShowModal,
      PersonalInfoId,
      'phone',
      params,
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
 * 取得錢包彈窗資料
 * @param action FetchBlackCasesAction
 */
function* getWallerAddressShowModal(action: ShowWallerAddressModalAction) {
  const { PersonalInfoId, params } = action.payload;
  try {
    // 取得錢包列表
    const response: CryptoPersonalInfoAPI.FetchWallerAddressShowModalResponse = yield call(
      CryptoPersonalInfoAPI.getWallerAddressShowModal,
      PersonalInfoId,
      'wallerAddress',
      params,
    );
    yield put(showWallerAddressListSuccessActionCreator(response));
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
 * 取得IP彈窗資料
 * @param action FetchBlackCasesAction
 */
function* getIPShowModal(action: ShowIPModalAction) {
  const { PersonalInfoId, params } = action.payload;
  try {
    // 取得IP列表
    const response: CryptoPersonalInfoAPI.FetchIPShowModalResponse = yield call(
      CryptoPersonalInfoAPI.getIPShowModal,
      PersonalInfoId,
      'ip',
      params,
    );
    yield put(showIPListSuccessActionCreator(response));
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
 * 取得照片彈窗資料
 * @param action FetchBlackCasesAction
 */
function* getPictureShowModal(action: ShowPictureModalAction) {
  const { PersonalInfoId, params } = action.payload;
  try {
    // 取得Picture列表
    const response: CryptoPersonalInfoAPI.FetchPictureShowModalResponse = yield call(
      CryptoPersonalInfoAPI.getPictureShowModal,
      PersonalInfoId,
      'picture',
      params,
    );
    yield put(showPictureListSuccessActionCreator(response));
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
 * 取得調閱單號彈窗資料
 * @param action ShowDetailNumberModalAction
 */
function* getDetailNumberShowModal(action: ShowDetailNumberModalAction) {
  const { Seq } = action.payload;
  try {
    // 取得調閱單號
    const response: CryptoPersonalInfoAPI.FetchDetailNumberShowModalResponse = yield call(
      CryptoPersonalInfoAPI.getDetailNumberShowModal,
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

/**
 * 本案相關查詢
 * @param action FetchBlackCasesAction
 */
function* isCaseMark(action: IsCaseMarkAction) {
  const { personalInfoId, isCaseMark } = action.payload;
  // 顯示 spinner
  const spinnerId = genSpinnerId();
  const getItems = (state: AppState) => state.pages.CryptoPersonalInfo;

  const items: CryptoPersonalInfoReduxState = yield select(getItems);
  yield put(showSpinnerActionCreator(spinnerId));
  try {
    yield call(CryptoPersonalInfoAPI.isCaseMark, personalInfoId, isCaseMark);
    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));
    //yield put(fetchOrderNumberListActionCreator(items.currentFetchOrderNumberListParams));
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

/**
 * 匯出excel
 * @param action exportBankAccountInfosExcel
 */
function* exportOrderNumberListExcel(action: ExportExcelAction) {
  const { params } = action.payload;

  // 顯示 spinner
  const spinnerId = genSpinnerId();
  yield put(showSpinnerActionCreator(spinnerId));

  try {
    yield call(CryptoPersonalInfoAPI.downloadOrderNumberListExcel, params);
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
function* exportOrderNumberListOds(action: ExportOdsAction) {
  const { params } = action.payload;

  // 顯示 spinner
  const spinnerId = genSpinnerId();
  yield put(showSpinnerActionCreator(spinnerId));

  try {
    yield call(CryptoPersonalInfoAPI.downloadOrderNumberListOds, params);
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

/** OrderNumberListPage RootSaga */
export function* cryptoPersonalInfoPageRootSaga() {
  yield all([
    takeEvery(ActionType.INIT_PAGE, initPage),
    takeEvery(ActionType.FETCH_ORDERNUMBERLIST, fetchOrderNumberList),
    takeEvery(ActionType.FETCH_HISTORYORDERNUMBERLIST, fetchHistoryOrderNumberList),
    takeEvery(ActionType.FETCH_CREATEPERSONALSEARCH, createSearch),
    takeEvery(ActionType.SHOW_PHONE_MODAL, getPhoneShowModal),
    takeEvery(ActionType.SHOW_WALLERADDRESS_MODAL, getWallerAddressShowModal),
    takeEvery(ActionType.SHOW_IP_MODAL, getIPShowModal),
    takeEvery(ActionType.SHOW_PICTURE_MODAL, getPictureShowModal),
    takeEvery(ActionType.SHOW_DETAILNUMBER_MODAL, getDetailNumberShowModal),
    takeEvery(ActionType.IS_CASE_MARK, isCaseMark),
    takeEvery(ActionType.EXPORT_EXCEL, exportOrderNumberListExcel),
    takeEvery(ActionType.EXPORT_ODS, exportOrderNumberListOds),
  ]);
}
