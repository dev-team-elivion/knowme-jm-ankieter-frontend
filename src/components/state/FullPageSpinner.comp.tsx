import { Box, CircularProgress, useTheme } from '@mui/material';
import { JSX } from 'react';

import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

export const FullPageSpinner = (): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('components.loadingState');

  return (
    <Box
      aria-busy="true"
      aria-label={t('label')}
      role="status"
      sx={{
        alignItems: 'center',
        background: theme.colors.bg,
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <CircularProgress size={44} sx={{ color: theme.colors.accentInk }} thickness={4} />
    </Box>
  );
};
