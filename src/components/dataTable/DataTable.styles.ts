import { ThemeColorSet } from '@/config/theme/themeColors.ts';

export const dataTableSx = (colors: ThemeColorSet) => ({
  '& .MuiTableCell-head': {
    backgroundColor: colors.bgCard,
    borderBottom: `1px solid ${colors.border}`,
    color: colors.textSecondary,
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
    lineHeight: 1.2,
    py: 1.5,
    textTransform: 'uppercase' as const,
    whiteSpace: 'nowrap' as const,
  },
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${colors.border}`,
    color: colors.textPrimary,
    py: 1.25,
  },
  '& .MuiTableRow-hover:hover .MuiTableCell-root': {
    backgroundColor: colors.bgCard2,
  },
  '& .MuiTableSortLabel-icon': {
    color: `${colors.accentInk} !important`,
  },
  '& .MuiTableSortLabel-root': {
    '&.Mui-active, &:hover': {
      color: colors.accentInk,
    },
    color: colors.textSecondary,
  },
  minWidth: 720,
});

export const visuallyHiddenSx = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
} as const;

export const dataTableBodyFetchingSx = {
  opacity: 0.55,
  transition: 'opacity 0.2s ease',
} as const;
