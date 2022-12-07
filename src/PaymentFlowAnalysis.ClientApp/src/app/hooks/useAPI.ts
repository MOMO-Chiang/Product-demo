import { AdminHttpRequestError } from '@app/apis/admin/base';
import { useState } from 'react';

type APIFunc<TArgs extends Array<any>, TResponse> = {
  (...args: TArgs): Promise<TResponse>;
};

/**
 * useAPI Hook
 *
 * @description 把指定指定的 app/apis/ 包裝成 hook 來使用
 * @param APIFunc API Promise Function
 *
 * TODO: 在 setError 與 setSuccess 之前先確保 isLoading 已經改為 false，在畫面上判斷 isLoading 時狀態才不會有 side effect。
 */
export const useAPI = <TArgs extends Array<any>, TRespData>(APIFunc: APIFunc<TArgs, TRespData>) => {
  const [data, setData] = useState<TRespData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<AdminHttpRequestError | null>(null);
  const request = async (...args: TArgs): Promise<void> => {
    setIsLoading(true);
    setSuccess(false);

    try {
      const respData = (await APIFunc(...args)) as TRespData;
      setData(respData);
      setSuccess(true);
    } catch (error) {
      setError(error as AdminHttpRequestError);
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };
  return { data, isLoading, success, error, request };
};
