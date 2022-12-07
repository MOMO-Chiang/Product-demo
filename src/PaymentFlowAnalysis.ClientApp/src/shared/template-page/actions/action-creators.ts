import { ActionType, TemplatePageAction } from './action-types';

/** 重置 Page State */
export const resetPageStateActionCreator = (): TemplatePageAction => ({
  type: ActionType.RESET_PAGE_STATE,
});

/** 初始頁面 */
export const initPageActionCreator = (): TemplatePageAction => ({
  type: ActionType.INIT_PAGE,
});

/** 初始頁面 - 成功 */
export const initPageSuccessActionCreator = (): TemplatePageAction => ({
  type: ActionType.INIT_PAGE_SUCCESS,
});

/** 初始頁面 - 失敗 */
export const initPageFailureActionCreator = (): TemplatePageAction => ({
  type: ActionType.INIT_PAGE_FAILURE,
});
