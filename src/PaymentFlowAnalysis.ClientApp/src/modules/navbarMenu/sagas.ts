import { AdminHttpRequestError, NotificationInfoAPI, SysUserListsAPI } from '@app/apis/admin';
import { FetchNotificationInfosResponse } from '@app/apis/admin/notificationInfo';
import { AppState } from '@app/store';
import { Alert } from '@modules/alert';
import { genSpinnerId, hideSpinnerActionCreator, showSpinnerActionCreator } from '@modules/spinner';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { NavbarMenuReduxState } from '.';
import {
  ActionType,
  FetchNotificationsAction,
  fetchNotificationsActionCreator,
  fetchNotificationsFailureActionCreator,
  fetchNotificationsSuccessActionCreator,
  FetchNotificationUnReadCountAction,
  fetchNotificationUnReadCountActionCreator,
  fetchNotificationUnReadCountFailureActionCreator,
  fetchNotificationUnReadCountSuccessActionCreator,
  FetchSysUserListAction,
  fetchSysUserListFailureActionCreator,
  fetchSysUserListSuccessActionCreator,
  InitPageAction,
  UpdateNotificationReadAction,
  updateNotificationReadActionCreator,
  updateNotificationReadFailureActionCreator,
  updateNotificationReadSuccessActionCreator,
  UpdateSysUserListAction,
  updateSysUserListFailureActionCreator,
  updateSysUserListSuccessActionCreator,
} from './actions';

/** 初始頁面 */
function* initPage(action: InitPageAction) {}

/**
 * 取得單一帳號資料
 * @param action FetchSysUserListsAction
 */
function* fetchSysUserList(action: FetchSysUserListAction) {
  try {
    // 取得帳號列表
    const response: SysUserListsAPI.FetchSysUserListResponse = yield call(SysUserListsAPI.fetchCurrentSysUserList);
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
 * 取得通知內容
 * @param action
 */
function* fetchNotifications(action: FetchNotificationsAction) {
  const { params } = action.payload;
  try {
    const response: FetchNotificationInfosResponse = yield call(NotificationInfoAPI.fetchNotificationInfos, params);

    yield put(fetchNotificationsSuccessActionCreator(response));
    yield put(updateNotificationReadActionCreator());
  } catch (err) {
    const error = err as AdminHttpRequestError;
    yield call(Alert.show, {
      type: Alert.AlertType.Error,
      title: '取得通知內容發生錯誤',
      text: `[${error.status}]\n${error.message}`,
      showCancelButton: false,
    });
    yield put(fetchNotificationsFailureActionCreator());
  }
}

/**
 * 更新通知已讀
 * @param action
 */
function* updateNotification(action: UpdateNotificationReadAction) {
  try {
    yield call(NotificationInfoAPI.markNotificationRead);

    yield put(updateNotificationReadSuccessActionCreator());
    yield put(fetchNotificationUnReadCountActionCreator());
  } catch (err) {
    const error = err as AdminHttpRequestError;
    // yield call(Alert.show, {
    //   type: Alert.AlertType.Error,
    //   title: '更新通知發生錯誤',
    //   text: `[${error.status}]\n${error.message}`,
    //   showCancelButton: false,
    // });
    yield put(updateNotificationReadFailureActionCreator());
  }
}

/**
 * 取得未讀通知數量
 * @param action
 */
function* fetchNotificationUnReadCount(action: FetchNotificationUnReadCountAction) {
  try {
    const response: number = yield call(NotificationInfoAPI.fetchNotificationUnReadCount);

    yield put(fetchNotificationUnReadCountSuccessActionCreator(response));
  } catch (err) {
    const error = err as AdminHttpRequestError;
    // yield call(Alert.show, {
    //   type: Alert.AlertType.Error,
    //   title: '取得未讀通知數量發生錯誤',
    //   text: `[${error.status}]\n${error.message}`,
    //   showCancelButton: false,
    // });
    yield put(fetchNotificationUnReadCountFailureActionCreator());
  }
}

/** NavbarMenu RootSaga */
export function* navbarMenuSaga() {
  yield all([
    takeEvery(ActionType.INIT_PAGE, initPage),
    takeEvery(ActionType.FETCH_SYSUSERLIST, fetchSysUserList),
    takeEvery(ActionType.UPDATE_SYSUSERLIST, updateSysUserList),
    takeEvery(ActionType.FETCH_NOTIFICATIONS, fetchNotifications),
    takeEvery(ActionType.UPDATE_NOTIFICATIONS_AS_READ, updateNotification),
    takeEvery(ActionType.FETCH_NOTIFICATION_UNREAD_COUNT, fetchNotificationUnReadCount),
  ]);
}
