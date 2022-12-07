import { Reducer } from 'redux';
import { RouterAction } from './actions';
import { Location } from './types';

export type RouterState = {
  /** history 的紀錄列表 */
  histories: Location[];
  /** 當前 Location */
  current: Location | null;
  /** 前一頁 Location */
  previous: Location | null;
  /** 下一頁 Location */
  next: Location | null;
};

const initialState: RouterState = {
  histories: [],
  current: null,
  previous: null,
  next: null,
};

export const routerReducer: Reducer<RouterState, RouterAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case '@@router/changeLocation': {
      const { location } = action.payload;

      // 更新紀錄列表
      let histories = [...state.histories];

      if (state.current) {
        const currIndex = state.histories.findIndex(
          (v) => v.key === state.current?.key,
        );
        const isLocationExists = state.histories.some(
          (v) => v.key === location.key,
        );

        if (!isLocationExists) {
          histories = state.histories
            .filter((_v, i) => i <= currIndex)
            .concat(location);
        }
      } else {
        histories = [location];
      }

      // 更新 當前頁 location
      const current = location;
      const currentIndex = histories.findIndex((v) => v.key === location.key);

      // 更新 前一頁 location
      const previous = currentIndex >= 1 ? histories[currentIndex - 1] : null;

      // 更新 下一頁 location
      const next =
        currentIndex === histories.length - 1
          ? null
          : histories[currentIndex + 1];

      return {
        ...state,
        histories,
        current,
        previous,
        next,
      };
    }

    default:
      return state;
  }
};
