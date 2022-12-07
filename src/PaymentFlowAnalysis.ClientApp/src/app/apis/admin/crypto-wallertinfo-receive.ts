import { AdminHttpRequest } from './base';
import { APIPaginatedQueryParams, APIPaginatedResponse, cryptoWallertInfoReceive, SelectOptionConfig } from '@shared/types';

/** 取得帳號資料列表 - 請求資料 */
export type FetchCryptoWallertInfoReceiveParams = APIPaginatedQueryParams & {
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
};

/** 解析Csv - 請求資料 */
export type FetchParseCsvParams = FormData;
/** 取得帳號資料列表 - 回應資料 */
export type FetchCryptoWallertInfoReceivesResponse = APIPaginatedResponse<cryptoWallertInfoReceive[]>;

export type UpdateCryptoWallertInfoReceiveParams = Omit<
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
 * @returns FetchCryptoWallertInfoReceivesResponse
 */
export const fetchCryptoWallertInfoReceives = (params: FetchCryptoWallertInfoReceiveParams) =>
  AdminHttpRequest.get<FetchCryptoWallertInfoReceivesResponse>('/api/cryptowallertinforeceive', params);

/**
 * 匯出excel
 * @param data 請求資料物件
 * @returns null
 */
export const downloadCryptoWallertInfoReceiveExcel = (params: FetchCryptoWallertInfoReceiveParams) =>
  AdminHttpRequest.download('/api/cryptowallertinforeceive/exportexcel', params);

/**
 * 匯出ods
 * @param data 請求資料物件
 * @returns null
 */
export const downloadCryptoWallertInfoReceiveOds = (params: FetchCryptoWallertInfoReceiveParams) =>
  AdminHttpRequest.downloadOds('/api/cryptowallertinforeceive/exportexcel', params);

/**
 * 取得資料來源機構下拉選單
 * @param null
 */
export const fetchExchangeTypeCodeOptions = () => {
  return AdminHttpRequest.get<SelectOptionConfig[]>('/api/cryptowallertinforeceive/options');
};
