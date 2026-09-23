import { ThemeMode } from '@/config/theme/theme.ts';

const STORAGE_KEY = 'ankieter-theme-mode';

const isThemeMode = (value: unknown): value is ThemeMode => value === 'dark' || value === 'light';

const getSystemThemeMode = (): ThemeMode =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const readStoredThemeMode = (): ThemeMode => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isThemeMode(stored) ? stored : getSystemThemeMode();
  } catch {
    return getSystemThemeMode();
  }
};

export const storeThemeMode = (mode: ThemeMode): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    return;
  }
};
