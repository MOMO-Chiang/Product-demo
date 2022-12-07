import { ActionType, LoginPageAction } from './action-types';

/** 重置 Page State */
export const resetPageStateActionCreator = (): LoginPageAction => ({
  type: ActionType.RESET_PAGE_STATE,
});

/** 初始頁面 */
export const initPageActionCreator = (): LoginPageAction => ({
  type: ActionType.INIT_PAGE,
});

/** 初始頁面 - 成功 */
export const initPageSuccessActionCreator = (isLogged: boolean): LoginPageAction => ({
  type: ActionType.INIT_PAGE_SUCCESS,
  payload: { isLogged },
});

/** 初始頁面 - 失敗 */
export const initPageFailureActionCreator = (): LoginPageAction => ({
  type: ActionType.INIT_PAGE_FAILURE,
});

/** 登入 */
export const loginActionCreator = (account: string, password: string): LoginPageAction => ({
  type: ActionType.LOGIN,
  payload: { account, password },
});

/** 登入 - 成功 */
export const loginSuccessActionCreator = (): LoginPageAction => ({
  type: ActionType.LOGIN_SUCCESS,
});

/** 登入 - 失敗 */
export const loginFailureActionCreator = (): LoginPageAction => ({
  type: ActionType.LOGIN_FAILURE,
});
