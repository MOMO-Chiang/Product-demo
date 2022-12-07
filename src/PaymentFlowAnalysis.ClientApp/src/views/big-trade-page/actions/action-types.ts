import { FetchBigTradesResponse, FetchBigTradeParams, FetchParseXlsParams } from '@app/apis/admin/big-trade';
import { Action, PayloadAction } from '@shared/types';

/** Enum of action's type */
export enum ActionType {
  /** 重置 Page State */
  RESET_PAGE_STATE = '@BigTradesPage/RESET_PAGE_STATE',

  /** 初始頁面 */
  INIT_PAGE = '@BigTradesPage/INIT_PAGE',

  /** 初始頁面 - 成功 */
  INIT_PAGE_SUCCESS = '@BigTradesPage/INIT_PAGE_SUCCESS',

  /** 初始頁面 - 失敗 */
  INIT_PAGE_FAILURE = '@BigTradesPage/INIT_PAGE_FAILURE',

  /** 取得帳號資料 */
  FETCH_BIGTRADES = '@BigTradesPage/FETCH_BIGTRADES',

  /** 取得帳號資料 - 成功 */
  FETCH_BIGTRADES_SUCCESS = '@BigTradesPage/FETCH_BIGTRADES_SUCCESS',

  /** 取得帳號資料 - 失敗 */
  FETCH_BIGTRADES_FAILURE = '@BigTradesPage/FETCH_BIGTRADES_FAILURE',

  /** 隱藏Modal */
  HIDE_MODAL = '@BigTradesPage/HIDE_MODAL',

  /** 顯示新增Modal */
  SHOW_CREATE_MODAL = '@BigTradesPage/SHOW_CREATE_MODAL',

  /** 顯示更新Modal */
  SHOW_EDIT_MODAL = '@BigTradesPage/SHOW_EDIT_MODAL',

  /** 匯出excel */
  EXPORT_EXCEL = '@BigTradesPage/EXPORT_EXCEL',

  /** 匯出ods */
  EXPORT_ODS = '@BigTradesPage/EXPORT_ODS',

  /** 匯入xls */
  PARSE_XLS = '@BigTradesPage/PARSE_XLS',
}

/** BigTradesPage Action */
export type BigTradePageAction =
  | ResetPageStateAction
  | InitPageAction
  | InitPageSuccessAction
  | InitPageFailureAction
  | FetchBigTradesAction
  | FetchBigTradesSuccessAction
  | FetchBigTradesFailureAction
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
export interface FetchBigTradesAction {
  type: ActionType.FETCH_BIGTRADES;
  payload: { params: FetchBigTradeParams };
}

/** 取得帳號資料 - 成功 */
export interface FetchBigTradesSuccessAction {
  type: ActionType.FETCH_BIGTRADES_SUCCESS;
  payload: { response: FetchBigTradesResponse };
}

/** 取得帳號資料 - 失敗 */
export interface FetchBigTradesFailureAction {
  type: ActionType.FETCH_BIGTRADES_FAILURE;
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
  payload: { params: FetchBigTradeParams };
}

/** 匯出ods */
export interface ExportOdsAction {
  type: ActionType.EXPORT_ODS;
  payload: { params: FetchBigTradeParams };
}

/** 匯入xls */
export interface ParseXlsAction {
  type: ActionType.PARSE_XLS;
  payload: { params: FetchParseXlsParams };
}
