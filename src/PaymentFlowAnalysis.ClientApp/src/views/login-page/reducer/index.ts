import { ActionType, LoginPageAction } from '../actions';

/** LoginPage Redux state */
export interface LoginPageReduxState {
  /** 是否成功初始頁面 */
  isInitPageSuccess: boolean | null;

  /** 是否登入 */
  isLogged: boolean;
}

/** LoginPage Redux initial state */
const initialState: LoginPageReduxState = {
  isInitPageSuccess: null,
  isLogged: false,
};

/** LoginPage Reducer */
export const loginPageReducer = (state = initialState, action: LoginPageAction): LoginPageReduxState => {
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
      return {
        ...state,
        isInitPageSuccess: true,
        isLogged: action.payload.isLogged,
      };
    }

    /** 初始頁面 - 失敗 */
    case ActionType.INIT_PAGE_FAILURE: {
      return { ...state, isInitPageSuccess: false };
    }

    case ActionType.LOGIN_SUCCESS: {
      return { ...state, isLogged: true };
    }

    case ActionType.LOGIN_FAILURE: {
      return { ...state, isLogged: false };
    }

    default:
      return state;
  }
};
