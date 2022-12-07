import { AdminHttpRequestError, RelevantCryptoPersonalInfoAPI } from '@app/apis/admin';
import { AppState } from '@app/store';
import { Alert } from '@modules/alert';
import { genSpinnerId, hideSpinnerActionCreator, showSpinnerActionCreator } from '@modules/spinner';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  ActionType,
  FetchOrderNumberListAction,
  fetchOrderNumberListFailureActionCreator,
  fetchOrderNumberListSuccessActionCreator,
  fetchCreateWallerAddressSearchAction,
  fetchCreateWallerAddressSearchFailureActionCreator,
  fetchCreateWallerAddressSearchSuccessActionCreator,
  InitPageAction,
  FetchHistoryOrderNumberListAction,
  fetchHistoryOrderNumberListSuccessActionCreator,
  fetchHistoryOrderNumberListFailureActionCreator,
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
  ExportExcelAction,
  ExportOdsAction,
} from '../actions';
import { RelevantCryptoPersonalInfoReduxState } from '../reducer';

/** 初始頁面 */
function* initPage(action: InitPageAction) {}

/**
 * 取得相關帳戶調閱資料
 * @param action FetchOrderNumberListAction
 */
function* fetchOrderNumberList(action: FetchOrderNumberListAction) {
  const { params } = action.payload;

  try {
    // 取得相關帳戶調閱單號列表

    const response: RelevantCryptoPersonalInfoAPI.FetchOrderNumberListResponse = yield call(
      RelevantCryptoPersonalInfoAPI.fetchOrderNumberList,
      params,
    );
    yield put(fetchOrderNumberListSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得相關帳戶調閱資料發生錯誤',
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
    const response: RelevantCryptoPersonalInfoAPI.FetchOrderNumberListResponse = yield call(
      RelevantCryptoPersonalInfoAPI.fetchHistoryOrderNumberList,
      params,
    );
    yield put(fetchHistoryOrderNumberListSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得歷史相關帳戶調閱資料發生錯誤',
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
function* createSearch(action: fetchCreateWallerAddressSearchAction) {
  const { params } = action.payload;

  try {
    const response: RelevantCryptoPersonalInfoAPI.CreateSearchResponse = yield call(
      RelevantCryptoPersonalInfoAPI.createSearch,
      params,
    );
    yield put(fetchCreateWallerAddressSearchSuccessActionCreator(response));
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
    yield put(fetchCreateWallerAddressSearchFailureActionCreator());
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
    const response: RelevantCryptoPersonalInfoAPI.FetchPhoneShowModalResponse = yield call(
      RelevantCryptoPersonalInfoAPI.getPhoneShowModal,
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
    const response: RelevantCryptoPersonalInfoAPI.FetchWallerAddressShowModalResponse = yield call(
      RelevantCryptoPersonalInfoAPI.getWallerAddressShowModal,
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
    const response: RelevantCryptoPersonalInfoAPI.FetchIPShowModalResponse = yield call(
      RelevantCryptoPersonalInfoAPI.getIPShowModal,
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
 * 取得IP彈窗資料
 * @param action FetchBlackCasesAction
 */
function* getPictureShowModal(action: ShowPictureModalAction) {
  const { PersonalInfoId, params } = action.payload;
  try {
    // 取得Picture列表
    const response: RelevantCryptoPersonalInfoAPI.FetchPictureShowModalResponse = yield call(
      RelevantCryptoPersonalInfoAPI.getPictureShowModal,
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
    // 取得錢包列表
    const response: RelevantCryptoPersonalInfoAPI.FetchDetailNumberShowModalResponse = yield call(
      RelevantCryptoPersonalInfoAPI.getDetailNumberShowModal,
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
  const getItems = (state: AppState) => state.pages.RelevantCryptoPersonalInfo;

  const items: RelevantCryptoPersonalInfoReduxState = yield select(getItems);
  yield put(showSpinnerActionCreator(spinnerId));
  try {
    yield call(RelevantCryptoPersonalInfoAPI.isCaseMark, personalInfoId, isCaseMark);
    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));
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
    yield call(RelevantCryptoPersonalInfoAPI.downloadOrderNumberListExcel, params);
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
    yield call(RelevantCryptoPersonalInfoAPI.downloadOrderNumberListOds, params);
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
export function* relevantCryptoPersonalInfoPageRootSaga() {
  yield all([
    takeEvery(ActionType.INIT_PAGE, initPage),
    takeEvery(ActionType.FETCH_ORDERNUMBERLIST, fetchOrderNumberList),
    takeEvery(ActionType.FETCH_HISTORYORDERNUMBERLIST, fetchHistoryOrderNumberList),
    takeEvery(ActionType.FETCH_CREATEWALLERADDRESSSEARCH, createSearch),
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
