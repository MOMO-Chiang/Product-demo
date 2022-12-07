import {
  CreateBlackAccountParams,
  FetchBlackAccountResponse,
  FetchBlackAccountsParams,
  FetchBlackAccountsResponse,
  FetchEmailShowModalResponse,
  FetchIPShowModalResponse,
  FetchPhoneShowModalResponse,
  UpdateBlackAccountParams,
} from '@app/apis/admin/black-account';
import { SelectOptionConfig } from '@shared/types';
import { CreateBlackAccountAction, ShowCreateModalAction } from '.';
import {
  ActionType,
  CreateBlackAccountFailureAction,
  CreateBlackAccountSuccessAction,
  FetchBlackAccountAction,
  FetchBlackAccountFailureAction,
  FetchBlackAccountsAction,
  FetchBlackAccountsFailureAction,
  FetchBlackAccountsSuccessAction,
  FetchBlackAccountSuccessAction,
  HideModalAction,
  ShowEditModalAction,
  BlackAccountsPageAction,
  UpdateBlackAccountAction,
  UpdateBlackAccountFailureAction,
  UpdateBlackAccountSuccessAction,
  ExportExcelAction,
  ExportOdsAction,
  ShowPhoneModalAction,
  ShowEmailModalAction,
  ShowIPModalAction,
  ShowPhoneModalSuccessAction,
  ShowEmailModalSuccessAction,
  ShowIPModalSuccessAction,
} from './action-types';

/** 重置 Page State */
export const resetPageStateActionCreator = (): BlackAccountsPageAction => ({
  type: ActionType.RESET_PAGE_STATE,
});

/** 初始頁面 */
export const initPageActionCreator = (): BlackAccountsPageAction => ({
  type: ActionType.INIT_PAGE,
});

/** 初始頁面 - 成功 */
export const initPageSuccessActionCreator = (payload: { RiskLevelOptions: SelectOptionConfig[] }): BlackAccountsPageAction => ({
  type: ActionType.INIT_PAGE_SUCCESS,
  payload,
});

/** 初始頁面 - 失敗 */
export const initPageFailureActionCreator = (): BlackAccountsPageAction => ({
  type: ActionType.INIT_PAGE_FAILURE,
});

/** 取得帳號資料 */
export const fetchBlackAccountsActionCreator = (params: FetchBlackAccountsParams): FetchBlackAccountsAction => ({
  type: ActionType.FETCH_BLACKACCOUNTS,
  payload: { params },
});

/** 取得帳號資料 - 成功 */
export const fetchBlackAccountsSuccessActionCreator = (
  response: FetchBlackAccountsResponse,
): FetchBlackAccountsSuccessAction => ({
  type: ActionType.FETCH_BLACKACCOUNTS_SUCCESS,
  payload: { response },
});

/** 取得帳號資料 - 失敗 */
export const fetchBlackAccountsFailureActionCreator = (): FetchBlackAccountsFailureAction => ({
  type: ActionType.FETCH_BLACKACCOUNTS_FAILURE,
});

/** 取得單一帳號資料 */
export const fetchBlackAccountActionCreator = (userId: string): FetchBlackAccountAction => ({
  type: ActionType.FETCH_BLACKACCOUNT,
  payload: { userId },
});

/** 取得單一帳號資料 - 成功 */
export const fetchBlackAccountSuccessActionCreator = (response: FetchBlackAccountResponse): FetchBlackAccountSuccessAction => ({
  type: ActionType.FETCH_BLACKACCOUNT_SUCCESS,
  payload: { response },
});

/** 取得單一帳號資料 - 失敗 */
export const fetchBlackAccountFailureActionCreator = (): FetchBlackAccountFailureAction => ({
  type: ActionType.FETCH_BLACKACCOUNT_FAILURE,
});

/** 新增帳號資料 */
export const createBlackAccountActionCreator = (params: CreateBlackAccountParams): CreateBlackAccountAction => ({
  type: ActionType.CREATE_BLACKACCOUNT,
  payload: { params },
});

/** 新增帳號資料 - 成功 */
export const createBlackAccountSuccessActionCreator = (): CreateBlackAccountSuccessAction => ({
  type: ActionType.CREATE_BLACKACCOUNT_SUCCESS,
});

/** 新增帳號資料 - 失敗 */
export const createBlackAccountFailureActionCreator = (): CreateBlackAccountFailureAction => ({
  type: ActionType.CREATE_BLACKACCOUNT_FAILURE,
});

/** 更新帳號資料 */
export const updateBlackAccountActionCreator = (
  userId: string,
  params: UpdateBlackAccountParams,
): UpdateBlackAccountAction => ({
  type: ActionType.UPDATE_BLACKACCOUNT,
  payload: { userId, params },
});

/** 更新帳號資料 - 成功 */
export const updateBlackAccountSuccessActionCreator = (): UpdateBlackAccountSuccessAction => ({
  type: ActionType.UPDATE_BLACKACCOUNT_SUCCESS,
});

/** 更新帳號資料 - 失敗 */
export const updateBlackAccountFailureActionCreator = (): UpdateBlackAccountFailureAction => ({
  type: ActionType.UPDATE_BLACKACCOUNT_FAILURE,
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
export const showEditModalActionCreator = (walletAddress: string): ShowEditModalAction => ({
  type: ActionType.SHOW_EDIT_MODAL,
  payload: { walletAddress },
});

/** 匯出excel */
export const exportExcelActionCreator = (params: FetchBlackAccountsParams): ExportExcelAction => ({
  type: ActionType.EXPORT_EXCEL,
  payload: { params },
});

/** 匯出ods */
export const exportOdsActionCreator = (params: FetchBlackAccountsParams): ExportOdsAction => ({
  type: ActionType.EXPORT_ODS,
  payload: { params },
});

/** 顯示電話Modal */
export const showPhoneListActionCreator = (walletAddress: string): ShowPhoneModalAction => ({
  type: ActionType.SHOW_PHONE_MODAL,
  payload: { walletAddress },
});

/** 顯示信箱Modal */
export const showEmailListActionCreator = (walletAddress: string): ShowEmailModalAction => ({
  type: ActionType.SHOW_EMAIL_MODAL,
  payload: { walletAddress },
});

/** 顯示ipModal */
export const showIPListActionCreator = (walletAddress: string): ShowIPModalAction => ({
  type: ActionType.SHOW_IP_MODAL,
  payload: { walletAddress },
});

/** 取得電話資料 - 成功 */
export const showPhoneListSuccessActionCreator = (response: FetchPhoneShowModalResponse): ShowPhoneModalSuccessAction => ({
  type: ActionType.SHOW_PHONE_MODAL_SUCCESS,
  payload: { response },
});

/** 取得信箱帳號資料 - 成功 */
export const showEmailListSuccessActionCreator = (response: FetchEmailShowModalResponse): ShowEmailModalSuccessAction => ({
  type: ActionType.SHOW_EMAIL_MODAL_SUCCESS,
  payload: { response },
});

/** 取得ip帳號資料 - 成功 */
export const showIPListSuccessActionCreator = (response: FetchIPShowModalResponse): ShowIPModalSuccessAction => ({
  type: ActionType.SHOW_IP_MODAL_SUCCESS,
  payload: { response },
});
