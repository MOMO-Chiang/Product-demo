import { AnyAction } from 'redux';

export interface HomeModuleState {}

export const homeModuleReducer = (
  state: HomeModuleState = {} as HomeModuleState,
  action: AnyAction,
): HomeModuleState => {
  switch (action.type) {
    default:
      return state;
  }
};
