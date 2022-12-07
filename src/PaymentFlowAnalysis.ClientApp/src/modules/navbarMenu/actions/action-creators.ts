import { FetchNotificationInfosParams, FetchNotificationInfosResponse } from '@app/apis/admin/notificationInfo';
import { FetchSysUserListResponse, PatchSysUserListParams } from '@app/apis/admin/sys-userlists';
import { NotificationInfo, PaginatedInfo } from '@shared/types';
import {
  FetchNotificationsAction,
  FetchNotificationsFailureAction,
  FetchNotificationsSuccessAction,
  UpdateNotificationReadAction,
} from '.';
import {
  ActionType,
  FetchSysUserListAction,
  FetchSysUserListFailureAction,
  FetchSysUserListSuccessAction,
  HideModalAction,
  ShowEditModalAction,
  NavbarMenuPageAction,
  UpdateSysUserListAction,
  UpdateSysUserListFailureAction,
  UpdateSysUserListSuccessAction,
  ShowNotificationModalAction,
  UpdateNotificationReadSuccessAction,
  UpdateNotificationReadFailureAction,
  FetchNotificationUnReadCountAction,
  FetchNotificationUnReadCountSuccessAction,
  FetchNotificationUnReadCountFailureAction,
} from './action-types';

/** 重置 Page State */
export const resetPageStateActionCreator = (): NavbarMenuPageAction => ({
  type: ActionType.RESET_PAGE_STATE,
});

/** 初始頁面 */
export const initPageActionCreator = (): NavbarMenuPageAction => ({
  type: ActionType.INIT_PAGE,
});

/** 初始頁面 - 成功 */
export const initPageSuccessActionCreator = (): NavbarMenuPageAction => ({
  type: ActionType.INIT_PAGE_SUCCESS,
});

/** 初始頁面 - 失敗 */
export const initPageFailureActionCreator = (): NavbarMenuPageAction => ({
  type: ActionType.INIT_PAGE_FAILURE,
});

/** 取得單一帳號資料 */
export const fetchSysUserListActionCreator = (): FetchSysUserListAction => ({
  type: ActionType.FETCH_SYSUSERLIST,
});

/** 取得單一帳號資料 - 成功 */
export const fetchSysUserListSuccessActionCreator = (response: FetchSysUserListResponse): FetchSysUserListSuccessAction => ({
  type: ActionType.FETCH_SYSUSERLIST_SUCCESS,
  payload: { response },
});

/** 取得單一帳號資料 - 失敗 */
export const fetchSysUserListFailureActionCreator = (): FetchSysUserListFailureAction => ({
  type: ActionType.FETCH_SYSUSERLIST_FAILURE,
});

/** 取得未讀通知數量 */
export const fetchNotificationUnReadCountActionCreator = (): FetchNotificationUnReadCountAction => ({
  type: ActionType.FETCH_NOTIFICATION_UNREAD_COUNT,
});

/** 取得未讀通知數量 - 成功 */
export const fetchNotificationUnReadCountSuccessActionCreator = (
  response: number,
): FetchNotificationUnReadCountSuccessAction => ({
  type: ActionType.FETCH_NOTIFICATION_UNREAD_COUNT_SUCCESS,
  payload: { response },
});

/** 取得未讀通知數量 - 失敗 */
export const fetchNotificationUnReadCountFailureActionCreator = (): FetchNotificationUnReadCountFailureAction => ({
  type: ActionType.FETCH_NOTIFICATION_UNREAD_COUNT_FAILURE,
});

/** 取得通知內容 */
export const fetchNotificationsActionCreator = (params: FetchNotificationInfosParams): FetchNotificationsAction => ({
  type: ActionType.FETCH_NOTIFICATIONS,
  payload: { params },
});

/** 取得通知內容 - 成功 */
export const fetchNotificationsSuccessActionCreator = (
  response: FetchNotificationInfosResponse,
): FetchNotificationsSuccessAction => ({
  type: ActionType.FETCH_NOTIFICATIONS_SUCCESS,
  payload: { response },
});

/** 取得通知內容 - 失敗 */
export const fetchNotificationsFailureActionCreator = (): FetchNotificationsFailureAction => ({
  type: ActionType.FETCH_NOTIFICATIONS_FAILURE,
});

/** 更新帳號資料 */
export const updateSysUserListActionCreator = (userId: string, params: PatchSysUserListParams): UpdateSysUserListAction => ({
  type: ActionType.UPDATE_SYSUSERLIST,
  payload: { userId, params },
});

/** 更新帳號資料 - 成功 */
export const updateSysUserListSuccessActionCreator = (): UpdateSysUserListSuccessAction => ({
  type: ActionType.UPDATE_SYSUSERLIST_SUCCESS,
});

/** 更新帳號資料 - 失敗 */
export const updateSysUserListFailureActionCreator = (): UpdateSysUserListFailureAction => ({
  type: ActionType.UPDATE_SYSUSERLIST_FAILURE,
});

/** 更新通知為已讀 */
export const updateNotificationReadActionCreator = (): UpdateNotificationReadAction => ({
  type: ActionType.UPDATE_NOTIFICATIONS_AS_READ,
});

/** 更新通知為已讀 - 成功 */
export const updateNotificationReadSuccessActionCreator = (): UpdateNotificationReadSuccessAction => ({
  type: ActionType.UPDATE_NOTIFICATIONS_AS_READ_SUCCESS,
});

/** 更新通知為已讀 - 失敗 */
export const updateNotificationReadFailureActionCreator = (): UpdateNotificationReadFailureAction => ({
  type: ActionType.UPDATE_NOTIFICATIONS_AS_READ_FAILURE,
});

/** 隱藏Modal */
export const hideModalActionCreator = (): HideModalAction => ({
  type: ActionType.HIDE_MODAL,
});

/** 顯示更新Modal */
export const showEditModalActionCreator = (): ShowEditModalAction => ({
  type: ActionType.SHOW_SYSUSERLIST_MODAL,
});

/** 顯示通知Modal */
export const showNotificationModalActionCreator = (): ShowNotificationModalAction => ({
  type: ActionType.SHOW_NOTIFICATION_MODAL,
});
