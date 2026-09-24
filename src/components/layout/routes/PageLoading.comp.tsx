import { Box, Skeleton, Stack, useTheme } from '@mui/material';
import { JSX } from 'react';

import { panelSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

export const PageLoading = (): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('components.loadingState');

  return (
    <Stack aria-busy="true" aria-label={t('label')} role="status" spacing={4}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Skeleton height={48} sx={{ borderRadius: '12px' }} variant="rectangular" width={48} />
        <Stack spacing={1}>
          <Skeleton height={28} variant="rounded" width={260} />
          <Skeleton height={16} variant="rounded" width={420} />
        </Stack>
      </Stack>
      <Box sx={{ ...panelSx(theme.colors), p: 3 }}>
        <Skeleton height={240} variant="rounded" />
      </Box>
    </Stack>
  );
};
