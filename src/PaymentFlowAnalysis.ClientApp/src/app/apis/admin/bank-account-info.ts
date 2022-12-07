import { AdminHttpRequest } from './base';
import { APIPaginatedQueryParams, APIPaginatedResponse, bankAccountInfo } from '@shared/types';

/** 取得帳號資料列表 - 請求資料 */
export type FetchBankAccountInfoParams = APIPaginatedQueryParams & {
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
  /** 本案相關帳戶 */
  isAccountMark: string;
};

/** 解析Csv - 請求資料 */
export type FetchParseCsvParams = FormData;
/** 取得帳號資料列表 - 回應資料 */
export type FetchBankAccountInfosResponse = APIPaginatedResponse<bankAccountInfo[]>;

export type UpdateBankAccountInfoParams = Omit<
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
 * @returns FetchBankAccountInfosResponse
 */
export const fetchBankAccountInfos = (params: FetchBankAccountInfoParams) =>
  AdminHttpRequest.get<FetchBankAccountInfosResponse>('/api/bankaccountinfo', params);

/**
 * 匯出excel
 * @param data 請求資料物件
 * @returns null
 */
export const downloadBankAccountInfoExcel = (params: FetchBankAccountInfoParams) =>
  AdminHttpRequest.download('/api/bankaccountinfo/exportexcel', params);

/**
 * 匯出excel
 * @param data 請求資料物件
 * @returns null
 */
export const downloadBankAccountInfoOds = (params: FetchBankAccountInfoParams) =>
  AdminHttpRequest.downloadOds('/api/bankaccountinfo/exportexcel', params);

/**
 * 解析CSV
 * @param params 請求資料物件
 * @returns FetchParseCsvResponse
 */
export const fetchParseExcel = (params: FetchParseCsvParams) => AdminHttpRequest.post('/api/bankaccountinfo/importcsv', params);

/**
 * 本案相關帳戶
 * @param params 請求資料物件
 * @returns FetchParseCsvResponse
 */
export const isAccountMark = (seq: string, isAccountMark: boolean) =>
  AdminHttpRequest.patch(`/api/bankaccountinfo/${seq}/isaccountmark`, isAccountMark);
