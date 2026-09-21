import axios from 'axios';

import { CONFIG } from '@/config/config.ts';

type Token = {
  headerName: string;
  parameterName: string;
  token: string;
};

// The backend uses HttpSessionCsrfTokenRepository: the token is stable for the whole session and
// does not rotate per request, so it is fetched once and reused.
let cachedToken: null | string = null;
let inFlight: null | Promise<string> = null;

export const getCsrfToken = async (): Promise<string> => {
  if (cachedToken !== null) {
    return cachedToken;
  }
  inFlight ??= axios
    .get<Token>(`${CONFIG.HOST}/api/v1/csrf`, { withCredentials: true })
    .then(response => {
      cachedToken = response.data.token;
      return cachedToken;
    })
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
};

/** Drops the cached token so the next mutating request fetches a fresh one. */
export const invalidateCsrfToken = (): void => {
  cachedToken = null;
  inFlight = null;
};
