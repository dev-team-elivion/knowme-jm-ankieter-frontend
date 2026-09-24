import ViewQuiltOutlinedIcon from '@mui/icons-material/ViewQuiltOutlined';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { JSX, ReactNode } from 'react';

import { SectionPanel } from '@/components/page/SectionPanel.comp.tsx';
import { EmptyState } from '@/components/state/EmptyState.comp.tsx';
import { ErrorState } from '@/components/state/ErrorState.comp.tsx';
import { InfoCallout } from '@/components/state/InfoCallout.comp.tsx';
import { LoadingState } from '@/components/state/LoadingState.comp.tsx';
import { innerPanelSx, sectionLabelSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

const STATE_PREVIEW_HEIGHT = 260;

type PreviewProps = {
  children: ReactNode;
  label: string;
};

type Props = {
  revealIndex: number;
};

const StatePreview = ({ children, label }: PreviewProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Stack spacing={1.5} sx={{ flex: 1, minWidth: 0 }}>
      <Typography sx={sectionLabelSx(theme.colors)}>{label}</Typography>
      <Box sx={innerPanelSx(theme.colors)}>{children}</Box>
    </Stack>
  );
};

export const DevStatesSection = ({ revealIndex }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.devPatterns.states');

  return (
    <SectionPanel
      description={t('description')}
      icon={ViewQuiltOutlinedIcon}
      revealIndex={revealIndex}
      title={t('title')}
    >
      <Stack spacing={3}>
        <Stack direction="row" spacing={2}>
          <StatePreview label={t('loadingLabel')}>
            <LoadingState minHeight={STATE_PREVIEW_HEIGHT} />
          </StatePreview>
          <StatePreview label={t('emptyLabel')}>
            <EmptyState minHeight={STATE_PREVIEW_HEIGHT} variant="noData" />
          </StatePreview>
          <StatePreview label={t('errorLabel')}>
            <ErrorState minHeight={STATE_PREVIEW_HEIGHT} onRetry={() => undefined} />
          </StatePreview>
        </Stack>
        <InfoCallout title={t('calloutTitle')}>{t('calloutBody')}</InfoCallout>
      </Stack>
    </SectionPanel>
  );
};
