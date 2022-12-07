import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showSpinnerActionCreator, hideSpinnerActionCreator } from './actions';
import { genSpinnerId } from './genSpinnerId';

/** Spinner Hook */
export const useSpinner = () => {
  const dispatch = useDispatch();

  /**
   * 顯示 Spinner
   * @returns Spinner id
   */
  const showSpinner = useCallback(
    (params?: { uid?: string; message?: string }) => {
      const _uid = (params && params.uid) || genSpinnerId();
      const _message = params && params.message;
      dispatch(showSpinnerActionCreator(_uid, _message));

      return _uid;
    },
    [dispatch],
  );

  const hideSpinner = useCallback(
    (uid: string) => {
      dispatch(hideSpinnerActionCreator(uid));
    },
    [dispatch],
  );

  return { showSpinner, hideSpinner };
};
