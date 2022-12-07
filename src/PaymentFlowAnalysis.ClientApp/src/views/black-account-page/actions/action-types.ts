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
import { Action, PayloadAction, SelectOptionConfig } from '@shared/types';

/** Enum of action's type */
export enum ActionType {
  /** 重置 Page State */
  RESET_PAGE_STATE = '@BlackAccountsPage/RESET_PAGE_STATE',

  /** 初始頁面 */
  INIT_PAGE = '@BlackAccountsPage/INIT_PAGE',

  /** 初始頁面 - 成功 */
  INIT_PAGE_SUCCESS = '@BlackAccountsPage/INIT_PAGE_SUCCESS',

  /** 初始頁面 - 失敗 */
  INIT_PAGE_FAILURE = '@BlackAccountsPage/INIT_PAGE_FAILURE',

  /** 取得帳號資料 */
  FETCH_BLACKACCOUNTS = '@BlackAccountsPage/FETCH_BLACKACCOUNTS',

  /** 取得帳號資料 - 成功 */
  FETCH_BLACKACCOUNTS_SUCCESS = '@BlackAccountsPage/FETCH_BLACKACCOUNTS_SUCCESS',

  /** 取得帳號資料 - 失敗 */
  FETCH_BLACKACCOUNTS_FAILURE = '@BlackAccountsPage/FETCH_BLACKACCOUNTS_FAILURE',

  /** 取得單一帳號資料 */
  FETCH_BLACKACCOUNT = '@BlackAccountsPage/FETCH_BLACKACCOUNT',

  /** 取得單一帳號資料 - 成功 */
  FETCH_BLACKACCOUNT_SUCCESS = '@BlackAccountsPage/FETCH_BLACKACCOUNT_SUCCESS',

  /** 取得單一帳號資料 - 失敗 */
  FETCH_BLACKACCOUNT_FAILURE = '@BlackAccountsPage/FETCH_BLACKACCOUNT_FAILURE',

  /** 新增帳號資料 */
  CREATE_BLACKACCOUNT = '@BlackAccountsPage/CREATE_BLACKACCOUNT',

  /** 新增帳號資料 - 成功 */
  CREATE_BLACKACCOUNT_SUCCESS = '@BlackAccountsPage/CREATE_BLACKACCOUNT_SUCCESS',

  /** 新增帳號資料 - 失敗 */
  CREATE_BLACKACCOUNT_FAILURE = '@BlackAccountsPage/CREATE_BLACKACCOUNT_FAILURE',

  /** 更新帳號資料 */
  UPDATE_BLACKACCOUNT = '@BlackAccountsPage/UPDATE_BLACKACCOUNT',

  /** 更新帳號資料 - 成功 */
  UPDATE_BLACKACCOUNT_SUCCESS = '@BlackAccountsPage/UPDATE_BLACKACCOUNT_SUCCESS',

  /** 更新帳號資料 - 失敗 */
  UPDATE_BLACKACCOUNT_FAILURE = '@BlackAccountsPage/UPDATE_BLACKACCOUNT_FAILURE',

  /** 刪除帳號資料 */
  DELETE_BLACKACCOUNT = '@BlackAccountsPage/DELETE_BLACKACCOUNT',

  /** 刪除帳號資料 - 成功 */
  DELETE_BLACKACCOUNT_SUCCESS = '@BlackAccountsPage/DELETE_BLACKACCOUNT_SUCCESS',

  /** 刪除帳號資料 - 失敗 */
  DELETE_BLACKACCOUNT_FAILURE = '@BlackAccountsPage/DELETE_BLACKACCOUNT_FAILURE',

  /** 隱藏Modal */
  HIDE_MODAL = '@BlackAccountsPage/HIDE_MODAL',

  /** 顯示新增Modal */
  SHOW_CREATE_MODAL = '@BlackAccountsPage/SHOW_CREATE_MODAL',

  /** 顯示更新Modal */
  SHOW_EDIT_MODAL = '@BlackAccountsPage/SHOW_EDIT_MODAL',

  /** 匯出excel */
  EXPORT_EXCEL = '@BlackAccountsPage/EXPORT_EXCEL',

  /** 匯出ods */
  EXPORT_ODS = '@BlackAccountsPage/EXPORT_ODS',

  /** 顯示電話 */
  SHOW_PHONE_MODAL = '@BlackAccountsPage/SHOW_PHONE_MODAL',

  /** 顯示信箱 */
  SHOW_EMAIL_MODAL = '@BlackAccountsPage/SHOW_EMAIL_MODAL',

  /** 顯示ip */
  SHOW_IP_MODAL = '@BlackAccountsPage/SHOW_IP_MODAL',

  /** 顯示電話成功 */
  SHOW_PHONE_MODAL_SUCCESS = '@BlackAccountsPage/SHOW_PHONE_MODAL_SUCCESS',

  /** 顯示信箱成功 */
  SHOW_EMAIL_MODAL_SUCCESS = '@BlackAccountsPage/SHOW_EMAIL_MODAL_SUCCESS',

  /** 顯示ip成功 */
  SHOW_IP_MODAL_SUCCESS = '@BlackAccountsPage/SHOW_IP_MODAL_SUCCESS',
}

/** BlackAccountsPage Action */
export type BlackAccountsPageAction =
  | ResetPageStateAction
  | InitPageAction
  | InitPageSuccessAction
  | InitPageFailureAction
  | FetchBlackAccountsAction
  | FetchBlackAccountsSuccessAction
  | FetchBlackAccountsFailureAction
  | FetchBlackAccountAction
  | FetchBlackAccountSuccessAction
  | FetchBlackAccountFailureAction
  | CreateBlackAccountAction
  | CreateBlackAccountSuccessAction
  | CreateBlackAccountFailureAction
  | UpdateBlackAccountAction
  | UpdateBlackAccountSuccessAction
  | UpdateBlackAccountFailureAction
  | HideModalAction
  | ShowCreateModalAction
  | ShowEditModalAction
  | ExportExcelAction
  | ExportOdsAction
  | ShowPhoneModalAction
  | ShowEmailModalAction
  | ShowIPModalAction
  | ShowPhoneModalSuccessAction
  | ShowEmailModalSuccessAction
  | ShowIPModalSuccessAction;

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
  payload: {
    RiskLevelOptions: SelectOptionConfig[];
  };
}

/** 初始頁面 - 失敗 */
export interface InitPageFailureAction {
  type: ActionType.INIT_PAGE_FAILURE;
}

/** 取得帳號資料 */
export interface FetchBlackAccountsAction {
  type: ActionType.FETCH_BLACKACCOUNTS;
  payload: { params: FetchBlackAccountsParams };
}

/** 取得帳號資料 - 成功 */
export interface FetchBlackAccountsSuccessAction {
  type: ActionType.FETCH_BLACKACCOUNTS_SUCCESS;
  payload: { response: FetchBlackAccountsResponse };
}

/** 取得帳號資料 - 失敗 */
export interface FetchBlackAccountsFailureAction {
  type: ActionType.FETCH_BLACKACCOUNTS_FAILURE;
}

/** 取得單一帳號資料 */
export interface FetchBlackAccountAction {
  type: ActionType.FETCH_BLACKACCOUNT;
  payload: { userId: string };
}

/** 取得單一帳號資料 - 成功 */
export interface FetchBlackAccountSuccessAction {
  type: ActionType.FETCH_BLACKACCOUNT_SUCCESS;
  payload: { response: FetchBlackAccountResponse };
}

/** 取得單一帳號資料 - 失敗 */
export interface FetchBlackAccountFailureAction {
  type: ActionType.FETCH_BLACKACCOUNT_FAILURE;
}

/** 新增帳號資料 */
export interface CreateBlackAccountAction {
  type: ActionType.CREATE_BLACKACCOUNT;
  payload: { params: CreateBlackAccountParams };
}

/** 新增帳號資料 - 成功 */
export interface CreateBlackAccountSuccessAction {
  type: ActionType.CREATE_BLACKACCOUNT_SUCCESS;
}

/** 新增帳號資料 - 失敗 */
export interface CreateBlackAccountFailureAction {
  type: ActionType.CREATE_BLACKACCOUNT_FAILURE;
}

/** 更新帳號資料 */
export interface UpdateBlackAccountAction {
  type: ActionType.UPDATE_BLACKACCOUNT;
  payload: {
    userId: string;
    params: UpdateBlackAccountParams;
  };
}

/** 更新帳號資料 - 成功 */
export interface UpdateBlackAccountSuccessAction {
  type: ActionType.UPDATE_BLACKACCOUNT_SUCCESS;
}

/** 更新帳號資料 - 失敗 */
export interface UpdateBlackAccountFailureAction {
  type: ActionType.UPDATE_BLACKACCOUNT_FAILURE;
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
  payload: { walletAddress: string };
}

/** 匯出excel */
export interface ExportExcelAction {
  type: ActionType.EXPORT_EXCEL;
  payload: { params: FetchBlackAccountsParams };
}

/** 匯出ods */
export interface ExportOdsAction {
  type: ActionType.EXPORT_ODS;
  payload: { params: FetchBlackAccountsParams };
}

/** 顯示電話Modal */
export interface ShowPhoneModalAction {
  type: ActionType.SHOW_PHONE_MODAL;
  payload: { walletAddress: string };
}

/** 顯示信箱Modal */
export interface ShowEmailModalAction {
  type: ActionType.SHOW_EMAIL_MODAL;
  payload: { walletAddress: string };
}

/** 顯示ipModal */
export interface ShowIPModalAction {
  type: ActionType.SHOW_IP_MODAL;
  payload: { walletAddress: string };
}

/** 顯示電話Modal成功 */
export interface ShowPhoneModalSuccessAction {
  type: ActionType.SHOW_PHONE_MODAL_SUCCESS;
  payload: { response: FetchPhoneShowModalResponse };
}

/** 顯示信箱Modal成功 */
export interface ShowEmailModalSuccessAction {
  type: ActionType.SHOW_EMAIL_MODAL_SUCCESS;
  payload: { response: FetchEmailShowModalResponse };
}

/** 顯示ipModal成功 */
export interface ShowIPModalSuccessAction {
  type: ActionType.SHOW_IP_MODAL_SUCCESS;
  payload: { response: FetchIPShowModalResponse };
}
