import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import { Box, Stack } from '@mui/material';
import { JSX } from 'react';

import { PageHeader } from '@/components/page/PageHeader.comp.tsx';
import { revealSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { DevFormSection } from '@/views/devPatterns/components/DevFormSection.comp.tsx';
import { DevNotificationsSection } from '@/views/devPatterns/components/DevNotificationsSection.comp.tsx';
import { DevStatesSection } from '@/views/devPatterns/components/DevStatesSection.comp.tsx';
import { DevTableSection } from '@/views/devPatterns/components/DevTableSection.comp.tsx';

export const DevPatternsView = (): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.devPatterns');

  return (
    <Stack spacing={3}>
      <Box sx={{ ...revealSx(0), pb: 1 }}>
        <PageHeader description={t('description')} icon={WidgetsOutlinedIcon} title={t('title')} />
      </Box>
      <DevTableSection revealIndex={1} />
      <DevFormSection revealIndex={2} />
      <DevStatesSection revealIndex={3} />
      <DevNotificationsSection revealIndex={4} />
    </Stack>
  );
};
