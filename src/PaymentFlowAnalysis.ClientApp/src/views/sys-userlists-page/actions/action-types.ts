import {
  CreateSysUserListParams,
  FetchSysUserListResponse,
  FetchSysUserListsParams,
  FetchSysUserListsResponse,
  PatchSysUserListParams,
  UpdateSysUserListParams,
} from '@app/apis/admin/sys-userlists';
import { Action, PayloadAction } from '@shared/types';

/** Enum of action's type */
export enum ActionType {
  /** 重置 Page State */
  RESET_PAGE_STATE = '@SysUserListsPage/RESET_PAGE_STATE',

  /** 初始頁面 */
  INIT_PAGE = '@SysUserListsPage/INIT_PAGE',

  /** 初始頁面 - 成功 */
  INIT_PAGE_SUCCESS = '@SysUserListsPage/INIT_PAGE_SUCCESS',

  /** 初始頁面 - 失敗 */
  INIT_PAGE_FAILURE = '@SysUserListsPage/INIT_PAGE_FAILURE',

  /** 取得帳號資料 */
  FETCH_SYSUSERLISTS = '@SysUserListsPage/FETCH_SYSUSERLISTS',

  /** 取得帳號資料 - 成功 */
  FETCH_SYSUSERLISTS_SUCCESS = '@SysUserListsPage/FETCH_SYSUSERLISTS_SUCCESS',

  /** 取得帳號資料 - 失敗 */
  FETCH_SYSUSERLISTS_FAILURE = '@SysUserListsPage/FETCH_SYSUSERLISTS_FAILURE',

  /** 展開明細資料 */
  EXPAND_DETAIL = '@SysUserListsPage/EXPAND_DETAIL',

  /** 取得單一帳號資料 */
  FETCH_SYSUSERLIST = '@SysUserListsPage/FETCH_SYSUSERLIST',

  /** 取得單一帳號資料 - 成功 */
  FETCH_SYSUSERLIST_SUCCESS = '@SysUserListsPage/FETCH_SYSUSERLIST_SUCCESS',

  /** 取得單一帳號資料 - 失敗 */
  FETCH_SYSUSERLIST_FAILURE = '@SysUserListsPage/FETCH_SYSUSERLIST_FAILURE',

  /** 新增帳號資料 */
  CREATE_SYSUSERLIST = '@SysUserListsPage/CREATE_SYSUSERLIST',

  /** 新增帳號資料 - 成功 */
  CREATE_SYSUSERLIST_SUCCESS = '@SysUserListsPage/CREATE_SYSUSERLIST_SUCCESS',

  /** 新增帳號資料 - 失敗 */
  CREATE_SYSUSERLIST_FAILURE = '@SysUserListsPage/CREATE_SYSUSERLIST_FAILURE',

  /** 更新帳號資料 */
  UPDATE_SYSUSERLIST = '@SysUserListsPage/UPDATE_SYSUSERLIST',

  /** 更新帳號資料 - 成功 */
  UPDATE_SYSUSERLIST_SUCCESS = '@SysUserListsPage/UPDATE_SYSUSERLIST_SUCCESS',

  /** 更新帳號資料 - 失敗 */
  UPDATE_SYSUSERLIST_FAILURE = '@SysUserListsPage/UPDATE_SYSUSERLIST_FAILURE',

  /** 刪除帳號資料 */
  DELETE_SYSUSERLIST = '@SysUserListsPage/DELETE_SYSUSERLIST',

  /** 刪除帳號資料 - 成功 */
  DELETE_SYSUSERLIST_SUCCESS = '@SysUserListsPage/DELETE_SYSUSERLIST_SUCCESS',

  /** 刪除帳號資料 - 失敗 */
  DELETE_SYSUSERLIST_FAILURE = '@SysUserListsPage/DELETE_SYSUSERLIST_FAILURE',

  /** 隱藏Modal */
  HIDE_MODAL = '@SysUserListsPage/HIDE_MODAL',

  /** 顯示新增Modal */
  SHOW_CREATE_MODAL = '@SysUserListsPage/SHOW_CREATE_MODAL',

  /** 顯示更新Modal */
  SHOW_EDIT_MODAL = '@SysUserListsPage/SHOW_EDIT_MODAL',
}

/** SysUserListsPage Action */
export type SysUserListsPageAction =
  | ResetPageStateAction
  | InitPageAction
  | InitPageSuccessAction
  | InitPageFailureAction
  | ExpandDetailAction
  | FetchSysUserListsAction
  | FetchSysUserListsSuccessAction
  | FetchSysUserListsFailureAction
  | FetchSysUserListAction
  | FetchSysUserListSuccessAction
  | FetchSysUserListFailureAction
  | CreateSysUserListAction
  | CreateSysUserListSuccessAction
  | CreateSysUserListFailureAction
  | UpdateSysUserListAction
  | UpdateSysUserListSuccessAction
  | UpdateSysUserListFailureAction
  | DeleteSysUserListAction
  | DeleteSysUserListSuccessAction
  | DeleteSysUserListFailureAction
  | HideModalAction
  | ShowCreateModalAction
  | ShowEditModalAction;

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

/** 展開明細資料 */
export interface ExpandDetailAction {
  type: ActionType.EXPAND_DETAIL;
  payload: { key: string; bool: boolean };
}

/** 取得帳號資料 */
export interface FetchSysUserListsAction {
  type: ActionType.FETCH_SYSUSERLISTS;
  payload: { params: FetchSysUserListsParams };
}

/** 取得帳號資料 - 成功 */
export interface FetchSysUserListsSuccessAction {
  type: ActionType.FETCH_SYSUSERLISTS_SUCCESS;
  payload: { response: FetchSysUserListsResponse };
}

/** 取得帳號資料 - 失敗 */
export interface FetchSysUserListsFailureAction {
  type: ActionType.FETCH_SYSUSERLISTS_FAILURE;
}

/** 取得單一帳號資料 */
export interface FetchSysUserListAction {
  type: ActionType.FETCH_SYSUSERLIST;
  payload: { userId: string };
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

/** 新增帳號資料 */
export interface CreateSysUserListAction {
  type: ActionType.CREATE_SYSUSERLIST;
  payload: { params: CreateSysUserListParams };
}

/** 新增帳號資料 - 成功 */
export interface CreateSysUserListSuccessAction {
  type: ActionType.CREATE_SYSUSERLIST_SUCCESS;
}

/** 新增帳號資料 - 失敗 */
export interface CreateSysUserListFailureAction {
  type: ActionType.CREATE_SYSUSERLIST_FAILURE;
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

/** 刪除帳號資料 */
export interface DeleteSysUserListAction {
  type: ActionType.DELETE_SYSUSERLIST;
  payload: { userId: string };
}

/** 刪除帳號資料 - 成功 */
export interface DeleteSysUserListSuccessAction {
  type: ActionType.DELETE_SYSUSERLIST_SUCCESS;
}

/** 刪除帳號資料 - 失敗 */
export interface DeleteSysUserListFailureAction {
  type: ActionType.DELETE_SYSUSERLIST_FAILURE;
}

/** 隱藏Modal */
export interface HideModalAction {
  type: ActionType.HIDE_MODAL;
}

/** 顯示新增Modal */
export interface ShowCreateModalAction {
  type: ActionType.SHOW_CREATE_MODAL;
}

/** 顯示更新Modal */
export interface ShowEditModalAction {
  type: ActionType.SHOW_EDIT_MODAL;
  payload: { userId: string };
}
