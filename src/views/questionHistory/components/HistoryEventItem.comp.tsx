import { Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { HistoryEventDto } from '@/api/generated';
import { numericSx } from '@/config/theme/uiTokens.ts';
import { formatApiDate } from '@/utils/formatDate.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { HistoryChangeRow } from '@/views/questionHistory/components/HistoryChangeRow.comp.tsx';
import { toVisibleChanges } from '@/views/questionHistory/util/historyChange.util.ts';

type Props = {
  event: HistoryEventDto;
  locale: string;
};

export const HistoryEventItem = ({ event, locale }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionHistory');
  const changes = toVisibleChanges(event.changes, locale);

  return (
    <Stack
      component="li"
      spacing={1}
      sx={{ borderLeft: `2px solid ${theme.colors.borderStrong}`, listStyle: 'none', pl: 1.5 }}
    >
      <Stack spacing={0.25}>
        <Typography sx={{ color: theme.colors.textPrimary, fontWeight: 600 }} variant="body2">
          {t(`events.${event.kind}`)}
        </Typography>
        <Typography sx={{ ...numericSx, color: theme.colors.textSecondary }} variant="caption">
          {t('eventMeta', {
            author: event.by,
            date: formatApiDate(event.at, { withTime: true }),
          })}
        </Typography>
      </Stack>
      {changes.map(change => (
        <HistoryChangeRow change={change} key={change.key} />
      ))}
    </Stack>
  );
};
