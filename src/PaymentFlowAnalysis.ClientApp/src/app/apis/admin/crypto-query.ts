import { AdminHttpRequest } from './base';
import { APIPaginatedQueryParams, APIPaginatedResponse, cryptoQuery, SelectOptionConfig } from '@shared/types';

/** 取得帳號資料列表 - 請求資料 */
export type FetchCryptoQueryParams = APIPaginatedQueryParams & {
  /** 調閱人人事五碼 */
  queryUserId: string;
  /** 交易所 */
  requestAgency: string;
  /** 拋查條件 */
  queryConditionType: string;
  /** 拋查值 */
  queryValue: string;
  /** 調閱單號 */
  orderDetailNumber: string;
  /** 拋查日期(起) */
  queryOrderTimeStart: string;
  /** 拋查日期(迄) */
  queryOrderTimeEnd: string;
};

/** 解析Csv - 請求資料 */
export type FetchParseCsvParams = FormData;
/** 取得帳號資料列表 - 回應資料 */
export type FetchCryptoQuerysResponse = APIPaginatedResponse<cryptoQuery[]>;

export type UpdateCryptoQueryParams = Omit<
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
 * @returns FetchCryptoQuerysResponse
 */
export const fetchCryptoQuerys = (params: FetchCryptoQueryParams) =>
  AdminHttpRequest.get<FetchCryptoQuerysResponse>('/api/cryptoquery', params);

/**
 * 匯出excel
 * @param data 請求資料物件
 * @returns null
 */
export const downloadCryptoQueryExcel = (params: FetchCryptoQueryParams) =>
  AdminHttpRequest.download('/api/cryptoquery/exportexcel', params);

/**
 * 匯出ods
 * @param data 請求資料物件
 * @returns null
 */
export const downloadCryptoQueryOds = (params: FetchCryptoQueryParams) =>
  AdminHttpRequest.downloadOds('/api/cryptoquery/exportexcel', params);

/**
 * 取得資料來源機構下拉選單
 * @param null
 */
export const fetchExchangeTypeCodeOptions = () => {
  return AdminHttpRequest.get<SelectOptionConfig[]>('/api/cryptoquery/agencytype/options');
};

/**
 * 拋查條件下拉選單
 * @param null
 */
export const fetchConditionTypeCodeOptions = () => {
  return AdminHttpRequest.get<SelectOptionConfig[]>('/api/cryptoquery/conditiontype/options');
};
