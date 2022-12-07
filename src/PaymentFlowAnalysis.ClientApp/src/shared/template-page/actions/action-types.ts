/** Enum of action's type */
export enum ActionType {
  /** 重置 Page State */
  RESET_PAGE_STATE = '@TemplatePage/RESET_PAGE_STATE',

  /** 初始頁面 */
  INIT_PAGE = '@TemplatePage/INIT_PAGE',

  /** 初始頁面 - 成功 */
  INIT_PAGE_SUCCESS = '@TemplatePage/INIT_PAGE_SUCCESS',

  /** 初始頁面 - 失敗 */
  INIT_PAGE_FAILURE = '@TemplatePage/INIT_PAGE_FAILURE',
}

/** TemplatePage Action */
export type TemplatePageAction = ResetPageStateAction | InitPageAction | InitPageSuccessAction | InitPageFailureAction;

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
