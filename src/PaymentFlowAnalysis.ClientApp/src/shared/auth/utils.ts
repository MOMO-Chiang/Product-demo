import { AdminPermissionMap, AuthLoginInfo } from '@shared/types';
import * as AppSettings from '@shared/app-settings';
import { AdminPermission } from '@shared/enums';

/**
 * 確認是否登入
 * @returns
 */
export const checkIsLogged = () => {
  const loginInfo = getLoginInfo();

  // 確認是否有登入資訊
  if (!loginInfo) {
    return false;
  }

  // 確認是否有 token
  if (!loginInfo.token) {
    return false;
  }

  // 確認是否過期
  var timestampNow = Date.now();
  if (timestampNow >= loginInfo.expires) {
    return false;
  }

  return true;
};

/**
 * 取得權限資料
 * @returns 權限資料
 */
export const getUserPermissions = (): AdminPermissionMap => {
  const loginInfo = getLoginInfo();

  return loginInfo && loginInfo.permissions ? loginInfo.permissions : ({} as AdminPermissionMap);
};

/**
 * 確認是否有指定權限
 * @param permissionKey 權限 key
 * @returns true 表示有權限
 */
export const checkHasPermissionByKey = (permissionKey: keyof typeof AdminPermission) => {
  const loginInfo = getLoginInfo();

  const permissions = loginInfo && loginInfo.permissions ? loginInfo.permissions : ({} as AdminPermissionMap);

  return !!permissions[permissionKey];
};

/**
 * 取得登入資訊資料
 * @returns 登入資訊資料
 */
export const getLoginInfo = () => {
  const loginInfoStr = window.localStorage.getItem(AppSettings.LOGIN_INFO_STORAGE_KEY);
  let loginInfo: AuthLoginInfo | null;

  try {
    loginInfo = loginInfoStr ? JSON.parse(loginInfoStr) : null;
  } catch {
    loginInfo = null;
  }

  return loginInfo;
};

/**
 * 儲存 登入資訊 至 LocalStorage
 * @param loginInfo
 */
export const setLoginInfo = (loginInfo: AuthLoginInfo) => {
  window.localStorage.setItem(AppSettings.LOGIN_INFO_STORAGE_KEY, JSON.stringify(loginInfo));
};

/**
 * 清除當前的 登入資訊
 */
export const clearLoginInfo = () => {
  window.localStorage.removeItem(AppSettings.LOGIN_INFO_STORAGE_KEY);
};

/** 取得 Token */
export const getToken = () => {
  const loginInfo = getLoginInfo();

  return loginInfo ? loginInfo.token : null;
};
