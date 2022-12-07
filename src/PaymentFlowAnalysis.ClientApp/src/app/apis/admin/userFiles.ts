import { UserFile } from '@shared/types';
import { AdminHttpRequest } from './base';

/**
 * 取得案件清單
 */
export const fetchUserFiles = () => {
  return AdminHttpRequest.get<UserFile>('/api/userFile');
};
