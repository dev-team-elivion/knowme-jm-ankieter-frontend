import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { HistoryEventDto } from '@/api/generated';
import { SectionPanel } from '@/components/page/SectionPanel.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { HistoryEventItem } from '@/views/questionHistory/components/HistoryEventItem.comp.tsx';

type Props = {
  events: HistoryEventDto[];
  locale: string;
  revealIndex: number;
};

export const ClassificationHistoryPanel = ({ events, locale, revealIndex }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionHistory.classification');

  return (
    <SectionPanel
      description={t('description')}
      icon={CategoryOutlinedIcon}
      revealIndex={revealIndex}
      title={t('title')}
    >
      {events.length > 0 ? (
        <Stack component="ul" spacing={1.5} sx={{ m: 0, p: 0 }}>
          {events.map(event => (
            <HistoryEventItem event={event} key={event.id} locale={locale} />
          ))}
        </Stack>
      ) : (
        <Typography sx={{ color: theme.colors.textSecondary }} variant="body2">
          {t('empty')}
        </Typography>
      )}
    </SectionPanel>
  );
};
