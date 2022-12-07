import { AdminHttpRequestError, SysUserListsAPI } from '@app/apis/admin';
import { Alert } from '@modules/alert';
import { genSpinnerId, hideSpinnerActionCreator, showSpinnerActionCreator } from '@modules/spinner';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  ActionType,
  CreateSysUserListAction,
  createSysUserListFailureActionCreator,
  createSysUserListSuccessActionCreator,
  DeleteSysUserListAction,
  deleteSysUserListFailureActionCreator,
  deleteSysUserListSuccessActionCreator,
  FetchSysUserListAction,
  fetchSysUserListFailureActionCreator,
  FetchSysUserListsAction,
  fetchSysUserListsFailureActionCreator,
  fetchSysUserListsSuccessActionCreator,
  fetchSysUserListSuccessActionCreator,
  InitPageAction,
  UpdateSysUserListAction,
  updateSysUserListFailureActionCreator,
  updateSysUserListSuccessActionCreator,
} from '../actions';

/** 初始頁面 */
function* initPage(action: InitPageAction) {}

/**
 * 取得帳號資料
 * @param action FetchSysUserListsAction
 */
function* fetchSysUserLists(action: FetchSysUserListsAction) {
  const { params } = action.payload;

  try {
    // 取得帳號列表
    const response: SysUserListsAPI.FetchSysUserListsResponse = yield call(SysUserListsAPI.fetchSysUserLists, params);
    yield put(fetchSysUserListsSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得帳號資料發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
    yield put(fetchSysUserListsFailureActionCreator());
  }
}

/**
 * 取得單一帳號資料
 * @param action FetchSysUserListsAction
 */
function* fetchSysUserList(action: FetchSysUserListAction) {
  const { userId } = action.payload;

  try {
    // 取得帳號列表
    const response: SysUserListsAPI.FetchSysUserListResponse = yield call(SysUserListsAPI.fetchSysUserList, userId);
    yield put(fetchSysUserListSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得帳號資料發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
    yield put(fetchSysUserListFailureActionCreator());
  }
}

/**
 * 新增帳號資料
 * @param action CreateSysUserListAction
 */
function* createSysUserList(action: CreateSysUserListAction) {
  const { params } = action.payload;

  // 顯示 spinner
  const spinnerId = genSpinnerId();
  yield put(showSpinnerActionCreator(spinnerId));

  try {
    // 新增 SysUserList
    //yield call(SysUserListsAPI.createSysUserList, params);

    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));

    // 顯示成功訊息
    yield call(Alert.show, {
      type: Alert.AlertType.Success,
      title: '新增帳號資料成功',
      showCancelButton: false,
    });

    yield put(createSysUserListSuccessActionCreator());
  } catch (error) {
    const err = error as AdminHttpRequestError;

    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));

    // 顯示錯誤訊息
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '新增帳號資料發生錯誤',
      text: `[${err.status}]\n${err.message}`,
      showCancelButton: false,
    });

    yield put(createSysUserListFailureActionCreator());
  }
}

/**
 * 更新 SysUserList 資料
 * @param action UpdateSysUserListAction
 */
function* updateSysUserList(action: UpdateSysUserListAction) {
  const { userId, params } = action.payload;

  // 顯示 spinner
  const spinnerId = genSpinnerId();
  yield put(showSpinnerActionCreator(spinnerId));

  try {
    // 更新 SysUserList
    yield call(SysUserListsAPI.patchSysUserList, userId, params);

    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));

    // 顯示成功訊息
    yield call(Alert.show, {
      type: Alert.AlertType.Success,
      title: '更新帳號資料成功',
      showCancelButton: false,
    });

    yield put(updateSysUserListSuccessActionCreator());
  } catch (error) {
    const err = error as AdminHttpRequestError;

    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));

    // 顯示錯誤訊息
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '更新帳號資料發生錯誤',
      text: `[${err.status}]\n${err.message}`,
      showCancelButton: false,
    });

    yield put(updateSysUserListFailureActionCreator());
  }
}

/**
 * 刪除帳號資料
 * @param action DeleteSysUserListAction
 */
function* deleteSysUserList(action: DeleteSysUserListAction) {
  const { userId } = action.payload;

  // 顯示 spinner
  const spinnerId = genSpinnerId();
  yield put(showSpinnerActionCreator(spinnerId));

  try {
    //yield call(SysUserListsAPI.deleteSysUserList, userId);

    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));

    // 顯示成功訊息
    yield call(Alert.show, {
      type: Alert.AlertType.Success,
      title: '刪除成功',
      showCancelButton: false,
    });

    yield put(deleteSysUserListSuccessActionCreator());
  } catch (err) {
    const error = err as AdminHttpRequestError;

    // 關閉 spinner
    yield put(hideSpinnerActionCreator(spinnerId));

    // 顯示錯誤訊息
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '刪除帳號資料發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });

    yield put(deleteSysUserListFailureActionCreator());
  }
}

/** SysUserListsPage RootSaga */
export function* sysUserListsPageRootSaga() {
  yield all([
    takeEvery(ActionType.INIT_PAGE, initPage),
    takeEvery(ActionType.FETCH_SYSUSERLISTS, fetchSysUserLists),
    takeEvery(ActionType.FETCH_SYSUSERLIST, fetchSysUserList),
    takeEvery(ActionType.UPDATE_SYSUSERLIST, updateSysUserList),
    //takeEvery(ActionType.CREATE_SYSUSERLIST, createSysUserList),
    //takeEvery(ActionType.DELETE_SYSUSERLIST, deleteSysUserList),
  ]);
}
