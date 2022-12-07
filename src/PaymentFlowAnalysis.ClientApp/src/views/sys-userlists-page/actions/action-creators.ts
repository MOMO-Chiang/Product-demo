import {
  CreateSysUserListParams,
  FetchSysUserListResponse,
  FetchSysUserListsParams,
  FetchSysUserListsResponse,
  PatchSysUserListParams,
  UpdateSysUserListParams,
} from '@app/apis/admin/sys-userlists';
import { CreateSysUserListAction, ShowCreateModalAction } from '.';
import {
  ActionType,
  ExpandDetailAction, //展開明細資料Action
  CreateSysUserListFailureAction,
  CreateSysUserListSuccessAction,
  DeleteSysUserListAction,
  DeleteSysUserListFailureAction,
  DeleteSysUserListSuccessAction,
  FetchSysUserListAction,
  FetchSysUserListFailureAction,
  FetchSysUserListsAction,
  FetchSysUserListsFailureAction,
  FetchSysUserListsSuccessAction,
  FetchSysUserListSuccessAction,
  HideModalAction,
  ShowEditModalAction,
  SysUserListsPageAction,
  UpdateSysUserListAction,
  UpdateSysUserListFailureAction,
  UpdateSysUserListSuccessAction,
} from './action-types';

/** 重置 Page State */
export const resetPageStateActionCreator = (): SysUserListsPageAction => ({
  type: ActionType.RESET_PAGE_STATE,
});

/** 初始頁面 */
export const initPageActionCreator = (): SysUserListsPageAction => ({
  type: ActionType.INIT_PAGE,
});

/** 初始頁面 - 成功 */
export const initPageSuccessActionCreator = (): SysUserListsPageAction => ({
  type: ActionType.INIT_PAGE_SUCCESS,
});

/** 初始頁面 - 失敗 */
export const initPageFailureActionCreator = (): SysUserListsPageAction => ({
  type: ActionType.INIT_PAGE_FAILURE,
});

/** 取得帳號資料 */
export const fetchSysUserListsActionCreator = (params: FetchSysUserListsParams): FetchSysUserListsAction => ({
  type: ActionType.FETCH_SYSUSERLISTS,
  payload: { params },
});

/** 取得帳號資料 - 成功 */
export const fetchSysUserListsSuccessActionCreator = (response: FetchSysUserListsResponse): FetchSysUserListsSuccessAction => ({
  type: ActionType.FETCH_SYSUSERLISTS_SUCCESS,
  payload: { response },
});

/** 取得帳號資料 - 失敗 */
export const fetchSysUserListsFailureActionCreator = (): FetchSysUserListsFailureAction => ({
  type: ActionType.FETCH_SYSUSERLISTS_FAILURE,
});

/** 展開明細資料 */
export const expandDetailActionCreator = (key: string, bool: boolean): ExpandDetailAction => ({
  type: ActionType.EXPAND_DETAIL,
  payload: { key, bool },
});

/** 取得單一帳號資料 */
export const fetchSysUserListActionCreator = (userId: string): FetchSysUserListAction => ({
  type: ActionType.FETCH_SYSUSERLIST,
  payload: { userId },
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

/** 新增帳號資料 */
export const createSysUserListActionCreator = (params: CreateSysUserListParams): CreateSysUserListAction => ({
  type: ActionType.CREATE_SYSUSERLIST,
  payload: { params },
});

/** 新增帳號資料 - 成功 */
export const createSysUserListSuccessActionCreator = (): CreateSysUserListSuccessAction => ({
  type: ActionType.CREATE_SYSUSERLIST_SUCCESS,
});

/** 新增帳號資料 - 失敗 */
export const createSysUserListFailureActionCreator = (): CreateSysUserListFailureAction => ({
  type: ActionType.CREATE_SYSUSERLIST_FAILURE,
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

/** 刪除帳號資料 */
export const deleteSysUserListActionCreator = (userId: string): DeleteSysUserListAction => ({
  type: ActionType.DELETE_SYSUSERLIST,
  payload: { userId },
});

/** 刪除帳號資料 - 成功 */
export const deleteSysUserListSuccessActionCreator = (): DeleteSysUserListSuccessAction => ({
  type: ActionType.DELETE_SYSUSERLIST_SUCCESS,
});

/** 刪除帳號資料 - 失敗 */
export const deleteSysUserListFailureActionCreator = (): DeleteSysUserListFailureAction => ({
  type: ActionType.DELETE_SYSUSERLIST_FAILURE,
});

/** 隱藏Modal */
export const hideModalActionCreator = (): HideModalAction => ({
  type: ActionType.HIDE_MODAL,
});

/** 顯示新增Modal */
export const showCreateModalActionCreator = (): ShowCreateModalAction => ({
  type: ActionType.SHOW_CREATE_MODAL,
});

/** 顯示更新Modal */
export const showEditModalActionCreator = (userId: string): ShowEditModalAction => ({
  type: ActionType.SHOW_EDIT_MODAL,
  payload: { userId },
});
