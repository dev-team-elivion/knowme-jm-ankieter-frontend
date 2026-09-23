import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { iconTileSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  description?: string;
  isRetrying?: boolean;
  minHeight?: number | string;
  onRetry?: () => void;
  title?: string;
};

export const ErrorState = ({
  description,
  isRetrying = false,
  minHeight = 240,
  onRetry,
  title,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('components.errorState');

  return (
    <Box
      role="alert"
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
          ...iconTileSx(`${theme.colors.red}1A`, 52, `${theme.colors.red}40`),
          color: theme.colors.red,
        }}
      >
        <ErrorOutlineRoundedIcon />
      </Box>
      <Stack spacing={0.5} sx={{ alignItems: 'center' }}>
        <Typography sx={{ color: theme.colors.textPrimary }} variant="h4">
          {title ?? t('title')}
        </Typography>
        <Typography sx={{ color: theme.colors.textSecondary, maxWidth: 400 }} variant="body2">
          {description ?? t('description')}
        </Typography>
      </Stack>
      {onRetry && (
        <Button
          disabled={isRetrying}
          onClick={onRetry}
          startIcon={<RefreshRoundedIcon />}
          sx={{ mt: 1 }}
          variant="outlined"
        >
          {t('retry')}
        </Button>
      )}
    </Box>
  );
};
