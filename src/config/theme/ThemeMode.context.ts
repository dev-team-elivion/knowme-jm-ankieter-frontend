import { createContext, use } from 'react';

import { ThemeMode } from '@/config/theme/theme.ts';

type ThemeModeContextValue = {
  mode: ThemeMode;
  toggleMode: () => void;
};

export const ThemeModeContext = createContext<ThemeModeContextValue>({
  mode: 'light',
  toggleMode: () => undefined,
});

export const useThemeMode = (): ThemeModeContextValue => use(ThemeModeContext);
