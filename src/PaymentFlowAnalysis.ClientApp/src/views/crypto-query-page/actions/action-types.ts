import { FetchCryptoQuerysResponse, FetchCryptoQueryParams } from '@app/apis/admin/crypto-query';
import { Action, PayloadAction, SelectOptionConfig } from '@shared/types';

/** Enum of action's type */
export enum ActionType {
  /** 重置 Page State */
  RESET_PAGE_STATE = '@CryptoQuerysPage/RESET_PAGE_STATE',

  /** 初始頁面 */
  INIT_PAGE = '@CryptoQuerysPage/INIT_PAGE',

  /** 初始頁面 - 成功 */
  INIT_PAGE_SUCCESS = '@CryptoQuerysPage/INIT_PAGE_SUCCESS',

  /** 初始頁面 - 失敗 */
  INIT_PAGE_FAILURE = '@CryptoQuerysPage/INIT_PAGE_FAILURE',

  /** 取得帳號資料 */
  FETCH_CRYPTOQUERYS = '@CryptoQuerysPage/FETCH_CRYPTOQUERYS',

  /** 取得帳號資料 - 成功 */
  FETCH_CRYPTOQUERYS_SUCCESS = '@CryptoQuerysPage/FETCH_CRYPTOQUERYS_SUCCESS',

  /** 取得帳號資料 - 失敗 */
  FETCH_CRYPTOQUERYS_FAILURE = '@CryptoQuerysPage/FETCH_CRYPTOQUERYS_FAILURE',

  /** 隱藏Modal */
  HIDE_MODAL = '@CryptoQuerysPage/HIDE_MODAL',

  /** 顯示新增Modal */
  SHOW_CREATE_MODAL = '@CryptoQuerysPage/SHOW_CREATE_MODAL',

  /** 顯示更新Modal */
  SHOW_EDIT_MODAL = '@CryptoQuerysPage/SHOW_EDIT_MODAL',

  /** 匯出excel */
  EXPORT_EXCEL = '@CryptoQuerysPage/EXPORT_EXCEL',

  /** 匯出ods */
  EXPORT_ODS = '@CryptoQuerysPage/EXPORT_ODS',
}

/** CryptoQuerysPage Action */
export type CryptoQueryPageAction =
  | ResetPageStateAction
  | InitPageAction
  | InitPageSuccessAction
  | InitPageFailureAction
  | FetchCryptoQuerysAction
  | FetchCryptoQuerysSuccessAction
  | FetchCryptoQuerysFailureAction
  | HideModalAction
  | ShowCreateModalAction
  | ShowEditModalAction
  | ExportExcelAction
  | ExportOdsAction;

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
    /** 目標機構下拉選單 */
    ExchangeTypeCodeOptions: SelectOptionConfig[];
    /** 拋查條件下拉選單 */
    QueryConditionCodeOptions: SelectOptionConfig[];
  };
}

/** 初始頁面 - 失敗 */
export interface InitPageFailureAction {
  type: ActionType.INIT_PAGE_FAILURE;
}

/** 取得帳號資料 */
export interface FetchCryptoQuerysAction {
  type: ActionType.FETCH_CRYPTOQUERYS;
  payload: { params: FetchCryptoQueryParams };
}

/** 取得帳號資料 - 成功 */
export interface FetchCryptoQuerysSuccessAction {
  type: ActionType.FETCH_CRYPTOQUERYS_SUCCESS;
  payload: { response: FetchCryptoQuerysResponse };
}

/** 取得帳號資料 - 失敗 */
export interface FetchCryptoQuerysFailureAction {
  type: ActionType.FETCH_CRYPTOQUERYS_FAILURE;
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
  payload: { params: FetchCryptoQueryParams };
}

/** 匯出ods */
export interface ExportOdsAction {
  type: ActionType.EXPORT_ODS;
  payload: { params: FetchCryptoQueryParams };
}
