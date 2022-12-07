import { ActionType, TemplatePageAction } from '../actions';

/** TemplatePage Redux state */
export interface TemplatePageReduxState {
  /** 是否成功初始頁面 */
  isInitPageSuccess: boolean | null;
}

/** TemplatePage Redux initial state */
const initialState: TemplatePageReduxState = {
  isInitPageSuccess: null,
};

/** TemplatePage Reducer */
export const templatePageReducer = (state = initialState, action: TemplatePageAction): TemplatePageReduxState => {
  switch (action.type) {
    /**重置 Page State */
    case ActionType.RESET_PAGE_STATE: {
      return initialState;
    }

    /** 初始頁面 */
    case ActionType.INIT_PAGE: {
      return { ...state, isInitPageSuccess: null };
    }

    /** 初始頁面 - 成功 */
    case ActionType.INIT_PAGE_SUCCESS: {
      return { ...state, isInitPageSuccess: true };
    }

    /** 初始頁面 - 失敗 */
    case ActionType.INIT_PAGE_FAILURE: {
      return { ...state, isInitPageSuccess: false };
    }

    default:
      return state;
  }
};
