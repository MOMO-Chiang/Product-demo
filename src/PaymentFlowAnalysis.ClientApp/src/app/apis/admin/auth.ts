import { AuthLoginInfo } from '@shared/types';
import { AdminHttpRequest } from './base';

/**
 * 登入
 * @param account 帳號
 * @param password 密碼
 */
export const login = (account: string, password: string) => {
  return AdminHttpRequest.post<AuthLoginInfo>('/api/auth/login', { account, password });
};

export const loginSSO = (userId: string, unitId: string) => {
  return AdminHttpRequest.post<AuthLoginInfo>('/api/auth/login/sso', { userId, unitId });
};

export const validateReferrer = (referrer: string) => {
  return AdminHttpRequest.get<boolean>('/api/auth/referrer/validate', referrer);
};
