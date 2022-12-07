import { AdminHttpRequest } from './base';
import {
  APIPaginatedQueryParams,
  APIPaginatedResponse,
  CryptoPersonalInfo,
  CryptoQueryMaster,
  PersonalDetailNumberShowModalData,
  PersonalIPShowModalData,
  PersonalPhoneShowModalData,
  PersonalPictureShowModalData,
  PersonalWallerAddressShowModalData,
} from '@shared/types';

/** 取得調閱單號資料列表 - 請求資料 */
export type FetchOrderNumberListParams = APIPaginatedQueryParams & {
  /** 身分證字號 */
  idCardNum: string;
  /** 交易所帳號 */
  accountID: string;
  /** 姓名 */
  name: string;
  /** 手機 */
  phone: string;
  /** 電子信箱 */
  email: string;
  /** 銀行帳號 */
  bankAccount: string;
  /** 錢包地址 */
  wallerAddress: string;
  /** 案號 */
  caseNo: string;
  /** 查詢類別 */
  searchType: number;
  /** 人事五碼 */
  queryUserId: string;
  /** 調閱主序號 */
  orderMasterNumber: string;
};

/** 取得個資拋查歷史資料列表 - 請求資料 */
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

/** 取得modal資料列表 - 請求資料 */
export type CryptoPersonalSearchParams = APIPaginatedQueryParams;

/** 取得調閱單號資料列表 - 回應資料 */
export type FetchOrderNumberListResponse = APIPaginatedResponse<CryptoQueryMaster[]>;

/** 拋查 - 回應資料 */
export type CreateSearchResponse = string;

/** 取得電話彈窗資料 - 回應資料 */
export type FetchPhoneShowModalResponse = APIPaginatedResponse<PersonalPhoneShowModalData[]>;

/** 取得錢包彈窗資料 - 回應資料 */
export type FetchWallerAddressShowModalResponse = APIPaginatedResponse<PersonalWallerAddressShowModalData[]>;

/** 取得IP彈窗資料 - 回應資料 */
export type FetchIPShowModalResponse = APIPaginatedResponse<PersonalIPShowModalData[]>;

/** 取得照片彈窗資料 - 回應資料 */
export type FetchPictureShowModalResponse = APIPaginatedResponse<PersonalPictureShowModalData[]>;

/** 取得DetailNumber彈窗資料 - 回應資料 */
export type FetchDetailNumberShowModalResponse = PersonalDetailNumberShowModalData;

/**
 * 取得調閱單號資料列表
 * @param params 請求資料物件
 * @returns FetchRelevantCryptoPersonalInfoResponse
 */
export const fetchOrderNumberList = (params: FetchOrderNumberListParams) =>
  AdminHttpRequest.get<FetchOrderNumberListResponse>('/api/relevantcryptopersonalinfo/normal', params);

/**
 * 匯出調閱單號資料excel
 * @param params 請求資料物件
 * @returns FetchOrderNumberListResponse
 */
export const downloadOrderNumberListExcel = (params: FetchOrderNumberListParams) =>
  AdminHttpRequest.download('/api/relevantcryptopersonalinfo/normal/export/excel', null, { params, method: 'GET' });

/**
 * 匯出調閱單號資料ods
 */
export const downloadOrderNumberListOds = (params: FetchOrderNumberListParams) =>
  AdminHttpRequest.downloadOds('/api/relevantcryptopersonalinfo/normal/export/excel', null, { params, method: 'GET' });

/**
 * 取得歷史調閱資料列表
 * @param params 請求資料物件
 * @returns FetchOrderNumberListResponse
 */
export const fetchHistoryOrderNumberList = (params: FetchCryptoPersonalSearchHistoryParams) =>
  AdminHttpRequest.get<FetchOrderNumberListResponse>('/api/relevantcryptopersonalinfo/history', params);

/**
 * 拋查
 * @param data 請求資料物件
 * @returns CreateSearchResponse
 */
export const createSearch = (data: CreateSearchParams) =>
  AdminHttpRequest.post<CreateSearchResponse>('/api/PersonalInfoSearch', data);

/**
 * 取得電話彈窗資料
 * @returns FetchPhoneShowModalResponse
 */
export const getPhoneShowModal = (id: string, type: 'phone', data: CryptoPersonalSearchParams) =>
  AdminHttpRequest.post<FetchPhoneShowModalResponse>(`/api/relevantcryptopersonalinfo/showmodal/${id}/${type}`, data);

/**
 * 取得錢包彈窗資料
 * @returns FetchWallerAddressShowModalResponse
 */
export const getWallerAddressShowModal = (id: string, type: 'wallerAddress', data: CryptoPersonalSearchParams) =>
  AdminHttpRequest.post<FetchWallerAddressShowModalResponse>(`/api/relevantcryptopersonalinfo/showmodal/${id}/${type}`, data);

/**
 * 取得IP彈窗資料
 * @returns FetchIPShowModalResponse
 */
export const getIPShowModal = (id: string, type: 'ip', data: CryptoPersonalSearchParams) =>
  AdminHttpRequest.post<FetchIPShowModalResponse>(`/api/relevantcryptopersonalinfo/showmodal/${id}/${type}`, data);

/**
 * 取得照片彈窗資料
 * @returns FetchPictureShowModalResponse
 */
export const getPictureShowModal = (id: string, type: 'picture', data: CryptoPersonalSearchParams) =>
  AdminHttpRequest.post<FetchPictureShowModalResponse>(`/api/relevantcryptopersonalinfo/showmodal/${id}/${type}`, data);

/**
 * 取得DetailNumber彈窗資料
 * @returns FetchIPShowModalResponse
 */
export const getDetailNumberShowModal = (id: string) =>
  AdminHttpRequest.get<FetchDetailNumberShowModalResponse>(`/api/relevantcryptopersonalinfo/SearchDetailNumber/${id}`);

/**
 * 本案相關帳戶
 * @param params 請求資料物件
 * @returns FetchParseCsvResponse
 */
export const isCaseMark = (id: string, isCaseMark: boolean) =>
  AdminHttpRequest.patch(`/api/relevantcryptopersonalinfo/${id}/iscasemark`, isCaseMark);
