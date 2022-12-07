import { createStore, applyMiddleware, Middleware, compose, $CombinedState, PreloadedState, AnyAction, Store } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { __DEV__ } from '../../shared/app-settings';
import { rootReducer, RootState } from '../../_App_Start/ReducerConfig';
import { rootSaga } from '../../_App_Start/SagaConfig';

/** App root state type */
export type AppState = Omit<RootState, typeof $CombinedState>;

export type AppStore = Store<AppState, AnyAction>;

/**
 * create app store
 * @param preloadedState preloadedState
 * @returns AppStore
 */
export const configureStore = (preloadedState?: PreloadedState<AppState>): AppStore => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: Middleware[] = [thunk, sagaMiddleware];

  if (__DEV__) {
    const logger = require('redux-logger').createLogger({ collapsed: true });
    middlewares.push(logger);
  }

  const composeEnhancers =
    __DEV__ && typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  const store = createStore(rootReducer, preloadedState || {}, composeEnhancers(applyMiddleware(...middlewares)));

  sagaMiddleware.run(rootSaga);

  return store;
};
