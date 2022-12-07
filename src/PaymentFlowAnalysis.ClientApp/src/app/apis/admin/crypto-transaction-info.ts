import { AdminHttpRequest } from './base';
import {
  APIPaginatedQueryParams,
  APIPaginatedResponse,
  CryptoQueryMaster,
  CryptoTransactionInfo,
  PersonalDetailNumberShowModalData,
} from '@shared/types';

/** 取得交易調閱資料列表 - 請求資料 */
export type FetchCryptoTransactionInfosParams = APIPaginatedQueryParams & {
  /** txID */
  txID: string;
  /** 帳戶 */
  account: string;
  /** 銀行代碼 */
  bankCode: string;
  /** 分行代碼 */
  brunchCode: string;
  /** 幣別 */
  currency: string;
  /** 數量(最低) */
  amountMin: string;
  /** 數量(最高) */
  amountMax: string;
  /** 交易日期(起) */
  transactionTimeStart: string;
  /** 交易日期(迄) */
  transactionTimeEnd: string;
  /** 案號 */
  caseNo: string;
  /** 查詢類別 */
  searchType: number;
  /** 人事五碼 */
  queryUserId: string;
  /** 調閱主序號 */
  orderMasterNumber: string;
};

/** 取得交易拋查歷史資料列表 - 請求資料 */
export type FetchCryptoPersonalSearchHistoryParams = APIPaginatedQueryParams & {
  /** 案號 */
  CaseNo: string;
  /** 查詢類別 */
  searchType: number;
  /** 人事五碼 */
  queryUserId: string;
};

/** 拋查 - 請求資料 */
export type CreateSearchParams = {
  /** 案號 */
  caseNo: string;
  /** 案名 */
  caseName: string;
  /** 查詢選項 */
  queryConditionType: string;
  /** 查詢內容 */
  queryConditionInfo: string;
  /** 查詢類別 */
  searchType: number;
  /** 代拋查 */
  actionUserId: string | null;
};

/** 取得交易調閱資料列表 - 回應資料 */
export type FetchCryptoTransactionInfosResponse = APIPaginatedResponse<CryptoTransactionInfo[]>;

/** 取得交易歷史調閱列表 - 回應資料 */
export type FetchCryptoTransactionInfoHistoryResponse = APIPaginatedResponse<CryptoQueryMaster[]>;

/** 拋查 - 回應資料 */
export type CreateSearchResponse = string;

/** 取得DetailNumber彈窗資料 - 回應資料 */
export type FetchDetailNumberShowModalResponse = PersonalDetailNumberShowModalData;

/**
 * 取得交易調閱資料列表
 * @param params 請求資料物件
 * @returns FetchCryptoTransactionInfosResponse
 */
export const fetchCryptoTransactionInfos = (params: FetchCryptoTransactionInfosParams) =>
  AdminHttpRequest.get<FetchCryptoTransactionInfosResponse>('/api/cryptotransactioninfo/normal', params);

/**
 * 匯出交易調閱資料excel
 * @param params 請求資料物件
 * @returns FetchOrderNumberListResponse
 */
export const downloadCryptoTransactionInfoExcel = (params: FetchCryptoTransactionInfosParams) =>
  AdminHttpRequest.download('/api/cryptotransactioninfo/normal/export/excel', null, { params, method: 'GET' });

/**
 * 匯出交易調閱資料ods
 * @param params 請求資料物件
 * @returns
 */
export const downloadCryptoTransactionInfoOds = (params: FetchCryptoTransactionInfosParams) =>
  AdminHttpRequest.downloadOds('/api/cryptotransactioninfo/normal/export/excel', null, { params, method: 'GET' });

/**
 * 取得交易調閱歷史資料列表
 * @param params 請求資料物件
 * @returns FetchCryptoTransactionInfosResponse
 */
export const fetchHistoryCryptoTransactionInfos = (params: FetchCryptoTransactionInfosParams) =>
  AdminHttpRequest.get<FetchCryptoTransactionInfoHistoryResponse>('/api/cryptotransactioninfo/history', params);
/**
 * 拋查
 * @param data 請求資料物件
 * @returns CreateSearchResponse
 */
export const createSearch = (data: CreateSearchParams) =>
  AdminHttpRequest.post<CreateSearchResponse>('/api/PersonalInfoSearch', data);

/**
 * 取得DetailNumber彈窗資料
 * @returns FetchIPShowModalResponse
 */
export const getDetailNumberShowModal = (id: string) =>
  AdminHttpRequest.get<FetchDetailNumberShowModalResponse>(`/api/cryptotransactioninfo/SearchDetailNumber/${id}`);
