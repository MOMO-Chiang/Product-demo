import { AdminHttpRequest } from './base';
import { APIPaginatedQueryParams, APIPaginatedResponse, bankTransaction, bankTransactionDetail } from '@shared/types';

/** 取得帳號資料列表 - 請求資料 */
export type FetchBankTransactionParams = APIPaginatedQueryParams & {
  /** 身分證帳號 */
  idCardNumber: string;
  /** 交易帳號 */
  transactionAccountId: string;
  /** 交易行 */
  transactionBank: string;
  /** 交易摘要 */
  transactionSummary: string;
  /** 交易日期(起) */
  transactionTimeStart: string;
  /** 交易日期(迄) */
  transactionTimeEnd: string;
};

/** 取得帳號資料列表 - 請求資料 */
export type FetchBankTransactionDetailParams = APIPaginatedQueryParams & {
  /** 交易帳號 */
  transactionAccountId: string;
};

/** 解析Csv - 請求資料 */
export type FetchParseCsvParams = FormData;
/** 取得帳號資料列表 - 回應資料 */
export type FetchBankTransactionsResponse = APIPaginatedResponse<bankTransaction[]>;
/** 取得帳號明細資料列表 - 回應資料 */
export type FetchBankTransactionsDetailResponse = APIPaginatedResponse<bankTransactionDetail[]>;

export type UpdateBankTransactionParams = Omit<
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
 * @returns FetchBankTransactionsResponse
 */
export const fetchBankTransactions = (params: FetchBankTransactionParams) =>
  AdminHttpRequest.get<FetchBankTransactionsResponse>('/api/banktransaction', params);

/**
 * 匯出excel
 * @param data 請求資料物件
 * @returns null
 */
export const downloadBankTransactionExcel = (params: FetchBankTransactionParams) =>
  AdminHttpRequest.download('/api/banktransaction/exportexcel', params);

/**
 * 匯出excel
 * @param data 請求資料物件
 * @returns null
 */
export const downloadBankTransactionOds = (params: FetchBankTransactionParams) =>
  AdminHttpRequest.downloadOds('/api/banktransaction/exportexcel', params);

/**
 * 解析CSV
 * @param params 請求資料物件
 * @returns FetchParseCsvResponse
 */
export const fetchParseExcel = (params: FetchParseCsvParams) => AdminHttpRequest.post('/api/banktransaction/importcsv', params);

/**
 * 本案相關帳戶
 * @param params 請求資料物件
 * @returns FetchParseCsvResponse
 */
export const isAccountMark = (seq: string, isAccountMark: boolean) =>
  AdminHttpRequest.patch(`/api/banktransaction/${seq}/isaccountmark`, isAccountMark);

/**
 * 取得明細資料
 * @returns FetchBlackAccountResponse
 */
export const fetchBankTransactionsDetail = (params: FetchBankTransactionDetailParams) =>
  AdminHttpRequest.get<FetchBankTransactionsDetailResponse>(`/api/banktransaction/detail`, params);
