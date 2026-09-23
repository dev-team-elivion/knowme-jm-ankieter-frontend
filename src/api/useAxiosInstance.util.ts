import axios from 'axios';
import { useMemo } from 'react';

import { hasHttpStatus } from '@/api/guards/isAxiosError.guard.ts';
import { HTTP_HEADER } from '@/api/httpHeaders.model.ts';
import { HttpMethod } from '@/api/HttpMethod.model.ts';
import { HttpStatusEnum } from '@/api/model/HttpStatus.enum.ts';
import { getCsrfToken } from '@/api/utils/getCsrfTokenRequest.util.ts';
import { redirectToSso } from '@/api/utils/ssoRedirect.util.ts';

type Return = ReturnType<typeof axios.create>;

const MUTATING_METHODS: string[] = [
  HttpMethod.POST,
  HttpMethod.PUT,
  HttpMethod.PATCH,
  HttpMethod.DELETE,
];

// withCredentials: the session cookie has to travel cross-origin (front :3001 -> backend :8081).
export const useAxiosInstance = (): Return =>
  useMemo(() => {
    const instance = axios.create({ withCredentials: true });

    instance.interceptors.request.use(async config => {
      if (config.method !== undefined && MUTATING_METHODS.includes(config.method)) {
        config.headers[HTTP_HEADER['X-CSRF-Token']] = await getCsrfToken();
      }
      return config;
    });

    instance.interceptors.response.use(undefined, (error: unknown) => {
      if (hasHttpStatus(error, HttpStatusEnum.UNAUTHORIZED)) {
        redirectToSso();
      }
      return Promise.reject(error instanceof Error ? error : new Error(String(error)));
    });

    return instance;
  }, []);
