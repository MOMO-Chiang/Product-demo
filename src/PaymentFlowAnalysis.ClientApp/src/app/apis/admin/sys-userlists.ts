import { AdminHttpRequest } from './base';
import { APIPaginatedQueryParams, APIPaginatedResponse, SysUserList } from '@shared/types';

/** 取得帳號資料列表 - 請求資料 */
export type FetchSysUserListsParams = APIPaginatedQueryParams & {
  /** 使用者帳號 */
  userId: string;
  /** 使用者名稱 */
  orderUserName: string;
  /** 單位代碼 */
  unitCode: string;
  /** 單位名稱 */
  unitName: string;
  /** 電子信箱 */
  orderUserEmail: string;
  /** 連絡電話 */
  orderUserPhone: string;
};

/** 取得帳號資料列表 - 回應資料 */
export type FetchSysUserListsResponse = APIPaginatedResponse<SysUserList[]>;

/** 取得帳號資料 by ID - 回應資料 */
export type FetchSysUserListResponse = SysUserList;

/** 建立帳號資料 - 請求資料 */
export type CreateSysUserListParams = SysUserList;

/** 建立帳號資料 - 回應資料 */
export type CreateSysUserListResponse = SysUserList;

/** 更新帳號資料 By ID - 請求資料 */
//export type UpdateSysUserListParams = Omit<SysUserList, 'useId'>;
export type UpdateSysUserListParams = Omit<
  {
    userId: string;
    /** 使用者名稱 */
    orderUserName: string;
    /** 單位代碼 */
    unitCode: string;
    /** 單位名稱 */
    unitName: string;
    /** 電子信箱 */
    orderUserEmail: string;
    /** 連絡電話 */
    orderUserPhone: string;
  },
  'userId'
>;

export type PatchSysUserListParams = Omit<
  {
    userId: string;
    /** 使用者名稱 */
    orderUserName: string;
    /** 連絡電話 */
    orderUserPhone: string;
    /** 電子信箱 */
    orderUserEmail: string;
    /** 職稱 */
    orderUserRank: string;
    /** 任職單位 */
    orderUserUnit: string;
    /** 刑事案類 */
    orderUserProjectCategory: string;
    /** 有效 */
    isValid: boolean;
  },
  'userId'
>;

/** 更新帳號資料 By ID - 回應資料 */
export type UpdateSysUserListResponse = SysUserList;

/**
 * 取得帳號資料列表
 * @param params 請求資料物件
 * @returns FetchSysUserListsResponse
 */
export const fetchSysUserLists = (params: FetchSysUserListsParams) =>
  AdminHttpRequest.get<FetchSysUserListsResponse>('/api/sysuserlist', params);

/**
 * 取得帳號資料 by ID
 * @param id 帳號 ID
 * @returns FetchSysUserListResponse
 */
export const fetchSysUserList = (id: string) => AdminHttpRequest.get<FetchSysUserListResponse>(`/api/sysuserlist/${id}`);

/**
 * 取得當前使用者帳號資料
 * @returns FetchSysUserListResponse
 */
export const fetchCurrentSysUserList = () => AdminHttpRequest.get<FetchSysUserListResponse>(`/api/sysuserlist/current`);

/**
 * 建立帳號資料
 * @param data 請求資料物件
 * @returns CreateSysUserListResponse
 */
// export const createSysUserList = (data: CreateSysUserListParams) =>
//   AdminHttpRequest.post<CreateSysUserListResponse>('/api/sysuserlist', data);

/**
 * 更新帳號資料 By ID
 * @param id 帳號 ID
 * @param data 請求資料物件
 * @returns UpdateSysUserListResponse
 */
export const updateSysUserList = (id: string, data: UpdateSysUserListParams) =>
  AdminHttpRequest.put<UpdateSysUserListResponse>(`/api/sysuserlist/${id}`, data);

/**
 * 更新帳號資料 By ID
 * @param id 帳號 ID
 * @param data 請求資料物件
 * @returns UpdateSysUserListResponse
 */
export const patchSysUserList = (id: string, data: PatchSysUserListParams) =>
  AdminHttpRequest.patch<UpdateSysUserListResponse>(`/api/sysuserlist/${id}`, data);

/**
 * 刪除帳號資料
 * @param id 帳號 ID
 * @returns null
 */
//export const deleteSysUserList = (id: string) => AdminHttpRequest.delete<void>(`/api/sysuserlist/${id}`);
