import { Location } from './types';
import { PayloadAction } from '@shared/types';

export type ChangeLocationActionCreator = (
  location: Location,
) => PayloadAction<'@@router/changeLocation', { location: Location }>;

export const changeLocationActionCreator: ChangeLocationActionCreator = (
  location,
) => ({
  type: '@@router/changeLocation',
  payload: {
    location,
  },
});

export type RouterAction = ReturnType<ChangeLocationActionCreator>;
