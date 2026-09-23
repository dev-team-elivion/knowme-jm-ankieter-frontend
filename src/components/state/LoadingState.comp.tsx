import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  label?: string;
  minHeight?: number | string;
};

export const LoadingState = ({ label, minHeight = 240 }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('components.loadingState');

  return (
    <Box
      aria-busy="true"
      role="status"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'center',
        minHeight,
        p: 3,
      }}
    >
      <CircularProgress size={32} sx={{ color: theme.colors.accentInk }} thickness={4} />
      <Typography sx={{ color: theme.colors.textSecondary }} variant="body2">
        {label ?? t('label')}
      </Typography>
    </Box>
  );
};
