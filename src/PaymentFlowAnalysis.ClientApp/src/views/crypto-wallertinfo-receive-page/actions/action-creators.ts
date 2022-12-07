import {
  FetchCryptoWallertInfoReceiveParams,
  FetchCryptoWallertInfoReceivesResponse,
} from '@app/apis/admin/crypto-wallertinfo-receive';
import { SelectOptionConfig } from '@shared/types';
import { ShowCreateModalAction } from '.';
import {
  ActionType,
  FetchCryptoWallertInfoReceivesAction,
  FetchCryptoWallertInfoReceivesFailureAction,
  FetchCryptoWallertInfoReceivesSuccessAction,
  HideModalAction,
  ShowEditModalAction,
  CryptoWallertInfoReceivePageAction,
  ExportExcelAction,
  ExportOdsAction,
} from './action-types';

/** 重置 Page State */
export const resetPageStateActionCreator = (): CryptoWallertInfoReceivePageAction => ({
  type: ActionType.RESET_PAGE_STATE,
});

/** 初始頁面 */
export const initPageActionCreator = (): CryptoWallertInfoReceivePageAction => ({
  type: ActionType.INIT_PAGE,
});

/** 初始頁面 - 成功 */
export const initPageSuccessActionCreator = (payload: {
  /** 資料來源機構下拉選單 */
  ExchangeTypeCodeOptions: SelectOptionConfig[];
}): CryptoWallertInfoReceivePageAction => ({
  type: ActionType.INIT_PAGE_SUCCESS,
  payload,
});

/** 初始頁面 - 失敗 */
export const initPageFailureActionCreator = (): CryptoWallertInfoReceivePageAction => ({
  type: ActionType.INIT_PAGE_FAILURE,
});

/** 取得帳號資料 */
export const fetchCryptoWallertInfoReceivesActionCreator = (
  params: FetchCryptoWallertInfoReceiveParams,
): FetchCryptoWallertInfoReceivesAction => ({
  type: ActionType.FETCH_CRYPTOWALLERTINFORECEIVES,
  payload: { params },
});

/** 取得帳號資料 - 成功 */
export const fetchCryptoWallertInfoReceivesSuccessActionCreator = (
  response: FetchCryptoWallertInfoReceivesResponse,
): FetchCryptoWallertInfoReceivesSuccessAction => ({
  type: ActionType.FETCH_CRYPTOWALLERTINFORECEIVES_SUCCESS,
  payload: { response },
});

/** 取得帳號資料 - 失敗 */
export const fetchCryptoWallertInfoReceivesFailureActionCreator = (): FetchCryptoWallertInfoReceivesFailureAction => ({
  type: ActionType.FETCH_CRYPTOWALLERTINFORECEIVES_FAILURE,
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

/** 匯出excel */
export const exportExcelActionCreator = (params: FetchCryptoWallertInfoReceiveParams): ExportExcelAction => ({
  type: ActionType.EXPORT_EXCEL,
  payload: { params },
});

/** 匯出ods */
export const exportOdsActionCreator = (params: FetchCryptoWallertInfoReceiveParams): ExportOdsAction => ({
  type: ActionType.EXPORT_ODS,
  payload: { params },
});
