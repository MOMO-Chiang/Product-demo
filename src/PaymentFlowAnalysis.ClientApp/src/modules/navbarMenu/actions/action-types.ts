import { FetchNotificationInfosParams, FetchNotificationInfosResponse } from '@app/apis/admin/notificationInfo';
import { FetchSysUserListResponse, PatchSysUserListParams } from '@app/apis/admin/sys-userlists';
import { Action, NotificationInfo } from '@shared/types';

/** Enum of action's type */
export enum ActionType {
  /** 重置 Page State */
  RESET_PAGE_STATE = '@NavbarMenuPage/RESET_PAGE_STATE',

  /** 初始頁面 */
  INIT_PAGE = '@NavbarMenuPage/INIT_PAGE',

  /** 初始頁面 - 成功 */
  INIT_PAGE_SUCCESS = '@NavbarMenuPage/INIT_PAGE_SUCCESS',

  /** 初始頁面 - 失敗 */
  INIT_PAGE_FAILURE = '@NavbarMenuPage/INIT_PAGE_FAILURE',

  /** 取得單一帳號資料 */
  FETCH_SYSUSERLIST = '@NavbarMenuPage/FETCH_SYSUSERLIST',

  /** 取得單一帳號資料 - 成功 */
  FETCH_SYSUSERLIST_SUCCESS = '@NavbarMenuPage/FETCH_SYSUSERLIST_SUCCESS',

  /** 取得單一帳號資料 - 失敗 */
  FETCH_SYSUSERLIST_FAILURE = '@NavbarMenuPage/FETCH_SYSUSERLIST_FAILURE',

  /** 取得未讀通知數量 */
  FETCH_NOTIFICATION_UNREAD_COUNT = '@NavbarMenuPage/FETCH_NOTIFICATION_UNREAD_COUNT',

  /** 取得未讀通知數量 - 成功 */
  FETCH_NOTIFICATION_UNREAD_COUNT_SUCCESS = '@NavbarMenuPage/FETCH_NOTIFICATION_UNREAD_COUNT_SUCCESS',

  /** 取得未讀通知數量 - 失敗 */
  FETCH_NOTIFICATION_UNREAD_COUNT_FAILURE = '@NavbarMenuPage/FETCH_NOTIFICATION_UNREAD_COUNT_FAILURE',

  /** 取得通知內容 */
  FETCH_NOTIFICATIONS = '@NavbarMenuPage/FETCH_NOTIFICATIONS',

  /** 取得通知內容 - 成功 */
  FETCH_NOTIFICATIONS_SUCCESS = '@NavbarMenuPage/FETCH_NOTIFICATIONS_SUCCESS',

  /** 取得通知內容 - 失敗 */
  FETCH_NOTIFICATIONS_FAILURE = '@NavbarMenuPage/FETCH_NOTIFICATIONS_FAILURE',

  /** 更新帳號資料 */
  UPDATE_SYSUSERLIST = '@NavbarMenuPage/UPDATE_SYSUSERLIST',

  /** 更新帳號資料 - 成功 */
  UPDATE_SYSUSERLIST_SUCCESS = '@NavbarMenuPage/UPDATE_SYSUSERLIST_SUCCESS',

  /** 更新帳號資料 - 失敗 */
  UPDATE_SYSUSERLIST_FAILURE = '@NavbarMenuPage/UPDATE_SYSUSERLIST_FAILURE',

  /** 更新通知為已讀 */
  UPDATE_NOTIFICATIONS_AS_READ = '@NavbarMenuPage/UPDATE_NOTIFICATIONS_AS_READ',

  /** 更新通知為已讀 - 成功 */
  UPDATE_NOTIFICATIONS_AS_READ_SUCCESS = '@NavbarMenuPage/UPDATE_NOTIFICATIONS_AS_READ_SUCCESS',

  /** 更新通知為已讀 - 失敗 */
  UPDATE_NOTIFICATIONS_AS_READ_FAILURE = '@NavbarMenuPage/UPDATE_NOTIFICATIONS_AS_READ_FAILURE',

  /** 隱藏Modal */
  HIDE_MODAL = '@NavbarMenuPage/HIDE_MODAL',

  /** 顯示更新Modal */
  SHOW_SYSUSERLIST_MODAL = '@NavbarMenuPage/SHOW_SYSUSERLIST_MODAL',

  /** 顯示通知Modal */
  SHOW_NOTIFICATION_MODAL = '@NavbarMenuPage/SHOW_NOTIFICATION_MODAL',
}

/** SysUserListsPage Action */
export type NavbarMenuPageAction =
  | ResetPageStateAction
  | InitPageAction
  | InitPageSuccessAction
  | InitPageFailureAction
  | FetchSysUserListAction
  | FetchSysUserListSuccessAction
  | FetchSysUserListFailureAction
  | FetchNotificationsAction
  | FetchNotificationsSuccessAction
  | FetchNotificationsFailureAction
  | FetchNotificationUnReadCountAction
  | FetchNotificationUnReadCountSuccessAction
  | FetchNotificationUnReadCountFailureAction
  | UpdateSysUserListAction
  | UpdateSysUserListSuccessAction
  | UpdateSysUserListFailureAction
  | UpdateNotificationReadAction
  | UpdateNotificationReadSuccessAction
  | UpdateNotificationReadFailureAction
  | HideModalAction
  | ShowEditModalAction
  | ShowNotificationModalAction;

/**重置 Page State */
export interface ResetPageStateAction {
  type: ActionType.RESET_PAGE_STATE;
}

/** 初始頁面 */
export interface InitPageAction {
  type: ActionType.INIT_PAGE;
}

/** 初始頁面 - 成功 */
export interface InitPageSuccessAction {
  type: ActionType.INIT_PAGE_SUCCESS;
}

/** 初始頁面 - 失敗 */
export interface InitPageFailureAction {
  type: ActionType.INIT_PAGE_FAILURE;
}

/** 取得單一帳號資料 */
export interface FetchSysUserListAction {
  type: ActionType.FETCH_SYSUSERLIST;
}

/** 取得單一帳號資料 - 成功 */
export interface FetchSysUserListSuccessAction {
  type: ActionType.FETCH_SYSUSERLIST_SUCCESS;
  payload: { response: FetchSysUserListResponse };
}

/** 取得單一帳號資料 - 失敗 */
export interface FetchSysUserListFailureAction {
  type: ActionType.FETCH_SYSUSERLIST_FAILURE;
}

/** 取得未讀通知數量 */
export interface FetchNotificationUnReadCountAction {
  type: ActionType.FETCH_NOTIFICATION_UNREAD_COUNT;
}

/** 取得未讀通知數量 - 成功 */
export interface FetchNotificationUnReadCountSuccessAction {
  type: ActionType.FETCH_NOTIFICATION_UNREAD_COUNT_SUCCESS;
  payload: { response: number };
}

/** 取得未讀通知數量 - 失敗 */
export interface FetchNotificationUnReadCountFailureAction {
  type: ActionType.FETCH_NOTIFICATION_UNREAD_COUNT_FAILURE;
}

/** 取得通知內容 */
export interface FetchNotificationsAction {
  type: ActionType.FETCH_NOTIFICATIONS;
  payload: { params: FetchNotificationInfosParams };
}

/** 取得通知內容 - 成功 */
export interface FetchNotificationsSuccessAction {
  type: ActionType.FETCH_NOTIFICATIONS_SUCCESS;
  payload: { response: FetchNotificationInfosResponse };
}

/** 取得通知內容 - 失敗 */
export interface FetchNotificationsFailureAction {
  type: ActionType.FETCH_NOTIFICATIONS_FAILURE;
}

/** 更新帳號資料 */
export interface UpdateSysUserListAction {
  type: ActionType.UPDATE_SYSUSERLIST;
  payload: {
    userId: string;
    params: PatchSysUserListParams;
  };
}

/** 更新帳號資料 - 成功 */
export interface UpdateSysUserListSuccessAction {
  type: ActionType.UPDATE_SYSUSERLIST_SUCCESS;
}

/** 更新帳號資料 - 失敗 */
export interface UpdateSysUserListFailureAction {
  type: ActionType.UPDATE_SYSUSERLIST_FAILURE;
}

/** 更新通知為已讀 */
export interface UpdateNotificationReadAction {
  type: ActionType.UPDATE_NOTIFICATIONS_AS_READ;
}

/** 更新通知為已讀 - 成功 */
export interface UpdateNotificationReadSuccessAction {
  type: ActionType.UPDATE_NOTIFICATIONS_AS_READ_SUCCESS;
}

/** 更新通知為已讀 - 失敗 */
export interface UpdateNotificationReadFailureAction {
  type: ActionType.UPDATE_NOTIFICATIONS_AS_READ_FAILURE;
}

/** 隱藏Modal */
export interface HideModalAction {
  type: ActionType.HIDE_MODAL;
}

/** 顯示更新Modal */
export interface ShowEditModalAction {
  type: ActionType.SHOW_SYSUSERLIST_MODAL;
}

/** 顯示通知Modal */
export interface ShowNotificationModalAction {
  type: ActionType.SHOW_NOTIFICATION_MODAL;
}
