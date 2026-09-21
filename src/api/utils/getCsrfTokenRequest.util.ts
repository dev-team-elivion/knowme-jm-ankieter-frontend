import axios from 'axios';

import { CONFIG } from '@/config/config.ts';

type Token = {
  headerName: string;
  parameterName: string;
  token: string;
};

// Backend uzywa HttpSessionCsrfTokenRepository - token jest staly przez cale zycie sesji i nie rotuje
// per zadanie, wiec pobieramy go raz i trzymamy w pamieci. Rownolegle pierwsze zapisy czekaja na to
// samo zadanie w locie zamiast kazdy bic po /csrf.
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

/** Czysci cache, zeby kolejny zapis pobral swiezy token (np. po wylogowaniu). */
export const invalidateCsrfToken = (): void => {
  cachedToken = null;
  inFlight = null;
};
