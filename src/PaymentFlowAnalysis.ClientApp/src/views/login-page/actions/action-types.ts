/** Enum of action's type */
export enum ActionType {
  /** 重置 Page State */
  RESET_PAGE_STATE = '@LoginPage/RESET_PAGE_STATE',

  /** 初始頁面 */
  INIT_PAGE = '@LoginPage/INIT_PAGE',

  /** 初始頁面 - 成功 */
  INIT_PAGE_SUCCESS = '@LoginPage/INIT_PAGE_SUCCESS',

  /** 初始頁面 - 失敗 */
  INIT_PAGE_FAILURE = '@LoginPage/INIT_PAGE_FAILURE',

  /** 登入 */
  LOGIN = '@LoginPage/LOGIN',

  /** 登入 - 成功 */
  LOGIN_SUCCESS = '@LoginPage/LOGIN_SUCCESS',

  /** 登入 - 失敗 */
  LOGIN_FAILURE = '@LoginPage/LOGIN_FAILURE',
}

/** LoginPage Action */
export type LoginPageAction =
  | ResetPageStateAction
  | InitPageAction
  | InitPageSuccessAction
  | InitPageFailureAction
  | LoginAction
  | LoginSuccessAction
  | LoginFailureAction;

/**重置 Page State */
export interface ResetPageStateAction {
  type: ActionType.RESET_PAGE_STATE;
}

/** 初始頁面 */
export interface InitPageAction {
  type: ActionType.INIT_PAGE;
}

/** 初始頁面 - 成功 */
export interface InitPageSuccessAction {
  type: ActionType.INIT_PAGE_SUCCESS;
  payload: { isLogged: boolean };
}

/** 初始頁面 - 失敗 */
export interface InitPageFailureAction {
  type: ActionType.INIT_PAGE_FAILURE;
}

/** 登入 */
export interface LoginAction {
  type: ActionType.LOGIN;
  payload: { account: string; password: string };
}

/** 登入 - 成功 */
export interface LoginSuccessAction {
  type: ActionType.LOGIN_SUCCESS;
}

/** 登入 - 失敗 */
export interface LoginFailureAction {
  type: ActionType.LOGIN_FAILURE;
}
