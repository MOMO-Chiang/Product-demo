import { Reducer } from '@shared/types';
import { SpinnerAction } from './actions';
import { SHOW_SPINNER, HIDE_SPINNER } from './constants';

/** Spinner 資料 */
interface Spinner {
  /** 識別 id */
  uid: string;
  /** 顯示文字 */
  message?: string;
}

/** Spinner module 的 Redux State */
export interface SpinnerReduxState {
  /** 是否顯示 flag */
  show: boolean;
  /** Spinner 資料陣列 */
  spinners: Spinner[];
}

const initialState: SpinnerReduxState = {
  show: false,
  spinners: [],
};

/**
 * Spinner root reducer for redux
 */
export const spinnerReducer: Reducer<SpinnerReduxState, SpinnerAction> = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SPINNER: {
      const { uid, message } = action.payload;

      return {
        ...state,
        show: true,
        spinners: state.spinners.concat({ uid, message }),
      };
    }

    case HIDE_SPINNER: {
      const { uid } = action.payload;
      const newSpinners = state.spinners.filter((s) => s.uid !== uid);

      return {
        ...state,
        show: newSpinners.length > 0,
        spinners: newSpinners,
      };
    }

    default:
      return state;
  }
};
