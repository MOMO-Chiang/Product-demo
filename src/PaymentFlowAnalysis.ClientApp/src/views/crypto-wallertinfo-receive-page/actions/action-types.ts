import {
  FetchCryptoWallertInfoReceivesResponse,
  FetchCryptoWallertInfoReceiveParams,
} from '@app/apis/admin/crypto-wallertinfo-receive';
import { Action, PayloadAction, SelectOptionConfig } from '@shared/types';

/** Enum of action's type */
export enum ActionType {
  /** 重置 Page State */
  RESET_PAGE_STATE = '@CryptoWallertInfoReceivesPage/RESET_PAGE_STATE',

  /** 初始頁面 */
  INIT_PAGE = '@CryptoWallertInfoReceivesPage/INIT_PAGE',

  /** 初始頁面 - 成功 */
  INIT_PAGE_SUCCESS = '@CryptoWallertInfoReceivesPage/INIT_PAGE_SUCCESS',

  /** 初始頁面 - 失敗 */
  INIT_PAGE_FAILURE = '@CryptoWallertInfoReceivesPage/INIT_PAGE_FAILURE',

  /** 取得帳號資料 */
  FETCH_CRYPTOWALLERTINFORECEIVES = '@CryptoWallertInfoReceivesPage/FETCH_CRYPTOWALLERTINFORECEIVES',

  /** 取得帳號資料 - 成功 */
  FETCH_CRYPTOWALLERTINFORECEIVES_SUCCESS = '@CryptoWallertInfoReceivesPage/FETCH_CRYPTOWALLERTINFORECEIVES_SUCCESS',

  /** 取得帳號資料 - 失敗 */
  FETCH_CRYPTOWALLERTINFORECEIVES_FAILURE = '@CryptoWallertInfoReceivesPage/FETCH_CRYPTOWALLERTINFORECEIVES_FAILURE',

  /** 隱藏Modal */
  HIDE_MODAL = '@CryptoWallertInfoReceivesPage/HIDE_MODAL',

  /** 顯示新增Modal */
  SHOW_CREATE_MODAL = '@CryptoWallertInfoReceivesPage/SHOW_CREATE_MODAL',

  /** 顯示更新Modal */
  SHOW_EDIT_MODAL = '@CryptoWallertInfoReceivesPage/SHOW_EDIT_MODAL',

  /** 匯出excel */
  EXPORT_EXCEL = '@CryptoWallertInfoReceivesPage/EXPORT_EXCEL',

  /** 匯出ods */
  EXPORT_ODS = '@CryptoWallertInfoReceivesPage/EXPORT_ODS',
}

/** CryptoWallertInfoReceivesPage Action */
export type CryptoWallertInfoReceivePageAction =
  | ResetPageStateAction
  | InitPageAction
  | InitPageSuccessAction
  | InitPageFailureAction
  | FetchCryptoWallertInfoReceivesAction
  | FetchCryptoWallertInfoReceivesSuccessAction
  | FetchCryptoWallertInfoReceivesFailureAction
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
    /** 資料來源機構下拉選單 */
    ExchangeTypeCodeOptions: SelectOptionConfig[];
  };
}

/** 初始頁面 - 失敗 */
export interface InitPageFailureAction {
  type: ActionType.INIT_PAGE_FAILURE;
}

/** 取得帳號資料 */
export interface FetchCryptoWallertInfoReceivesAction {
  type: ActionType.FETCH_CRYPTOWALLERTINFORECEIVES;
  payload: { params: FetchCryptoWallertInfoReceiveParams };
}

/** 取得帳號資料 - 成功 */
export interface FetchCryptoWallertInfoReceivesSuccessAction {
  type: ActionType.FETCH_CRYPTOWALLERTINFORECEIVES_SUCCESS;
  payload: { response: FetchCryptoWallertInfoReceivesResponse };
}

/** 取得帳號資料 - 失敗 */
export interface FetchCryptoWallertInfoReceivesFailureAction {
  type: ActionType.FETCH_CRYPTOWALLERTINFORECEIVES_FAILURE;
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
  payload: { params: FetchCryptoWallertInfoReceiveParams };
}

/** 匯出ods */
export interface ExportOdsAction {
  type: ActionType.EXPORT_ODS;
  payload: { params: FetchCryptoWallertInfoReceiveParams };
}
