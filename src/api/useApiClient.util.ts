import { useMemo } from 'react';

import { useAxiosInstance } from '@/api/useAxiosInstance.util.ts';
import { CONFIG } from '@/config/config.ts';

import { Configuration, CsrfApiFactory, CurrentUserApiFactory, PingApiFactory } from './generated';

export const useApiClient = () => {
  const axiosInstance = useAxiosInstance();
  const configuration = useMemo(() => getConfiguration(CONFIG.HOST), []);

  return useMemo(
    () => ({
      csrfApi: CsrfApiFactory(configuration, undefined, axiosInstance),
      currentUserApi: CurrentUserApiFactory(configuration, undefined, axiosInstance),
      pingApi: PingApiFactory(configuration, undefined, axiosInstance),
    }),
    [axiosInstance, configuration],
  );
};

const getConfiguration = (basePath: string): Configuration => ({
  basePath,
  isJsonMime(_mime: string): boolean {
    return true;
  },
});
