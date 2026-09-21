export const CONFIG = {
  ENVIRONMENT: import.meta.env.VITE_ENVIRONMENT,
  HOST:
    import.meta.env.VITE_ENVIRONMENT === 'local'
      ? import.meta.env.VITE_HOST_URL_LOCAL
      : import.meta.env.VITE_HOST_URL,
  KEYCLOAK_REDIRECT_URL: import.meta.env.VITE_KEYCLOAK_REDIRECT_URL,
};
