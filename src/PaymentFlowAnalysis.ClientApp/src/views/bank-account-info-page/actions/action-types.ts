import {
  FetchBankAccountInfosResponse,
  FetchBankAccountInfoParams,
  FetchParseCsvParams,
} from '@app/apis/admin/bank-account-info';
import { Action, PayloadAction } from '@shared/types';

/** Enum of action's type */
export enum ActionType {
  /** 重置 Page State */
  RESET_PAGE_STATE = '@BankAccountInfosPage/RESET_PAGE_STATE',

  /** 初始頁面 */
  INIT_PAGE = '@BankAccountInfosPage/INIT_PAGE',

  /** 初始頁面 - 成功 */
  INIT_PAGE_SUCCESS = '@BankAccountInfosPage/INIT_PAGE_SUCCESS',

  /** 初始頁面 - 失敗 */
  INIT_PAGE_FAILURE = '@BankAccountInfosPage/INIT_PAGE_FAILURE',

  /** 取得帳號資料 */
  FETCH_BANKACCOUNTINFOS = '@BankAccountInfosPage/FETCH_BANKACCOUNTINFOS',

  /** 取得帳號資料 - 成功 */
  FETCH_BANKACCOUNTINFOS_SUCCESS = '@BankAccountInfosPage/FETCH_BANKACCOUNTINFOS_SUCCESS',

  /** 取得帳號資料 - 失敗 */
  FETCH_BANKACCOUNTINFOS_FAILURE = '@BankAccountInfosPage/FETCH_BANKACCOUNTINFOS_FAILURE',

  /** 隱藏Modal */
  HIDE_MODAL = '@BankAccountInfosPage/HIDE_MODAL',

  /** 顯示新增Modal */
  SHOW_CREATE_MODAL = '@BankAccountInfosPage/SHOW_CREATE_MODAL',

  /** 顯示更新Modal */
  SHOW_EDIT_MODAL = '@BankAccountInfosPage/SHOW_EDIT_MODAL',

  /** 匯出excel */
  EXPORT_EXCEL = '@BankAccountInfosPage/EXPORT_EXCEL',

  /** 匯出excel */
  EXPORT_ODS = '@BankAccountInfosPage/EXPORT_ODS',

  /** 匯入csv */
  PARSE_CSV = '@BankAccountInfosPage/PARSE_CSV',

  /** 本案相關帳戶 */
  IS_ACCOUNT_MARK = '@BankAccountInfosPage/IS_ACCOUNT_MARK',

  /** 本案相關帳戶 - 成功 */
  IS_ACCOUNT_MARK_SUCCESS = '@BankAccountInfosPage/IS_ACCOUNT_MARK_SUCCESS',
}

/** BankAccountInfosPage Action */
export type BankAccountInfoPageAction =
  | ResetPageStateAction
  | InitPageAction
  | InitPageSuccessAction
  | InitPageFailureAction
  | FetchBankAccountInfosAction
  | FetchBankAccountInfosSuccessAction
  | FetchBankAccountInfosFailureAction
  | HideModalAction
  | ShowCreateModalAction
  | ShowEditModalAction
  | ExportExcelAction
  | IsAccountMarkSuccessAction;

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

/** 取得帳號資料 */
export interface FetchBankAccountInfosAction {
  type: ActionType.FETCH_BANKACCOUNTINFOS;
  payload: { params: FetchBankAccountInfoParams };
}

/** 取得帳號資料 - 成功 */
export interface FetchBankAccountInfosSuccessAction {
  type: ActionType.FETCH_BANKACCOUNTINFOS_SUCCESS;
  payload: { response: FetchBankAccountInfosResponse };
}

/** 取得帳號資料 - 失敗 */
export interface FetchBankAccountInfosFailureAction {
  type: ActionType.FETCH_BANKACCOUNTINFOS_FAILURE;
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

/** 匯出excel */
export interface ExportExcelAction {
  type: ActionType.EXPORT_EXCEL;
  payload: { params: FetchBankAccountInfoParams };
}

/** 匯出excel */
export interface ExportOdsAction {
  type: ActionType.EXPORT_ODS;
  payload: { params: FetchBankAccountInfoParams };
}

/** 匯入csv */
export interface ParseCsvAction {
  type: ActionType.PARSE_CSV;
  payload: { params: FetchParseCsvParams };
}

/** 本案相關帳戶 */
export interface IsAccountMarkAction {
  type: ActionType.IS_ACCOUNT_MARK;
  payload: { seq: string; isAccountMark: boolean };
}

/** 本案相關帳戶 - 成功 */
export interface IsAccountMarkSuccessAction {
  type: ActionType.IS_ACCOUNT_MARK_SUCCESS;
}
