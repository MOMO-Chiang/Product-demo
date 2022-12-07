import _ from 'lodash';

export const isEmpty = (val: string): boolean => _.isEmpty(val);

export const isNumber = (val: string | number): boolean =>
  _.isFinite(Number(val));
