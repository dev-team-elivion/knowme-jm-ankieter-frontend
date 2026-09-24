import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSX } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppErrorBoundary } from '@/components/appState/AppErrorBoundary.comp.tsx';
import { BackendGate } from '@/components/appState/BackendGate.comp.tsx';
import { AppLayout } from '@/components/layout/AppLayout.comp.tsx';
import { NotificationProvider } from '@/components/notifications/Notification.provider.tsx';
import { ThemeModeProvider } from '@/config/theme/ThemeMode.provider.tsx';
import { CurrentUserProvider } from '@/contexts/currentUser/CurrentUser.provider.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 30_000,
    },
  },
});

const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <ThemeModeProvider>
      <AppErrorBoundary variant="fullPage">
        <NotificationProvider>
          <BrowserRouter>
            <BackendGate>
              <CurrentUserProvider>
                <AppLayout />
              </CurrentUserProvider>
            </BackendGate>
          </BrowserRouter>
        </NotificationProvider>
      </AppErrorBoundary>
    </ThemeModeProvider>
  </QueryClientProvider>
);

export default App;
