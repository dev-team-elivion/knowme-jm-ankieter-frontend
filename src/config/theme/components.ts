import { Components, Theme } from '@mui/material/styles';

type ThemeWithoutComponents = Omit<Theme, 'components'>;

const fieldRootStyles = (theme: ThemeWithoutComponents) => ({
  ...theme.typography.body1,
  '&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error)': {
    borderColor: theme.colors.fieldBorderHover,
  },
  '&.Mui-disabled': {
    backgroundColor: theme.colors.fieldBgDisabled,
    borderColor: theme.colors.fieldBorderDisabled,
    color: theme.colors.textMuted,
  },
  '&.Mui-error': {
    '&.Mui-focused': {
      boxShadow: `0 0 0 3px ${theme.colors.errorRing}`,
    },
    backgroundColor: theme.colors.fieldBgError,
    borderColor: theme.colors.fieldBorderError,
  },
  '&.Mui-focused': {
    backgroundColor: theme.colors.fieldBgFocus,
    borderColor: theme.colors.fieldBorderFocus,
    boxShadow: `0 0 0 3px ${theme.colors.fieldRing}`,
  },
  '&.MuiInputBase-multiline': {
    alignItems: 'flex-start',
    height: 'auto',
    padding: '10px 0',
  },
  backgroundColor: theme.colors.fieldBg,
  border: `1px solid ${theme.colors.fieldBorder}`,
  borderRadius: '8px',
  color: theme.colors.textPrimary,
  minHeight: '40px',
  padding: 0,
  transition: 'border-color 0.18s, background 0.18s, box-shadow 0.18s',
});

export const components: Components<ThemeWithoutComponents> = {
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.body2,
        alignItems: 'center',
        background: theme.colors.bgCard,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: '12px',
        boxShadow: theme.colors.shadowCard,
        color: theme.colors.textPrimary,
      }),
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.subtitle2,
        backgroundColor: theme.colors.accentBg,
        border: `1px solid ${theme.colors.accentBorder}`,
        color: theme.colors.accentInk,
      }),
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
      size: 'medium',
      variant: 'contained',
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        borderRadius: 50,
        boxShadow: 'none',
        fontSize:
          ownerState.size === 'large' ? '14px' : ownerState.size === 'small' ? '12px' : '13px',
        fontWeight: ownerState.variant === 'contained' ? 600 : 500,
        lineHeight: 1.4,
        textTransform: 'none',
        transition: 'all 0.2s ease',
        ...(ownerState.size === 'large' && { padding: '12px 28px' }),
        ...(ownerState.size === 'medium' && { padding: '9px 22px' }),
        ...(ownerState.size === 'small' && { padding: '5px 14px' }),
        ...(ownerState.variant === 'contained' && {
          '&:focus-visible': {
            boxShadow: `0 0 0 3px ${theme.colors.accentRing}`,
          },
          '&:hover': {
            background: `linear-gradient(135deg, ${theme.colors.accentHighlight}, ${theme.colors.accent})`,
            boxShadow: theme.colors.accentShadowHover,
          },
          '&.Mui-disabled': {
            background: theme.colors.bgCard3,
            boxShadow: 'none',
            color: theme.colors.textMuted,
          },
          background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentDark})`,
          boxShadow: theme.colors.accentShadow,
          color: theme.colors.onAccent,
        }),
        ...(ownerState.variant === 'contained' &&
          ownerState.color === 'error' && {
            '&:hover': {
              background: theme.colors.red,
              boxShadow: 'none',
              filter: 'brightness(1.08)',
            },
            background: theme.colors.red,
            boxShadow: 'none',
            color: theme.colors.white,
          }),
        ...(ownerState.variant === 'outlined' && {
          '&:focus-visible': {
            borderColor: theme.colors.fieldBorderFocus,
            boxShadow: `0 0 0 3px ${theme.colors.fieldRing}`,
          },
          '&:hover': {
            background: theme.colors.bgHover,
            borderColor: theme.colors.borderStrong,
          },
          '&.Mui-disabled': {
            borderColor: theme.colors.borderSubtle,
            color: theme.colors.textMuted,
          },
          background: 'transparent',
          border: `1px solid ${theme.colors.border}`,
          color: theme.colors.textPrimary,
        }),
        ...(ownerState.variant === 'text' && {
          '&:hover': {
            background: theme.colors.bgHover,
            color: theme.colors.textPrimary,
          },
          '&.Mui-disabled': {
            color: theme.colors.textMuted,
          },
          color: theme.colors.textSecondary,
        }),
      }),
    },
  },
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-checked': {
          color: theme.colors.accentInk,
        },
        color: theme.colors.fieldBorderHover,
      }),
    },
  },
  MuiCssBaseline: {
    styleOverrides: (theme: ThemeWithoutComponents) => ({
      '*, *::before, *::after': {
        scrollbarColor: `${theme.colors.borderStrong} transparent`,
        scrollbarWidth: 'thin',
      },
      body: {
        backgroundColor: theme.colors.bg,
        minWidth: 1024,
        MozOsxFontSmoothing: 'grayscale',
        WebkitFontSmoothing: 'antialiased',
      },
    }),
  },
  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: theme.colors.bgCard,
        backgroundImage: 'none',
        border: `1px solid ${theme.colors.border}`,
        borderRadius: '16px',
        boxShadow: theme.colors.shadowCard,
      }),
    },
  },
  MuiDialogActions: {
    styleOverrides: {
      root: ({ theme }) => ({
        gap: theme.spacing(1),
        padding: theme.spacing(2, 3, 3),
      }),
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(1, 3, 2),
      }),
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.h4,
        color: theme.colors.textPrimary,
        padding: theme.spacing(3, 3, 1.5),
      }),
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.caption,
        '&.Mui-error': {
          color: theme.colors.red,
        },
        color: theme.colors.textSecondary,
        marginLeft: 0,
        marginTop: theme.spacing(0.75),
      }),
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&:focus-visible': {
          boxShadow: `0 0 0 3px ${theme.colors.fieldRing}`,
        },
        '&:hover': {
          backgroundColor: theme.colors.bgCard3,
          color: theme.colors.textPrimary,
        },
        '&.Mui-disabled': {
          color: theme.colors.textMuted,
        },
        color: theme.colors.iconMuted,
        transition: 'color 0.2s, background-color 0.2s',
      }),
    },
  },
  MuiMenu: {
    styleOverrides: {
      list: {
        padding: 4,
      },
      paper: ({ theme }) => ({
        background: theme.colors.bgCard,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: 12,
        boxShadow: theme.colors.shadowCard,
        color: theme.colors.textPrimary,
        marginTop: 6,
      }),
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.body2,
        '&:hover': {
          background: theme.colors.bgHover,
        },
        '&.Mui-selected, &.Mui-selected:hover': {
          background: theme.colors.accentBg,
        },
        borderRadius: 8,
        color: theme.colors.textPrimary,
        margin: '2px 0',
        minHeight: 38,
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: ({ theme }) => ({
        '&::placeholder': {
          color: theme.colors.iconMuted,
          opacity: 1,
        },
        padding: '9px 12px',
      }),
      notchedOutline: {
        border: 'none',
      },
      root: ({ theme }) => fieldRootStyles(theme),
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: 'none',
        boxShadow: theme.colors.shadowCard,
      }),
    },
  },
  MuiSelect: {
    styleOverrides: {
      icon: ({ theme }) => ({
        color: theme.colors.iconMuted,
        right: 10,
      }),
    },
  },
  MuiSkeleton: {
    defaultProps: {
      animation: 'wave',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.colors.skeleton,
        borderRadius: 6,
      }),
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        fontSize: '20px',
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...theme.typography.body2,
        borderBottom: `1px solid ${theme.colors.border}`,
        color: theme.colors.textPrimary,
      }),
    },
  },
  MuiTablePagination: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.colors.textSecondary,
      }),
      select: {
        paddingRight: '28px !important',
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        ...theme.typography.caption,
        background: theme.colors.bgCard3,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: 8,
        color: theme.colors.textPrimary,
      }),
    },
  },
};
