import * as Redux from 'redux';

/**
 * Basic Action
 * @type T 為 action.type 的類型
 */
export type Action<T> = Redux.Action<T>;

/**
 * Action with payload
 * @type T 為 action.type 的類型
 * @type P 為 action.payload 的類型
 */
export interface PayloadAction<T = any, P = any> extends Action<T> {
  payload: P;
}

/**
 * Reducer
 * @type S 為 State
 * @type A 為 Action
 */
export type Reducer<S = any, A extends Action<any> = Redux.AnyAction> = Redux.Reducer<S, A>;
