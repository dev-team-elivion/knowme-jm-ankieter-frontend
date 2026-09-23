import { SvgIconComponent } from '@mui/icons-material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { JSX, ReactNode } from 'react';

import { iconTileSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Action = {
  icon?: ReactNode;
  label: string;
  onClick: () => void;
};

type Props = {
  action?: Action;
  description?: string;
  icon?: SvgIconComponent;
  minHeight?: number | string;
  onClearFilters?: () => void;
  title?: string;
  variant?: 'noData' | 'noMatch';
};

export const EmptyState = ({
  action,
  description,
  icon,
  minHeight = 240,
  onClearFilters,
  title,
  variant = 'noData',
}: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('components.emptyState');
  const Icon = icon ?? (variant === 'noMatch' ? SearchOffOutlinedIcon : InboxOutlinedIcon);
  const resolvedAction =
    action ??
    (variant === 'noMatch' && onClearFilters
      ? { label: t('noMatch.clearFilters'), onClick: onClearFilters }
      : undefined);

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'center',
        minHeight,
        p: 4,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          ...iconTileSx(theme.colors.accentBg, 52, theme.colors.accentBorder),
          color: theme.colors.accentInk,
        }}
      >
        <Icon />
      </Box>
      <Stack spacing={0.5} sx={{ alignItems: 'center' }}>
        <Typography sx={{ color: theme.colors.textPrimary }} variant="h4">
          {title ?? t(`${variant}.title`)}
        </Typography>
        <Typography sx={{ color: theme.colors.textSecondary, maxWidth: 400 }} variant="body2">
          {description ?? t(`${variant}.description`)}
        </Typography>
      </Stack>
      {resolvedAction && (
        <Button
          onClick={resolvedAction.onClick}
          startIcon={resolvedAction.icon}
          sx={{ mt: 1 }}
          variant={variant === 'noMatch' ? 'outlined' : 'contained'}
        >
          {resolvedAction.label}
        </Button>
      )}
    </Box>
  );
};
