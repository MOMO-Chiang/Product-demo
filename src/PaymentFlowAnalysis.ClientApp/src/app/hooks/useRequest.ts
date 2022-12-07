import { useState } from 'react';
import { httpRequest, HttpRequestOptions } from '@shared/http-request';

export type RequestOptions = HttpRequestOptions;

export const useRequest = <TRespData = any, TRespError = any>() => {
  const [data, setData] = useState<TRespData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<TRespError>();

  const request = async (options: RequestOptions) => {
    setIsLoading(true);

    try {
      const response = await httpRequest<TRespData>(options);
      setData(response.data);
    } catch (error) {
      setError(error as TRespError);
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, success, error, request };
};
