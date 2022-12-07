import {
  FetchBankTransactionDetailParams,
  FetchBankTransactionParams,
  FetchBankTransactionsDetailResponse,
  FetchBankTransactionsResponse,
  FetchParseCsvParams,
} from '@app/apis/admin/bank-transaction';
import { ShowCreateModalAction } from '.';
import {
  ActionType,
  FetchBankTransactionsAction,
  FetchBankTransactionsFailureAction,
  FetchBankTransactionsSuccessAction,
  HideModalAction,
  ShowEditModalAction,
  BankTransactionPageAction,
  ExportExcelAction,
  ParseCsvAction,
  ExportOdsAction,
} from './action-types';

/** 重置 Page State */
export const resetPageStateActionCreator = (): BankTransactionPageAction => ({
  type: ActionType.RESET_PAGE_STATE,
});

/** 初始頁面 */
export const initPageActionCreator = (): BankTransactionPageAction => ({
  type: ActionType.INIT_PAGE,
});

/** 初始頁面 - 成功 */
export const initPageSuccessActionCreator = (): BankTransactionPageAction => ({
  type: ActionType.INIT_PAGE_SUCCESS,
});

/** 初始頁面 - 失敗 */
export const initPageFailureActionCreator = (): BankTransactionPageAction => ({
  type: ActionType.INIT_PAGE_FAILURE,
});

/** 取得帳號資料 */
export const fetchBankTransactionsActionCreator = (params: FetchBankTransactionParams): FetchBankTransactionsAction => ({
  type: ActionType.FETCH_BANKTRANSACTIONS,
  payload: { params },
});

/** 取得帳號資料 - 成功 */
export const fetchBankTransactionsSuccessActionCreator = (
  response: FetchBankTransactionsResponse,
): FetchBankTransactionsSuccessAction => ({
  type: ActionType.FETCH_BANKTRANSACTIONS_SUCCESS,
  payload: { response },
});

/** 取得帳號資料 - 失敗 */
export const fetchBankTransactionsFailureActionCreator = (): FetchBankTransactionsFailureAction => ({
  type: ActionType.FETCH_BANKTRANSACTIONS_FAILURE,
});

/** 隱藏Modal */
export const hideModalActionCreator = (): HideModalAction => ({
  type: ActionType.HIDE_MODAL,
});
/** 匯出excel */
export const exportExcelActionCreator = (params: FetchBankTransactionParams): ExportExcelAction => ({
  type: ActionType.EXPORT_EXCEL,
  payload: { params },
});

/** 匯出ods */
export const exportOdsActionCreator = (params: FetchBankTransactionParams): ExportOdsAction => ({
  type: ActionType.EXPORT_ODS,
  payload: { params },
});

/** 解析檔案 */
export const parseCsvActionCreator = (params: FetchParseCsvParams): ParseCsvAction => ({
  type: ActionType.PARSE_CSV,
  payload: { params },
});
