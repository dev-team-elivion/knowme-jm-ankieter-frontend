import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSX } from 'react';

import { theme } from '@/theme/theme.ts';
import { HomeView } from '@/views/Home/Home.view.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
});

const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomeView />
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
