import { AppState } from '@app/store';
import { RouteURL, useNavigation } from '@modules/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initPageActionCreator, loginADActionCreator } from './actions';

/** 「模板頁面」元件 */
export const RedirectPage = () => {
  const dispatch = useDispatch();

  const isAdLoginSuccess = useSelector((state: AppState) => state.pages.redirect.isAdLoginSuccess);

  const navigation = useNavigation();

  useEffect(() => {
    // isAdLoginSuccess 有可能是null, 要明確判斷
    if (isAdLoginSuccess === false) {
      navigation.replace(RouteURL.LOGIN);
    } else if (isAdLoginSuccess) {
      navigation.replace(RouteURL.CRYPTO_PERSONAL_INFO);
    }
  }, [isAdLoginSuccess]);

  useEffect(() => {
    dispatch(initPageActionCreator());
    dispatch(loginADActionCreator());
  }, [dispatch]);

  return <div>跳轉中 請稍候</div>;
};
