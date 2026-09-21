/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: string;
  readonly VITE_HOST_URL: string;
  readonly VITE_HOST_URL_LOCAL: string;
  readonly VITE_KEYCLOAK_REDIRECT_URL: string;
}
