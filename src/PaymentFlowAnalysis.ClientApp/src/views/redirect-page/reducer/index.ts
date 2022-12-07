import { ActionType, RedirectPageAction } from '../actions';

/** RedirectPage Redux state */
export interface RedirectPageReduxState {
  /** 是否成功初始頁面 */
  isInitPageSuccess: boolean | null;
  /** 是否登入成功 */
  isAdLoginSuccess: boolean | null;
}

/** RedirectPage Redux initial state */
const initialState: RedirectPageReduxState = {
  isInitPageSuccess: null,
  isAdLoginSuccess: null,
};

/** RedirectPage Reducer */
export const redirectPageReducer = (state = initialState, action: RedirectPageAction): RedirectPageReduxState => {
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

    /** 登入 - 成功 */
    case ActionType.LOGINAD_SUCCESS: {
      return { ...state, isAdLoginSuccess: true };
    }

    /** 登入 - 失敗 */
    case ActionType.LOGINAD_FAILURE: {
      return { ...state, isAdLoginSuccess: false };
    }

    default:
      return state;
  }
};
