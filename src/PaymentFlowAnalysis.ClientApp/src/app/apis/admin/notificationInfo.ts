import { APIPaginatedQueryParams, APIPaginatedResponse, NotificationInfo } from '@shared/types';
import { AdminHttpRequest } from './base';

/** 取得通知內容 - 請求資料 */
export type FetchNotificationInfosParams = APIPaginatedQueryParams;

/** 取得通知內容 - 回應資料 */
export type FetchNotificationInfosResponse = APIPaginatedResponse<NotificationInfo[]>;

/** 取得通知內容 By UserId */
export const fetchNotificationInfos = (params: FetchNotificationInfosParams) =>
  AdminHttpRequest.get<FetchNotificationInfosResponse>('/api/notification-info', params);

/** 取得未讀通知數量 By UserId */
export const fetchNotificationUnReadCount = () => AdminHttpRequest.get<number>('/api/notification-info/unread/count');

/** 更新全部通知為已讀 By UserId */
export const markNotificationRead = () => AdminHttpRequest.patch('/api/notification-info/read');
