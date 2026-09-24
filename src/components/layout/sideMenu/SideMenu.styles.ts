import { ThemeColorSet } from '@/config/theme/themeColors.ts';
import {
  panelSx,
  SIDE_MENU_COLLAPSED_WIDTH,
  SIDE_MENU_WIDTH,
  TOP_BAR_HEIGHT,
} from '@/config/theme/uiTokens.ts';

const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

export const sideMenuSx = (colors: ThemeColorSet, collapsed: boolean) => ({
  ...panelSx(colors),
  display: 'flex',
  flexDirection: 'column' as const,
  flexShrink: 0,
  height: `calc(100vh - ${TOP_BAR_HEIGHT}px - 32px)`,
  m: 2,
  mr: 0,
  overflow: 'hidden',
  position: 'sticky' as const,
  top: TOP_BAR_HEIGHT + 16,
  transition: `width 0.28s ${EASING}`,
  width: collapsed ? SIDE_MENU_COLLAPSED_WIDTH : SIDE_MENU_WIDTH,
});

export const sideMenuItemSx = (colors: ThemeColorSet, collapsed: boolean) => ({
  '&:focus-visible': {
    boxShadow: `0 0 0 3px ${colors.fieldRing}`,
    outline: 'none',
  },
  '&:hover:not(.active)': {
    background: colors.bgHover,
    color: colors.textPrimary,
  },
  '&.active': {
    '& .side-menu-indicator': {
      transform: 'scaleY(1)',
    },
    background: colors.accentBg,
    color: colors.accentInk,
    fontWeight: 700,
  },
  '& .side-menu-indicator': {
    background: colors.accentInk,
    borderRadius: 4,
    bottom: 8,
    left: 0,
    position: 'absolute' as const,
    top: 8,
    transform: 'scaleY(0)',
    transition: `transform 0.25s ${EASING}`,
    width: 3,
  },
  '& svg': {
    flexShrink: 0,
    fontSize: 20,
  },
  alignItems: 'center',
  borderRadius: '10px',
  color: colors.textSecondary,
  display: 'flex',
  fontSize: 14,
  fontWeight: 600,
  gap: 1.5,
  height: 42,
  justifyContent: collapsed ? 'center' : 'flex-start',
  position: 'relative' as const,
  px: collapsed ? 0 : 1.75,
  textDecoration: 'none',
  transition: 'background-color 0.2s ease, color 0.2s ease',
});
