const STORAGE_KEY = 'ankieter-side-menu-collapsed';

export const readSideMenuCollapsed = (): boolean => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
};

export const storeSideMenuCollapsed = (collapsed: boolean): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(collapsed));
  } catch {
    return;
  }
};
