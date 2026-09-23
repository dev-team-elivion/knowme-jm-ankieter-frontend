import { createTheme, Theme } from '@mui/material/styles';

import { components } from '@/config/theme/components.ts';
import { darkThemeColors, lightThemeColors, ThemeColorSet } from '@/config/theme/themeColors.ts';
import { typography } from '@/config/theme/typography.ts';

declare module '@mui/material/styles' {
  interface Theme {
    colors: ThemeColorSet;
  }

  interface ThemeOptions {
    colors?: ThemeColorSet;
  }
}

export type ThemeMode = 'dark' | 'light';

export const createAppTheme = (mode: ThemeMode): Theme => {
  const colors = mode === 'dark' ? darkThemeColors : lightThemeColors;

  return createTheme({
    colors,
    components,
    palette: {
      background: {
        default: colors.bg,
        paper: colors.bgCard,
      },
      error: { main: colors.red },
      info: { main: colors.blue },
      mode,
      primary: { contrastText: colors.onAccent, main: colors.accent },
      secondary: { main: colors.bgCard3 },
      success: { main: colors.green },
      text: {
        disabled: colors.textMuted,
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
      },
      warning: { main: colors.orange },
    },
    shape: { borderRadius: 12 },
    spacing: 8,
    typography,
  });
};
