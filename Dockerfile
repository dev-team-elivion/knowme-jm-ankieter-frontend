# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
WORKDIR /build
# .npmrc goes in with the lockfile: it keeps install scripts off for npm ci here as well.
COPY package.json package-lock.json .npmrc ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
RUN npm run build

FROM nginx:1.30-alpine
# One image for every environment: the address of the backend is filled in when the container
# starts. The filter keeps envsubst away from nginx's own $variables.
ENV BACKEND_URL=http://ankieter-backend:8081 \
    NGINX_RESOLVER=127.0.0.11 \
    NGINX_ENVSUBST_FILTER="^(BACKEND_URL|NGINX_RESOLVER)$"
COPY nginx/default.conf.template /etc/nginx/templates/
COPY --from=build /build/build/ /usr/share/nginx/html/
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1/nginx-health || exit 1
