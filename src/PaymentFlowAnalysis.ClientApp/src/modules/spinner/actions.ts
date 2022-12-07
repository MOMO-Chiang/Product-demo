import { PayloadAction } from '@shared/types';
import { SHOW_SPINNER, HIDE_SPINNER } from './constants';

/** @type ShowSpinnerAction */
export type ShowSpinnerAction = PayloadAction<typeof SHOW_SPINNER, { uid: string; message?: string }>;

/**
 * 顯示 Spinner
 * @param uid 自定義 id
 * @param message 自定義讀取時的訊息
 * @returns
 */
export const showSpinnerActionCreator = (uid: string, message?: string): ShowSpinnerAction => ({
  type: SHOW_SPINNER,
  payload: {
    uid,
    message,
  },
});

/** @type HideSpinnerAction */
export type HideSpinnerAction = PayloadAction<typeof HIDE_SPINNER, { uid: string }>;

/**
 * 隱藏 Spinner
 * @param uid 自定義 id
 * @returns
 */
export const hideSpinnerActionCreator = (uid: string): HideSpinnerAction => ({
  type: HIDE_SPINNER,
  payload: {
    uid,
  },
});

/** @type SpinnerAction */
export type SpinnerAction = ShowSpinnerAction | HideSpinnerAction;
