export type LayoutTranslation = {
  appName: string;
  appTagline: string;
  sideMenu: {
    collapse: string;
    expand: string;
    navigationLabel: string;
  };
  userMenu: {
    open: string;
    signedInAs: string;
    switchToDark: string;
    switchToLight: string;
  };
};

export const layoutTranslation: LayoutTranslation = {
  appName: 'Ankieter',
  appTagline: 'Tests and surveys',
  sideMenu: {
    collapse: 'Collapse menu',
    expand: 'Expand menu',
    navigationLabel: 'Main navigation',
  },
  userMenu: {
    open: 'Open user menu',
    signedInAs: 'Signed in as',
    switchToDark: 'Switch to dark theme',
    switchToLight: 'Switch to light theme',
  },
};
