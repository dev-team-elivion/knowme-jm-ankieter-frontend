import { ThemeColorSet } from '@/config/theme/themeColors.ts';

export const TOP_BAR_HEIGHT = 64;
export const SIDE_MENU_WIDTH = 256;
export const SIDE_MENU_COLLAPSED_WIDTH = 72;
export const CONTENT_MAX_WIDTH = 1440;

export const microLabelSx = (color: string) => ({
  color,
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  lineHeight: 1.2,
  textTransform: 'uppercase' as const,
});

export const fieldLabelSx = (colors: ThemeColorSet) => ({
  color: colors.textSecondary,
  display: 'block',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.6px',
  lineHeight: 1.4,
  mb: '6px',
});

export const numericSx = { fontVariantNumeric: 'tabular-nums' } as const;

export const panelSx = (colors: ThemeColorSet) => ({
  background: colors.bgCard,
  border: `1px solid ${colors.border}`,
  borderRadius: '20px',
  boxShadow: colors.shadowCard,
});

export const innerPanelSx = (colors: ThemeColorSet) => ({
  background: colors.bgCard2,
  border: `1px solid ${colors.border}`,
  borderRadius: '16px',
});

export const sectionLabelSx = (colors: ThemeColorSet) => ({
  '&::after': {
    background: colors.border,
    content: '""',
    flex: 1,
    height: '1px',
  },
  alignItems: 'center',
  color: colors.textMuted,
  display: 'flex',
  fontSize: '11px',
  fontWeight: 800,
  gap: '8px',
  textTransform: 'uppercase' as const,
});

export const iconTileSx = (background: string, size = 44, borderColor?: string) => ({
  alignItems: 'center',
  background,
  border: borderColor ? `1px solid ${borderColor}` : undefined,
  borderRadius: '12px',
  display: 'flex',
  flexShrink: 0,
  height: size,
  justifyContent: 'center',
  width: size,
});

export const statusPillSx = (color: string) => ({
  background: `${color}1A`,
  border: `1px solid ${color}40`,
  borderRadius: 50,
  color,
  display: 'inline-flex',
  flexShrink: 0,
  fontSize: '11px',
  fontWeight: 600,
  lineHeight: 1.4,
  px: 1.25,
  py: 0.25,
  whiteSpace: 'nowrap' as const,
});

export const progressBarSx = (colors: ThemeColorSet, from: string, to: string, height = 6) => ({
  '& .MuiLinearProgress-bar': {
    background: `linear-gradient(90deg, ${from}, ${to})`,
    borderRadius: 4,
  },
  background: colors.bgCard3,
  borderRadius: 4,
  height,
});

export const revealSx = (index = 0) => ({
  '@keyframes uiReveal': {
    from: { opacity: 0, transform: 'translateY(10px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
  animation: 'uiReveal 460ms cubic-bezier(0.16, 1, 0.3, 1) both',
  animationDelay: `${index * 60}ms`,
});

export const pressableSx = {
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  '&:active:not(.Mui-disabled)': { transform: 'scale(0.96)' },
  transition: 'transform 120ms cubic-bezier(0.2, 0, 0, 1)',
} as const;
