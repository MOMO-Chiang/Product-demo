import {
  CreateSearchParams,
  CreateSearchResponse,
  FetchCryptoPersonalSearchHistoryParams,
  FetchDetailNumberShowModalResponse,
} from '@app/apis/admin/crypto-transaction-info';
import {
  FetchCryptoTransactionInfosParams,
  FetchCryptoTransactionInfosResponse,
  FetchCryptoTransactionInfoHistoryResponse,
} from '@app/apis/admin/crypto-transaction-info';
import {
  ActionType,
  ExpandDetailAction, //展開明細資料Action
  CryptoTransactionInfoPageAction,
  FetchCryptoTransactionInfosAction,
  FetchCryptoTransactionInfosSuccessAction,
  FetchCryptoTransactionInfosFailureAction,
  FetchHistoryCryptoTransactionInfosAction,
  FetchHistoryCryptoTransactionInfosSuccessAction,
  FetchHistoryCryptoTransactionInfosFailureAction,
  FetchCreateTransactionSearchAction,
  FetchCreateTransactionSearchSuccessAction,
  FetchCreateTransactionSearchFailureAction,
  ExportExcelAction,
  ExportOdsAction,
  ShowDetailNumberModalAction,
  ShowDetailNumberModalSuccessAction,
} from './action-types';

/** 重置 Page State */
export const resetPageStateActionCreator = (): CryptoTransactionInfoPageAction => ({
  type: ActionType.RESET_PAGE_STATE,
});

/** 初始頁面 */
export const initPageActionCreator = (): CryptoTransactionInfoPageAction => ({
  type: ActionType.INIT_PAGE,
});

/** 初始頁面 - 成功 */
export const initPageSuccessActionCreator = (): CryptoTransactionInfoPageAction => ({
  type: ActionType.INIT_PAGE_SUCCESS,
});

/** 初始頁面 - 失敗 */
export const initPageFailureActionCreator = (): CryptoTransactionInfoPageAction => ({
  type: ActionType.INIT_PAGE_FAILURE,
});

/** 取得交易調閱資料 */
export const fetchCryptoTransactionInfosActionCreator = (
  params: FetchCryptoTransactionInfosParams,
): FetchCryptoTransactionInfosAction => ({
  type: ActionType.FETCH_CRYPTOTRANSACTIONINFOS,
  payload: { params },
});

/** 取得交易調閱資料 - 成功 */
export const fetchCryptoTransactionInfosSuccessActionCreator = (
  response: FetchCryptoTransactionInfosResponse,
): FetchCryptoTransactionInfosSuccessAction => ({
  type: ActionType.FETCH_CRYPTOTRANSACTIONINFOS_SUCCESS,
  payload: { response },
});

/** 取得交易調閱資料 - 失敗 */
export const fetchCryptoTransactionInfosFailureActionCreator = (): FetchCryptoTransactionInfosFailureAction => ({
  type: ActionType.FETCH_CRYPTOTRANSACTIONINFOS_FAILURE,
});

/** 取得交易歷史調閱資料 */
export const fetchHistoryCryptoTransactionInfosActionCreator = (
  params: FetchCryptoPersonalSearchHistoryParams,
): FetchHistoryCryptoTransactionInfosAction => ({
  type: ActionType.FETCH_HISTORYCRYPTOTRANSACTIONINFOS,
  payload: { params },
});

/** 取得交易歷史調閱資料 - 成功 */
export const fetchHistoryCryptoTransactionInfosSuccessActionCreator = (
  response: FetchCryptoTransactionInfoHistoryResponse,
): FetchHistoryCryptoTransactionInfosSuccessAction => ({
  type: ActionType.FETCH_HISTORYCRYPTOTRANSACTIONINFOS_SUCCESS,
  payload: { response },
});

/** 取得交易歷史調閱資料 - 失敗 */
export const fetchHistoryCryptoTransactionInfosFailureActionCreator = (): FetchHistoryCryptoTransactionInfosFailureAction => ({
  type: ActionType.FETCH_HISTORYCRYPTOTRANSACTIONINFOS_FAILURE,
});

/** 展開明細資料 */
export const expandDetailActionCreator = (key: string, bool: boolean): ExpandDetailAction => ({
  type: ActionType.EXPAND_DETAIL,
  payload: { key, bool },
});

/** 執行拋查 */
export const fetchCreateTransactionSearchActionCreator = (params: CreateSearchParams): FetchCreateTransactionSearchAction => ({
  type: ActionType.FETCH_CREATETRANSACTIONSEARCH,
  payload: { params },
});

/** 執行拋查 - 成功 */
export const fetchCreateTransactionSearchSuccessActionCreator = (
  response: CreateSearchResponse,
): FetchCreateTransactionSearchSuccessAction => ({
  type: ActionType.FETCH_CREATETRANSACTIONSEARCH_SUCCESS,
  payload: { response },
});

/** 執行拋查 - 失敗 */
export const fetchCreateTransactionSearchFailureActionCreator = (): FetchCreateTransactionSearchFailureAction => ({
  type: ActionType.FETCH_CREATETRANSACTIONSEARCH_FAILURE,
});

/** 匯出excel */
export const exportExcelActionCreator = (params: FetchCryptoTransactionInfosParams): ExportExcelAction => ({
  type: ActionType.EXPORT_EXCEL,
  payload: { params },
});

/** 匯出ods */
export const exportOdsActionCreator = (params: FetchCryptoTransactionInfosParams): ExportOdsAction => ({
  type: ActionType.EXPORT_ODS,
  payload: { params },
});

/** 顯示DetailNumberModal */
export const showDetailNumberListActionCreator = (Seq: string): ShowDetailNumberModalAction => ({
  type: ActionType.SHOW_DETAILNUMBER_MODAL,
  payload: { Seq },
});
/** 取得DetailNumber資料 - 成功 */
export const showDetailNumberListSuccessActionCreator = (
  response: FetchDetailNumberShowModalResponse,
): ShowDetailNumberModalSuccessAction => ({
  type: ActionType.SHOW_DETAILNUMBER_MODAL_SUCCESS,
  payload: { response },
});
