import {
  CreateSearchParams,
  CreateSearchResponse,
  FetchCryptoTransactionInfosParams,
  FetchCryptoTransactionInfosResponse,
  FetchCryptoTransactionInfoHistoryResponse,
  FetchCryptoPersonalSearchHistoryParams,
  FetchDetailNumberShowModalResponse,
} from '@app/apis/admin/crypto-transaction-info';
import { Action, PayloadAction } from '@shared/types';

/** Enum of action's type */

export enum ActionType {
  /** 重置 Page State */
  RESET_PAGE_STATE = '@CryptoTransactionInfoPage/RESET_PAGE_STATE',

  /** 初始頁面 */
  INIT_PAGE = '@CryptoTransactionInfoPage/INIT_PAGE',

  /** 初始頁面 - 成功 */
  INIT_PAGE_SUCCESS = '@CryptoTransactionInfoPage/INIT_PAGE_SUCCESS',

  /** 初始頁面 - 失敗 */
  INIT_PAGE_FAILURE = '@CryptoTransactionInfoPage/INIT_PAGE_FAILURE',

  /** 取得交易調閱資料 */
  FETCH_CRYPTOTRANSACTIONINFOS = '@CryptoTransactionInfoPage/FETCH_CRYPTOTRANSACTIONINFOS',

  /** 取得交易調閱資料 - 成功 */
  FETCH_CRYPTOTRANSACTIONINFOS_SUCCESS = '@CryptoTransactionInfoPage/FETCH_CRYPTOTRANSACTIONINFOS_SUCCESS',

  /** 取得交易調閱資料 - 失敗 */
  FETCH_CRYPTOTRANSACTIONINFOS_FAILURE = '@CryptoTransactionInfoPage/FETCH_CRYPTOTRANSACTIONINFOS_FAILURE',

  /** 取得交易歷史調閱資料 */
  FETCH_HISTORYCRYPTOTRANSACTIONINFOS = '@CryptoTransactionInfoPage/FETCH_HISTORYCRYPTOTRANSACTIONINFOS',

  /** 取得交易歷史調閱資料 - 成功 */
  FETCH_HISTORYCRYPTOTRANSACTIONINFOS_SUCCESS = '@CryptoTransactionInfoPage/FETCH_HISTORYCRYPTOTRANSACTIONINFOS_SUCCESS',

  /** 取得交易歷史調閱資料 - 失敗 */
  FETCH_HISTORYCRYPTOTRANSACTIONINFOS_FAILURE = '@CryptoTransactionInfoPage/FETCH_HISTORYCRYPTOTRANSACTIONINFOS_FAILURE',

  /** 展開明細資料 */
  EXPAND_DETAIL = '@CryptoTransactionInfoPage/EXPAND_DETAIL',

  /** 取得單一交易調閱資料 */
  FETCH_CRYPTOTRANSACTIONINFO = '@CryptoTransactionInfoPage/FETCH_CRYPTOTRANSACTIONINFO',

  /** 取得單一交易調閱資料 - 成功 */
  FETCH_CRYPTOTRANSACTIONINFO_SUCCESS = '@CryptoTransactionInfoPage/FETCH_CRYPTOTRANSACTIONINFO_SUCCESS',

  /** 取得單一交易調閱資料 - 失敗 */
  FETCH_CRYPTOTRANSACTIONINFO_FAILURE = '@CryptoTransactionInfoPage/FETCH_CRYPTOTRANSACTIONINFO_FAILURE',

  /** 執行拋查 */
  FETCH_CREATETRANSACTIONSEARCH = '@CryptoTransactionInfoPage/FETCH_CREATETRANSACTIONSEARCH',

  /** 執行拋查 - 成功 */
  FETCH_CREATETRANSACTIONSEARCH_SUCCESS = '@CryptoTransactionInfoPage/FETCH_CREATETRANSACTIONSEARCH_SUCCESS',

  /** 執行拋查 - 失敗 */
  FETCH_CREATETRANSACTIONSEARCH_FAILURE = '@CryptoTransactionInfoPage/FETCH_CREATETRANSACTIONSEARCH_FAILURE',

  /** 匯出excel */
  EXPORT_EXCEL = '@CryptoPersonalInfoPage/EXPORT_EXCEL',

  /** 匯出ods */
  EXPORT_ODS = '@CryptoPersonalInfoPage/EXPORT_ODS',

  /** 顯示DetailNumber */
  SHOW_DETAILNUMBER_MODAL = '@CryptoPersonalInfoPage/SHOW_DETAILNUMBER_MODAL',

  /** 顯示DetailNumber成功 */
  SHOW_DETAILNUMBER_MODAL_SUCCESS = '@CryptoPersonalInfoPage/SHOW_DETAILNUMBER_MODAL_SUCCESS',
}

/** CryptoTransactionInfoPage Action */
export type CryptoTransactionInfoPageAction =
  | ResetPageStateAction
  | InitPageAction
  | InitPageSuccessAction
  | InitPageFailureAction
  | ExpandDetailAction
  | FetchCryptoTransactionInfosAction
  | FetchCryptoTransactionInfosSuccessAction
  | FetchCryptoTransactionInfosFailureAction
  | FetchHistoryCryptoTransactionInfosAction
  | FetchHistoryCryptoTransactionInfosSuccessAction
  | FetchHistoryCryptoTransactionInfosFailureAction
  | FetchCreateTransactionSearchAction
  | FetchCreateTransactionSearchSuccessAction
  | FetchCreateTransactionSearchFailureAction
  | ExportExcelAction
  | ExportOdsAction
  | ShowDetailNumberModalAction
  | ShowDetailNumberModalSuccessAction;

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

/** 取得交易調閱資料 */
export interface FetchCryptoTransactionInfosAction {
  type: ActionType.FETCH_CRYPTOTRANSACTIONINFOS;
  payload: { params: FetchCryptoTransactionInfosParams };
}

/** 取得交易調閱資料 - 成功 */
export interface FetchCryptoTransactionInfosSuccessAction {
  type: ActionType.FETCH_CRYPTOTRANSACTIONINFOS_SUCCESS;
  payload: { response: FetchCryptoTransactionInfosResponse };
}

/** 取得交易調閱資料 - 失敗 */
export interface FetchCryptoTransactionInfosFailureAction {
  type: ActionType.FETCH_CRYPTOTRANSACTIONINFOS_FAILURE;
}

/** 取得交易歷史調閱資料 */
export interface FetchHistoryCryptoTransactionInfosAction {
  type: ActionType.FETCH_HISTORYCRYPTOTRANSACTIONINFOS;
  payload: { params: FetchCryptoPersonalSearchHistoryParams };
}

/** 取得交易歷史調閱資料 - 成功 */
export interface FetchHistoryCryptoTransactionInfosSuccessAction {
  type: ActionType.FETCH_HISTORYCRYPTOTRANSACTIONINFOS_SUCCESS;
  payload: { response: FetchCryptoTransactionInfoHistoryResponse };
}

/** 取得交易歷史調閱資料 - 失敗 */
export interface FetchHistoryCryptoTransactionInfosFailureAction {
  type: ActionType.FETCH_HISTORYCRYPTOTRANSACTIONINFOS_FAILURE;
}

/** 執行拋查 */
export interface FetchCreateTransactionSearchAction {
  type: ActionType.FETCH_CREATETRANSACTIONSEARCH;
  payload: { params: CreateSearchParams };
}

/** 執行拋查 - 成功 */
export interface FetchCreateTransactionSearchSuccessAction {
  type: ActionType.FETCH_CREATETRANSACTIONSEARCH_SUCCESS;
  payload: { response: CreateSearchResponse };
}

/** 執行拋查 - 失敗 */
export interface FetchCreateTransactionSearchFailureAction {
  type: ActionType.FETCH_CREATETRANSACTIONSEARCH_FAILURE;
}

/** 匯出excel */
export interface ExportExcelAction {
  type: ActionType.EXPORT_EXCEL;
  payload: { params: FetchCryptoTransactionInfosParams };
}

/** 匯出ods */
export interface ExportOdsAction {
  type: ActionType.EXPORT_ODS;
  payload: { params: FetchCryptoTransactionInfosParams };
}

/** 顯示DetailNumberModal */
export interface ShowDetailNumberModalAction {
  type: ActionType.SHOW_DETAILNUMBER_MODAL;
  payload: { Seq: string };
}

/** 顯示DetailNumberModal成功 */
export interface ShowDetailNumberModalSuccessAction {
  type: ActionType.SHOW_DETAILNUMBER_MODAL_SUCCESS;
  payload: { response: FetchDetailNumberShowModalResponse };
}
