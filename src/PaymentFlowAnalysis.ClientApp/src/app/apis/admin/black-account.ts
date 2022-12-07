import { AdminHttpRequest } from './base';
import {
  APIPaginatedQueryParams,
  APIPaginatedResponse,
  BlackAccount,
  BlackAccountEmailShowModalData,
  BlackAccountIPShowModalData,
  BlackAccountPhoneShowModalData,
  SelectOptionConfig,
} from '@shared/types';

/** 取得帳號資料列表 - 請求資料 */
export type FetchBlackAccountsParams = APIPaginatedQueryParams & {
  /** 身分證字號 */
  idCardNum: string;
  /** 錢包地址 */
  walletAddress: string;
  /** 電話號碼 */
  phone: string;
  /** 電子信箱 */
  email: string;
  /** ip位置 */
  iP: string;
  /** 網址 */
  url: string;
  /** 備註 */
  remark: string;
};

/** 取得帳號資料列表 - 回應資料 */
export type FetchBlackAccountsResponse = APIPaginatedResponse<BlackAccount[]>;

/** 取得帳號資料 by ID - 回應資料 */
export type FetchBlackAccountResponse = BlackAccount;

/** 取得電話彈窗資料 - 回應資料 */
export type FetchPhoneShowModalResponse = BlackAccountPhoneShowModalData[];

/** 取得信箱彈窗資料 - 回應資料 */
export type FetchEmailShowModalResponse = BlackAccountEmailShowModalData[];

/** 取得IP彈窗資料 - 回應資料 */
export type FetchIPShowModalResponse = BlackAccountIPShowModalData[];

/** 建立帳號資料 - 請求資料 */
export type CreateBlackAccountParams = BlackAccount;

/** 建立帳號資料 - 回應資料 */
export type CreateBlackAccountResponse = BlackAccount;

/** 更新帳號資料 By ID - 請求資料 */
//export type UpdateBlackAccountParams = Omit<BlackAccount, 'useId'>;
export type UpdateBlackAccountParams = Omit<
  {
    /** 風險類別 */
    risklevel: string;
    /** 身分證字號 */
    idCardNum: string;
    /** 錢包幣別 */
    currencyType: string;
    /** 錢包地址 */
    walletAddress: string;
    /** 電話號碼 */
    userPhone: string;
    /** 電子信箱 */
    userEmail: string;
    /** ip位置 */
    userIP: string;
    /** 網址 */
    url: string;
    /** 備註 */
    remark: string;
  },
  'walletAddress'
>;

/** 更新帳號資料 By ID - 回應資料 */
export type UpdateBlackAccountResponse = BlackAccount;

/**
 * 取得帳號資料列表
 * @param params 請求資料物件
 * @returns FetchBlackAccountsResponse
 */
export const fetchBlackAccounts = (params: FetchBlackAccountsParams) =>
  AdminHttpRequest.get<FetchBlackAccountsResponse>('/api/blackaccount', params);

/**
 * 取得帳號資料 by ID
 * @param id 帳號 ID
 * @returns FetchBlackAccountResponse
 */
export const fetchBlackAccount = (id: string) => AdminHttpRequest.get<FetchBlackAccountResponse>(`/api/blackaccount/${id}`);

/**
 * 建立帳號資料
 * @param data 請求資料物件
 * @returns CreateBlackAccountResponse
 */
export const createBlackAccount = (data: CreateBlackAccountParams) =>
  AdminHttpRequest.post<CreateBlackAccountResponse>('/api/blackaccount', data);

/**
 * 更新帳號資料 By ID
 * @param id 帳號 ID
 * @param data 請求資料物件
 * @returns UpdateBlackAccountResponse
 */
export const updateBlackAccount = (id: string, data: UpdateBlackAccountParams) =>
  AdminHttpRequest.put<UpdateBlackAccountResponse>(`/api/blackaccount/${id}`, data);

/**
 * 取得資料來源機構下拉選單
 * @param null
 */
export const fetchRisklevelOptions = () => {
  return AdminHttpRequest.get<SelectOptionConfig[]>('/api/blackaccount/options');
};

/**
 * 匯出excel
 */
export const downloadBlackAccountExcel = (params: FetchBlackAccountsParams) =>
  AdminHttpRequest.download('/api/blackaccount/exportexcel', params);

/**
 * 匯出ods
 */
export const downloadBlackAccountOds = (params: FetchBlackAccountsParams) =>
  AdminHttpRequest.downloadOds('/api/blackaccount/exportexcel', params);

/**
 * 取得電話彈窗資料
 * @returns FetchBlackAccountResponse
 */
export const getPhoneShowModal = (id: string, type: 'phone') =>
  AdminHttpRequest.get<FetchPhoneShowModalResponse>(`/api/blackaccount/showmodal/${id}/${type}`);

/**
 * 取得電話彈窗資料
 * @returns FetchBlackAccountResponse
 */
export const getEmailShowModal = (id: string, type: 'email') =>
  AdminHttpRequest.get<FetchEmailShowModalResponse>(`/api/blackaccount/showmodal/${id}/${type}`);

/**
 * 取得電話彈窗資料
 * @returns FetchBlackAccountResponse
 */
export const getIPShowModal = (id: string, type: 'ip') =>
  AdminHttpRequest.get<FetchIPShowModalResponse>(`/api/blackaccount/showmodal/${id}/${type}`);
