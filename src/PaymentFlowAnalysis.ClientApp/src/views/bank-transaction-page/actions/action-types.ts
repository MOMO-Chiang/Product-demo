import {
  FetchBankTransactionsResponse,
  FetchBankTransactionParams,
  FetchParseCsvParams,
  FetchBankTransactionsDetailResponse,
  FetchBankTransactionDetailParams,
} from '@app/apis/admin/bank-transaction';
import { Action, PayloadAction } from '@shared/types';

/** Enum of action's type */
export enum ActionType {
  /** 重置 Page State */
  RESET_PAGE_STATE = '@BankTransactionsPage/RESET_PAGE_STATE',

  /** 初始頁面 */
  INIT_PAGE = '@BankTransactionsPage/INIT_PAGE',

  /** 初始頁面 - 成功 */
  INIT_PAGE_SUCCESS = '@BankTransactionsPage/INIT_PAGE_SUCCESS',

  /** 初始頁面 - 失敗 */
  INIT_PAGE_FAILURE = '@BankTransactionsPage/INIT_PAGE_FAILURE',

  /** 取得帳號資料 */
  FETCH_BANKTRANSACTIONS = '@BankTransactionsPage/FETCH_BANKTRANSACTIONS',

  /** 取得帳號資料 - 成功 */
  FETCH_BANKTRANSACTIONS_SUCCESS = '@BankTransactionsPage/FETCH_BANKTRANSACTIONS_SUCCESS',

  /** 取得帳號資料 - 失敗 */
  FETCH_BANKTRANSACTIONS_FAILURE = '@BankTransactionsPage/FETCH_BANKTRANSACTIONS_FAILURE',

  /** 隱藏Modal */
  HIDE_MODAL = '@BankTransactionsPage/HIDE_MODAL',

  /** 顯示新增Modal */
  SHOW_CREATE_MODAL = '@BankTransactionsPage/SHOW_CREATE_MODAL',

  /** 顯示更新Modal */
  SHOW_EDIT_MODAL = '@BankTransactionsPage/SHOW_EDIT_MODAL',

  /** 匯出excel */
  EXPORT_EXCEL = '@BankTransactionsPage/EXPORT_EXCEL',

  /** 匯出excel */
  EXPORT_ODS = '@BankTransactionsPage/EXPORT_ODS',

  /** 匯入csv */
  PARSE_CSV = '@BankTransactionsPage/PARSE_CSV',
}

/** BankTransactionsPage Action */
export type BankTransactionPageAction =
  | ResetPageStateAction
  | InitPageAction
  | InitPageSuccessAction
  | InitPageFailureAction
  | FetchBankTransactionsAction
  | FetchBankTransactionsSuccessAction
  | FetchBankTransactionsFailureAction
  | HideModalAction
  | ShowCreateModalAction
  | ShowEditModalAction
  | ExportExcelAction;

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
export interface FetchBankTransactionsAction {
  type: ActionType.FETCH_BANKTRANSACTIONS;
  payload: { params: FetchBankTransactionParams };
}

/** 取得帳號資料 - 成功 */
export interface FetchBankTransactionsSuccessAction {
  type: ActionType.FETCH_BANKTRANSACTIONS_SUCCESS;
  payload: { response: FetchBankTransactionsResponse };
}

/** 取得帳號資料 - 失敗 */
export interface FetchBankTransactionsFailureAction {
  type: ActionType.FETCH_BANKTRANSACTIONS_FAILURE;
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
  payload: { params: FetchBankTransactionParams };
}

/** 匯出excel */
export interface ExportOdsAction {
  type: ActionType.EXPORT_ODS;
  payload: { params: FetchBankTransactionParams };
}

/** 匯入csv */
export interface ParseCsvAction {
  type: ActionType.PARSE_CSV;
  payload: { params: FetchParseCsvParams };
}
