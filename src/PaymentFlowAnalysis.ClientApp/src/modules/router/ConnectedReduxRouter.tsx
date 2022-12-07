import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeLocationActionCreator } from './actions';

export type ConnectedReduxRouterProps = {
  children: React.ReactNode;
};

export const ConnectedReduxRouter: React.FC<ConnectedReduxRouterProps> = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(
      // 只拿 location 的值，不需要整個 location 物件
      changeLocationActionCreator({
        hash: location.hash,
        key: location.key,
        pathname: location.pathname,
        search: location.search,
        state: location.state,
      }),
    );
  }, [location, dispatch]);

  return <>{props.children}</>;
};
