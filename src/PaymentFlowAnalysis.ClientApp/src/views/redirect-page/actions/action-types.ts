/** Enum of action's type */
export enum ActionType {
  /** 重置 Page State */
  RESET_PAGE_STATE = '@RedirectPage/RESET_PAGE_STATE',

  /** 初始頁面 */
  INIT_PAGE = '@RedirectPage/INIT_PAGE',

  /** 初始頁面 - 成功 */
  INIT_PAGE_SUCCESS = '@RedirectPage/INIT_PAGE_SUCCESS',

  /** 初始頁面 - 失敗 */
  INIT_PAGE_FAILURE = '@RedirectPage/INIT_PAGE_FAILURE',

  /** 登入 */
  LOGINAD = '@RedirectPage/LOGINAD',

  /** 登入 - 成功 */
  LOGINAD_SUCCESS = '@RedirectPage/LOGINAD_SUCCESS',

  /** 登入 - 失敗 */
  LOGINAD_FAILURE = '@RedirectPage/LOGINAD_FAILURE',
}

/** RedirectPage Action */
export type RedirectPageAction =
  | ResetPageStateAction
  | InitPageAction
  | InitPageSuccessAction
  | InitPageFailureAction
  | LoginADAction
  | LoginADSuccessAction
  | LoginADFailureAction;

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
}

/** 初始頁面 - 失敗 */
export interface InitPageFailureAction {
  type: ActionType.INIT_PAGE_FAILURE;
}

/** 登入 */
export interface LoginADAction {
  type: ActionType.LOGINAD;
}

/** 登入 - 成功 */
export interface LoginADSuccessAction {
  type: ActionType.LOGINAD_SUCCESS;
}

/** 登入 - 失敗 */
export interface LoginADFailureAction {
  type: ActionType.LOGINAD_FAILURE;
}
