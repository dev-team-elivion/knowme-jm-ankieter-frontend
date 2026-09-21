# knowme-jm-ankieter-frontend

Frontend Ankietera 6.0 — Vite + React 19 + TypeScript + MUI + TanStack Query.

Klient API nie jest pisany ręcznie: generuje się go z kontraktu OpenAPI skopiowanego z backendu.

## Wymagania

- Node >= 22.12 (lokalnie: wersja z `.node-version`)
- działający backend (domyślnie http://localhost:8081)

## Uruchomienie

```bash
npm install
```

Adres backendu bierze się z `.env.local`, który **nie jest w repozytorium** — każdy tworzy go u siebie
(tak samo jak w jAIn). Bez tego pliku front uderza pod adres względny i dostaje 404:

```bash
printf 'VITE_HOST_URL=http://localhost:8081\nVITE_ENVIRONMENT=local\n' > .env.local
```

```bash
npm run dev
```

Front startuje na **http://localhost:3001** (obok frontu jAIn na 3000).

## Skrypty

| Komenda | Co robi |
| --- | --- |
| `npm run dev` | serwer deweloperski |
| `npm run build` | `tsc` + build produkcyjny do `build/` |
| `npm run lint` | ESLint z `--max-warnings 0` |
| `npm run generate:api` | generuje klienta z `api-generator/openapi.yaml` |

## Generowanie klienta API

Kontrakt jest **kopią** pliku z backendu — nie edytujemy go tutaj ręcznie.

1. Skopiuj `openapi.yaml` oraz zmienione pliki `paths/` z backendu do `api-generator/`.
2. Uruchom generator:

```bash
npm run generate:api
```

3. Zarejestruj nową fabrykę (`XxxApiFactory`) w `src/api/useApiClient.util.ts`.

Wygenerowany kod trafia do `src/api/generated/` i **nie jest edytowany ręcznie** ani lintowany.
Hooki React Query wołają wyłącznie metody z `useApiClient()` — nigdy `axiosInstance` bezpośrednio.

## Sesja i CSRF

Axios jedzie z `withCredentials: true`, bo lokalnie front (:3001) i backend (:8081) to różne originy,
a cookie sesji musi krążyć cross-origin. Token CSRF pobierany jest raz z `GET /api/v1/csrf`
i dokładany do żądań zmieniających stan.
