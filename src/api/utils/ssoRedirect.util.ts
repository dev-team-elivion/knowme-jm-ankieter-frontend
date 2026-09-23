import { CONFIG } from '@/config/config.ts';

const RETURN_PATH_STORAGE_KEY = 'ankieter-return-path';

let isRedirecting = false;

export const getSsoLoginUrl = (): string => `${CONFIG.HOST}/${CONFIG.KEYCLOAK_REDIRECT_URL}`;

const rememberReturnPath = (): void => {
  const { hash, pathname, search } = window.location;
  try {
    window.sessionStorage.setItem(RETURN_PATH_STORAGE_KEY, `${pathname}${search}${hash}`);
  } catch {
    return;
  }
};

export const redirectToSso = (): void => {
  if (isRedirecting) {
    return;
  }
  isRedirecting = true;
  rememberReturnPath();
  window.location.assign(getSsoLoginUrl());
};

export const consumeReturnPath = (): null | string => {
  try {
    const path = window.sessionStorage.getItem(RETURN_PATH_STORAGE_KEY);
    window.sessionStorage.removeItem(RETURN_PATH_STORAGE_KEY);
    return path?.startsWith('/') === true && !path.startsWith('//') ? path : null;
  } catch {
    return null;
  }
};
