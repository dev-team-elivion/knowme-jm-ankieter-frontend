import { JSX, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { AppErrorBoundary } from '@/components/appState/AppErrorBoundary.comp.tsx';
import { PageLoading } from '@/components/layout/routes/PageLoading.comp.tsx';
import { RouteEnum } from '@/models/route/Route.enum.ts';
import { ROUTES } from '@/models/route/routes.ts';
import { NotFoundView } from '@/views/notFound/NotFound.view.tsx';

export const AppRoutes = (): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <AppErrorBoundary resetKey={pathname} variant="inline">
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route element={<Navigate replace to={RouteEnum.DASHBOARD} />} path={RouteEnum.ROOT} />
          {ROUTES.map(({ component: Component, path }) => (
            <Route element={<Component />} key={path} path={path} />
          ))}
          <Route element={<NotFoundView />} path="*" />
        </Routes>
      </Suspense>
    </AppErrorBoundary>
  );
};
