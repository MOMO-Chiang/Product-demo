import { AdminHttpRequest } from './base';
import { APIPaginatedQueryParams, APIPaginatedResponse, bigTrade } from '@shared/types';

/** 取得帳號資料列表 - 請求資料 */
export type FetchBigTradeParams = APIPaginatedQueryParams & {
  /** 交易人身分證字號 */
  remitterId: string;
  /** 交易人姓名 */
  remitterName: string;
  /** 交易人電話 */
  remitterPhone: string;
  /** 客戶地址 */
  customerAddress: string;
  /** 受款人身分證 */
  beneficiaryId: string;
  /** 受款人姓名 */
  beneficiary: string;
  /** 交易日期(起) */
  remitTimeStart: string;
  /** 交易日期(迄) */
  remitTimeEnd: string;
};

/** 解析Xls - 請求資料 */
export type FetchParseXlsParams = FormData;
/** 取得帳號資料列表 - 回應資料 */
export type FetchBigTradesResponse = APIPaginatedResponse<bigTrade[]>;

export type UpdateBigTradeParams = Omit<
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
 * @returns FetchBigTradesResponse
 */
export const fetchBigTrades = (params: FetchBigTradeParams) =>
  AdminHttpRequest.get<FetchBigTradesResponse>('/api/bigtrade', params);

/**
 * 匯出excel
 * @param data 請求資料物件
 * @returns null
 */
export const downloadBigTradeExcel = (params: FetchBigTradeParams) =>
  AdminHttpRequest.download('/api/bigtrade/exportexcel', params);

/**
 * 匯出ods
 * @param data 請求資料物件
 * @returns null
 */
export const downloadBigTradeOds = (params: FetchBigTradeParams) =>
  AdminHttpRequest.downloadOds('/api/bigtrade/exportexcel', params);

/**
 * 解析XLS
 * @param params 請求資料物件
 * @returns FetchParseXlsResponse
 */
export const fetchParseExcel = (params: FetchParseXlsParams) => AdminHttpRequest.post('/api/bigtrade/importxls', params);
