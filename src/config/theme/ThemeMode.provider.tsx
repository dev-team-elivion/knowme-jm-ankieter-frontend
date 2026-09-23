import { CssBaseline, ThemeProvider } from '@mui/material';
import { JSX, ReactNode, useCallback, useMemo, useState } from 'react';

import { createAppTheme, ThemeMode } from '@/config/theme/theme.ts';
import { ThemeModeContext } from '@/config/theme/ThemeMode.context.ts';
import { readStoredThemeMode, storeThemeMode } from '@/config/theme/themeModeStorage.util.ts';

type Props = {
  children: ReactNode;
};

export const ThemeModeProvider = ({ children }: Props): JSX.Element => {
  const [mode, setMode] = useState<ThemeMode>(readStoredThemeMode);

  const toggleMode = useCallback(() => {
    setMode(previous => {
      const next = previous === 'dark' ? 'light' : 'dark';
      storeThemeMode(next);
      return next;
    });
  }, []);

  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const contextValue = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return (
    <ThemeModeContext value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext>
  );
};
