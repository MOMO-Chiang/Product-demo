import { FetchBigTradeParams, FetchBigTradesResponse, FetchParseXlsParams } from '@app/apis/admin/big-trade';
import { ShowCreateModalAction } from '.';
import {
  ActionType,
  FetchBigTradesAction,
  FetchBigTradesFailureAction,
  FetchBigTradesSuccessAction,
  HideModalAction,
  ShowEditModalAction,
  BigTradePageAction,
  ExportExcelAction,
  ParseXlsAction,
  ExportOdsAction,
} from './action-types';

/** 重置 Page State */
export const resetPageStateActionCreator = (): BigTradePageAction => ({
  type: ActionType.RESET_PAGE_STATE,
});

/** 初始頁面 */
export const initPageActionCreator = (): BigTradePageAction => ({
  type: ActionType.INIT_PAGE,
});

/** 初始頁面 - 成功 */
export const initPageSuccessActionCreator = (): BigTradePageAction => ({
  type: ActionType.INIT_PAGE_SUCCESS,
});

/** 初始頁面 - 失敗 */
export const initPageFailureActionCreator = (): BigTradePageAction => ({
  type: ActionType.INIT_PAGE_FAILURE,
});

/** 取得帳號資料 */
export const fetchBigTradesActionCreator = (params: FetchBigTradeParams): FetchBigTradesAction => ({
  type: ActionType.FETCH_BIGTRADES,
  payload: { params },
});

/** 取得帳號資料 - 成功 */
export const fetchBigTradesSuccessActionCreator = (response: FetchBigTradesResponse): FetchBigTradesSuccessAction => ({
  type: ActionType.FETCH_BIGTRADES_SUCCESS,
  payload: { response },
});

/** 取得帳號資料 - 失敗 */
export const fetchBigTradesFailureActionCreator = (): FetchBigTradesFailureAction => ({
  type: ActionType.FETCH_BIGTRADES_FAILURE,
});

/** 隱藏Modal */
export const hideModalActionCreator = (): HideModalAction => ({
  type: ActionType.HIDE_MODAL,
});
/** 匯出excel */
export const exportExcelActionCreator = (params: FetchBigTradeParams): ExportExcelAction => ({
  type: ActionType.EXPORT_EXCEL,
  payload: { params },
});

/** 匯出ods */
export const exportOdsActionCreator = (params: FetchBigTradeParams): ExportOdsAction => ({
  type: ActionType.EXPORT_ODS,
  payload: { params },
});

/** 解析檔案 */
export const parseXlsActionCreator = (params: FetchParseXlsParams): ParseXlsAction => ({
  type: ActionType.PARSE_XLS,
  payload: { params },
});
