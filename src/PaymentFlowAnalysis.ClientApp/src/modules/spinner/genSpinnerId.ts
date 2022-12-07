import { v4 as uuidV4 } from 'uuid';

/**
 * 產生 Spinner id
 * @description id 用來控制 Spinner 顯示與隱藏
 * @returns Spinner id
 */
export function genSpinnerId() {
  return uuidV4();
}
