import { FetchCryptoQueryParams, FetchCryptoQuerysResponse } from '@app/apis/admin/crypto-query';
import { SelectOptionConfig } from '@shared/types';
import { ShowCreateModalAction } from '.';
import {
  ActionType,
  FetchCryptoQuerysAction,
  FetchCryptoQuerysFailureAction,
  FetchCryptoQuerysSuccessAction,
  HideModalAction,
  ShowEditModalAction,
  CryptoQueryPageAction,
  ExportExcelAction,
  ExportOdsAction,
} from './action-types';

/** 重置 Page State */
export const resetPageStateActionCreator = (): CryptoQueryPageAction => ({
  type: ActionType.RESET_PAGE_STATE,
});

/** 初始頁面 */
export const initPageActionCreator = (): CryptoQueryPageAction => ({
  type: ActionType.INIT_PAGE,
});

/** 初始頁面 - 成功 */
export const initPageSuccessActionCreator = (payload: {
  /** 目標機構下拉選單 */
  ExchangeTypeCodeOptions: SelectOptionConfig[];
  /** 拋查條件下拉選單 */
  QueryConditionCodeOptions: SelectOptionConfig[];
}): CryptoQueryPageAction => ({
  type: ActionType.INIT_PAGE_SUCCESS,
  payload,
});

/** 初始頁面 - 失敗 */
export const initPageFailureActionCreator = (): CryptoQueryPageAction => ({
  type: ActionType.INIT_PAGE_FAILURE,
});

/** 取得帳號資料 */
export const fetchCryptoQuerysActionCreator = (params: FetchCryptoQueryParams): FetchCryptoQuerysAction => ({
  type: ActionType.FETCH_CRYPTOQUERYS,
  payload: { params },
});

/** 取得帳號資料 - 成功 */
export const fetchCryptoQuerysSuccessActionCreator = (response: FetchCryptoQuerysResponse): FetchCryptoQuerysSuccessAction => ({
  type: ActionType.FETCH_CRYPTOQUERYS_SUCCESS,
  payload: { response },
});

/** 取得帳號資料 - 失敗 */
export const fetchCryptoQuerysFailureActionCreator = (): FetchCryptoQuerysFailureAction => ({
  type: ActionType.FETCH_CRYPTOQUERYS_FAILURE,
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
export const exportExcelActionCreator = (params: FetchCryptoQueryParams): ExportExcelAction => ({
  type: ActionType.EXPORT_EXCEL,
  payload: { params },
});

/** 匯出ods */
export const exportOdsActionCreator = (params: FetchCryptoQueryParams): ExportOdsAction => ({
  type: ActionType.EXPORT_ODS,
  payload: { params },
});
