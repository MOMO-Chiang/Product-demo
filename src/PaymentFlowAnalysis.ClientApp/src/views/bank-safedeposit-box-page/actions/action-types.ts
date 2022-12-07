import {
  FetchBankSafeDepositBoxsResponse,
  FetchBankSafeDepositBoxParams,
  FetchParseCsvParams,
} from '@app/apis/admin/bank-safedeposit-box';
import { Action, PayloadAction } from '@shared/types';

/** Enum of action's type */
export enum ActionType {
  /** 重置 Page State */
  RESET_PAGE_STATE = '@BankSafeDepositBoxsPage/RESET_PAGE_STATE',

  /** 初始頁面 */
  INIT_PAGE = '@BankSafeDepositBoxsPage/INIT_PAGE',

  /** 初始頁面 - 成功 */
  INIT_PAGE_SUCCESS = '@BankSafeDepositBoxsPage/INIT_PAGE_SUCCESS',

  /** 初始頁面 - 失敗 */
  INIT_PAGE_FAILURE = '@BankSafeDepositBoxsPage/INIT_PAGE_FAILURE',

  /** 取得帳號資料 */
  FETCH_BANKSAFEDEPOSITBOXS = '@BankSafeDepositBoxsPage/FETCH_BANKSAFEDEPOSITBOXS',

  /** 取得帳號資料 - 成功 */
  FETCH_BANKSAFEDEPOSITBOXS_SUCCESS = '@BankSafeDepositBoxsPage/FETCH_BANKSAFEDEPOSITBOXS_SUCCESS',

  /** 取得帳號資料 - 失敗 */
  FETCH_BANKSAFEDEPOSITBOXS_FAILURE = '@BankSafeDepositBoxsPage/FETCH_BANKSAFEDEPOSITBOXS_FAILURE',

  /** 隱藏Modal */
  HIDE_MODAL = '@BankSafeDepositBoxsPage/HIDE_MODAL',

  /** 顯示新增Modal */
  SHOW_CREATE_MODAL = '@BankSafeDepositBoxsPage/SHOW_CREATE_MODAL',

  /** 顯示更新Modal */
  SHOW_EDIT_MODAL = '@BankSafeDepositBoxsPage/SHOW_EDIT_MODAL',

  /** 匯出excel */
  EXPORT_EXCEL = '@BankSafeDepositBoxsPage/EXPORT_EXCEL',

  /** 匯出ods */
  EXPORT_ODS = '@BankSafeDepositBoxsPage/EXPORT_ODS',

  /** 匯入csv */
  PARSE_CSV = '@BankSafeDepositBoxsPage/PARSE_CSV',

  /** 本案相關帳戶 */
  IS_ACCOUNT_MARK = '@BankAccountInfosPage/IS_ACCOUNT_MARK',

  /** 本案相關帳戶 - 成功 */
  IS_ACCOUNT_MARK_SUCCESS = '@BankAccountInfosPage/IS_ACCOUNT_MARK_SUCCESS',
}

/** BankSafeDepositBoxsPage Action */
export type BankSafeDepositBoxPageAction =
  | ResetPageStateAction
  | InitPageAction
  | InitPageSuccessAction
  | InitPageFailureAction
  | FetchBankSafeDepositBoxsAction
  | FetchBankSafeDepositBoxsSuccessAction
  | FetchBankSafeDepositBoxsFailureAction
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
export interface FetchBankSafeDepositBoxsAction {
  type: ActionType.FETCH_BANKSAFEDEPOSITBOXS;
  payload: { params: FetchBankSafeDepositBoxParams };
}

/** 取得帳號資料 - 成功 */
export interface FetchBankSafeDepositBoxsSuccessAction {
  type: ActionType.FETCH_BANKSAFEDEPOSITBOXS_SUCCESS;
  payload: { response: FetchBankSafeDepositBoxsResponse };
}

/** 取得帳號資料 - 失敗 */
export interface FetchBankSafeDepositBoxsFailureAction {
  type: ActionType.FETCH_BANKSAFEDEPOSITBOXS_FAILURE;
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
  payload: { params: FetchBankSafeDepositBoxParams };
}

/** 匯出ods */
export interface ExportOdsAction {
  type: ActionType.EXPORT_ODS;
  payload: { params: FetchBankSafeDepositBoxParams };
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
