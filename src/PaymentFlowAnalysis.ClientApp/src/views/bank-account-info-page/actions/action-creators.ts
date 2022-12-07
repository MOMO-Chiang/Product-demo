import {
  FetchBankAccountInfoParams,
  FetchBankAccountInfosResponse,
  FetchParseCsvParams,
} from '@app/apis/admin/bank-account-info';
import { ShowCreateModalAction } from '.';
import {
  ActionType,
  FetchBankAccountInfosAction,
  FetchBankAccountInfosFailureAction,
  FetchBankAccountInfosSuccessAction,
  HideModalAction,
  ShowEditModalAction,
  BankAccountInfoPageAction,
  ExportExcelAction,
  ParseCsvAction,
  ExportOdsAction,
  IsAccountMarkAction,
  IsAccountMarkSuccessAction,
} from './action-types';

/** 重置 Page State */
export const resetPageStateActionCreator = (): BankAccountInfoPageAction => ({
  type: ActionType.RESET_PAGE_STATE,
});

/** 初始頁面 */
export const initPageActionCreator = (): BankAccountInfoPageAction => ({
  type: ActionType.INIT_PAGE,
});

/** 初始頁面 - 成功 */
export const initPageSuccessActionCreator = (): BankAccountInfoPageAction => ({
  type: ActionType.INIT_PAGE_SUCCESS,
});

/** 初始頁面 - 失敗 */
export const initPageFailureActionCreator = (): BankAccountInfoPageAction => ({
  type: ActionType.INIT_PAGE_FAILURE,
});

/** 取得帳號資料 */
export const fetchBankAccountInfosActionCreator = (params: FetchBankAccountInfoParams): FetchBankAccountInfosAction => ({
  type: ActionType.FETCH_BANKACCOUNTINFOS,
  payload: { params },
});

/** 取得帳號資料 - 成功 */
export const fetchBankAccountInfosSuccessActionCreator = (
  response: FetchBankAccountInfosResponse,
): FetchBankAccountInfosSuccessAction => ({
  type: ActionType.FETCH_BANKACCOUNTINFOS_SUCCESS,
  payload: { response },
});

/** 取得帳號資料 - 失敗 */
export const fetchBankAccountInfosFailureActionCreator = (): FetchBankAccountInfosFailureAction => ({
  type: ActionType.FETCH_BANKACCOUNTINFOS_FAILURE,
});

/** 隱藏Modal */
export const hideModalActionCreator = (): HideModalAction => ({
  type: ActionType.HIDE_MODAL,
});
/** 匯出excel */
export const exportExcelActionCreator = (params: FetchBankAccountInfoParams): ExportExcelAction => ({
  type: ActionType.EXPORT_EXCEL,
  payload: { params },
});

/** 匯出ods */
export const exportOdsActionCreator = (params: FetchBankAccountInfoParams): ExportOdsAction => ({
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
