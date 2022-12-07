import {
  FetchBankSafeDepositBoxParams,
  FetchBankSafeDepositBoxsResponse,
  FetchParseCsvParams,
} from '@app/apis/admin/bank-safedeposit-box';
import { ShowCreateModalAction } from '.';
import {
  ActionType,
  FetchBankSafeDepositBoxsAction,
  FetchBankSafeDepositBoxsFailureAction,
  FetchBankSafeDepositBoxsSuccessAction,
  HideModalAction,
  ShowEditModalAction,
  BankSafeDepositBoxPageAction,
  ExportExcelAction,
  ParseCsvAction,
  ExportOdsAction,
  IsAccountMarkAction,
  IsAccountMarkSuccessAction,
} from './action-types';

/** 重置 Page State */
export const resetPageStateActionCreator = (): BankSafeDepositBoxPageAction => ({
  type: ActionType.RESET_PAGE_STATE,
});

/** 初始頁面 */
export const initPageActionCreator = (): BankSafeDepositBoxPageAction => ({
  type: ActionType.INIT_PAGE,
});

/** 初始頁面 - 成功 */
export const initPageSuccessActionCreator = (): BankSafeDepositBoxPageAction => ({
  type: ActionType.INIT_PAGE_SUCCESS,
});

/** 初始頁面 - 失敗 */
export const initPageFailureActionCreator = (): BankSafeDepositBoxPageAction => ({
  type: ActionType.INIT_PAGE_FAILURE,
});

/** 取得帳號資料 */
export const fetchBankSafeDepositBoxsActionCreator = (
  params: FetchBankSafeDepositBoxParams,
): FetchBankSafeDepositBoxsAction => ({
  type: ActionType.FETCH_BANKSAFEDEPOSITBOXS,
  payload: { params },
});

/** 取得帳號資料 - 成功 */
export const fetchBankSafeDepositBoxsSuccessActionCreator = (
  response: FetchBankSafeDepositBoxsResponse,
): FetchBankSafeDepositBoxsSuccessAction => ({
  type: ActionType.FETCH_BANKSAFEDEPOSITBOXS_SUCCESS,
  payload: { response },
});

/** 取得帳號資料 - 失敗 */
export const fetchBankSafeDepositBoxsFailureActionCreator = (): FetchBankSafeDepositBoxsFailureAction => ({
  type: ActionType.FETCH_BANKSAFEDEPOSITBOXS_FAILURE,
});

/** 隱藏Modal */
export const hideModalActionCreator = (): HideModalAction => ({
  type: ActionType.HIDE_MODAL,
});
/** 匯出excel */
export const exportExcelActionCreator = (params: FetchBankSafeDepositBoxParams): ExportExcelAction => ({
  type: ActionType.EXPORT_EXCEL,
  payload: { params },
});

/** 匯出ods */
export const exportOdsActionCreator = (params: FetchBankSafeDepositBoxParams): ExportOdsAction => ({
  type: ActionType.EXPORT_ODS,
  payload: { params },
});

/** 解析檔案 */
export const parseCsvActionCreator = (params: FetchParseCsvParams): ParseCsvAction => ({
  type: ActionType.PARSE_CSV,
  payload: { params },
});

/** 本案相關帳戶 */
export const isAccountMarkActionCreator = (seq: string, isAccountMark: boolean): IsAccountMarkAction => ({
  type: ActionType.IS_ACCOUNT_MARK,
  payload: { seq, isAccountMark },
});

/** 本案相關帳戶 */
export const isAccountMarkSuccessActionCreator = (): IsAccountMarkSuccessAction => ({
  type: ActionType.IS_ACCOUNT_MARK_SUCCESS,
});
