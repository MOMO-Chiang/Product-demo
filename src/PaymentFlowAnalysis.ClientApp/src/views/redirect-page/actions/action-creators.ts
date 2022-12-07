import { ActionType, LoginADAction, LoginADFailureAction, LoginADSuccessAction, RedirectPageAction } from './action-types';

/** 重置 Page State */
export const resetPageStateActionCreator = (): RedirectPageAction => ({
  type: ActionType.RESET_PAGE_STATE,
});

/** 初始頁面 */
export const initPageActionCreator = (): RedirectPageAction => ({
  type: ActionType.INIT_PAGE,
});

/** 初始頁面 - 成功 */
export const initPageSuccessActionCreator = (): RedirectPageAction => ({
  type: ActionType.INIT_PAGE_SUCCESS,
});

/** 初始頁面 - 失敗 */
export const initPageFailureActionCreator = (): RedirectPageAction => ({
  type: ActionType.INIT_PAGE_FAILURE,
});

/** 登入 */
export const loginADActionCreator = (): LoginADAction => ({
  type: ActionType.LOGINAD,
});

/** 登入 - 成功 */
export const loginADSuccessActionCreator = (): LoginADSuccessAction => ({
  type: ActionType.LOGINAD_SUCCESS,
});

/** 登入 - 失敗 */
export const loginADFailureActionCreator = (): LoginADFailureAction => ({
  type: ActionType.LOGINAD_FAILURE,
});
