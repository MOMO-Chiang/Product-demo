import { AdminHttpRequest } from './base';
import { APIPaginatedQueryParams, APIPaginatedResponse, bankSafeDepositBox } from '@shared/types';

/** 取得帳號資料列表 - 請求資料 */
export type FetchBankSafeDepositBoxParams = APIPaginatedQueryParams & {
  /** 身分證帳號 */
  idCardNumber: string;
  /** 承租人 */
  renter: string;
  /** 行動電話 */
  mobilePhone: string;
  /** 箱號或室號 */
  boxNumber: string;
  /** 承租日期(起) */
  rentDateStart: string;
  /** 承租日期(迄) */
  rentDateEnd: string;
  /** 退租日期(起) */
  leaseCancellationDateStart: string;
  /** 退租日期(迄) */
  leaseCancellationDateEnd: string;
  /** 關鍵字 */
  keyWord: string;
  /** 本案相關帳戶 */
  isAccountMark: string;
};

/** 解析Csv - 請求資料 */
export type FetchParseCsvParams = FormData;
/** 取得帳號資料列表 - 回應資料 */
export type FetchBankSafeDepositBoxsResponse = APIPaginatedResponse<bankSafeDepositBox[]>;

export type UpdateBankSafeDepositBoxParams = Omit<
  {
    /** 銀行帳號 */
    accountId: string;
    /** 身分證帳號 */
    idCardNumber: string;
    /** 戶名 */
    accountName: string;
    /** 行動電話 */
    mobilePhone: string;
    /** 開戶日期(起) */
    accountOpeningDateStart: string;
    /** 開戶日期(迄) */
    accountOpeningDateEnd: string;
  },
  'userId'
>;

/**
 * 取得帳號資料列表
 * @param params 請求資料物件
 * @returns FetchBankSafeDepositBoxsResponse
 */
export const fetchBankSafeDepositBoxs = (params: FetchBankSafeDepositBoxParams) =>
  AdminHttpRequest.get<FetchBankSafeDepositBoxsResponse>('/api/banksafedepositbox', params);

/**
 * 匯出excel
 * @param data 請求資料物件
 * @returns null
 */
export const downloadBankSafeDepositBoxExcel = (params: FetchBankSafeDepositBoxParams) =>
  AdminHttpRequest.download('/api/banksafedepositbox/exportexcel', params);

/**
 * 匯出ods
 * @param data 請求資料物件
 * @returns null
 */
export const downloadBankSafeDepositBoxOds = (params: FetchBankSafeDepositBoxParams) =>
  AdminHttpRequest.downloadOds('/api/banksafedepositbox/exportexcel', params);

/**
 * 解析CSV
 * @param params 請求資料物件
 * @returns FetchParseCsvResponse
 */
export const fetchParseExcel = (params: FetchParseCsvParams) =>
  AdminHttpRequest.post('/api/banksafedepositbox/importcsv', params);

/**
 * 本案相關帳戶
 * @param params 請求資料物件
 * @returns FetchParseCsvResponse
 */
export const isAccountMark = (seq: string, isAccountMark: boolean) =>
  AdminHttpRequest.patch(`/api/banksafedepositbox/${seq}/isaccountmark`, isAccountMark);
