import { useCallback, useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import _ from 'lodash';

type NavigationOptions = {
  id?: string;
  params?: Record<string, any>;
  state?: Record<string, any>;
};

export const useNavigation = () => {
  const navigate = ReactRouterDOM.useNavigate();

  /**
   * 前往下一頁 (History push)
   * @param url 下一頁路由
   */
  const push = useCallback(
    (url: string, options: NavigationOptions = {}) => {
      const { state, params } = options;
      let _url = options.id ? `${url}/${options.id}` : url;

      if (params) {
        _url += serializeURIParams(params);
      }

      navigate(_url, { state: serializeLocationState(state) });
    },
    [navigate],
  );

  /**
   * 前往下一頁 (History replace)
   * @param url 下一頁路由
   */
  const replace = useCallback(
    (url: string, options: NavigationOptions = {}) => {
      const { state, params } = options;
      let _url = options.id ? `${url}/${options.id}` : url;

      if (params) {
        _url += serializeURIParams(params);
      }

      navigate(_url, { replace: true, state: serializeLocationState(state) });
    },
    [navigate],
  );

  /**
   * 回到上一頁
   */
  const back = useCallback(
    (options: NavigationOptions = {}) => {
      navigate(-1);
    },
    [navigate],
  );

  return {
    push,
    replace,
    back,
  };
};

/**
 * 取得當前路由的狀態
 *
 * @description
 * 使用此方法取得 Browser History 中暫存的當前路由狀態，
 * 需搭配 useNavigation 的 push 或 replace 傳入 state 來使用。
 *
 * @returns 當前路由的狀態
 */
export const useRouteState = <TState = Record<string, any>>() => {
  const location = ReactRouterDOM.useLocation();
  const [locationState, setLocationState] = useState(deSerializeLocationState(location.state));

  useEffect(() => {
    const currentState = deSerializeLocationState(location.state);

    if (!_.isEqual(locationState, currentState)) {
      setLocationState(currentState);
    }
  }, [location]);

  return locationState as TState;
};

/**
 * 取得當前路由參數
 * @returns 路由參數
 */
export const useRouteParams = <TParams extends Record<string, string>>() => {
  const location = ReactRouterDOM.useLocation();
  const params = ReactRouterDOM.useParams();
  const [searchParams, setSearchParams] = useState({ ...parseURIParams(location.search), ...params });

  useEffect(() => {
    const currentParams = { ...parseURIParams(location.search), ...params };
    if (!_.isEqual(searchParams, currentParams)) {
      setSearchParams(currentParams);
    }
  }, [location]);

  return params as TParams;
};

const parseURIParams = (search: string | null): Record<string, string> => {
  if (!search) {
    return {};
  }

  var _search = location.search.substring(1);
  return JSON.parse('{"' + decodeURI(_search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
};

const serializeURIParams = (params?: Record<string, any>) => {
  if (!params) {
    return '';
  }

  var str = [];
  for (var p in params)
    if (params.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
    }
  return str.join('&');
};

const serializeLocationState = (state?: Record<string, any>) => {
  if (state) {
    return JSON.stringify(state);
  }

  return '';
};

const deSerializeLocationState = (state?: any): Record<string, any> => {
  if (state) {
    try {
      const parsedState = JSON.parse(state);
      return parsedState;
    } catch (error) {}
  }

  return {};
};
