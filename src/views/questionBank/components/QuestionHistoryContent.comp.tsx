import { Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { QuestionDetailsDto } from '@/api/generated';
import { StatusPill } from '@/components/state/StatusPill.comp.tsx';
import { innerPanelSx, numericSx } from '@/config/theme/uiTokens.ts';
import { formatApiDate } from '@/utils/formatDate.util.ts';
import { getVersionStatusTone } from '@/utils/questionStatusTone.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  question: QuestionDetailsDto;
};

export const QuestionHistoryContent = ({ question }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionBank.history');
  const { t: tForm } = useTranslationWithPrefix('views.questionForm.edit');
  const { t: tDictionary } = useTranslationWithPrefix('views.dictionaries');

  return (
    <Stack spacing={1.5}>
      <Typography sx={{ color: theme.colors.textSecondary }} variant="body2">
        {t('description', { key: question.businessKey })}
      </Typography>
      {question.versions.map(version => {
        const retiredAt = formatApiDate(version.retiredAt, { withTime: true });
        return (
          <Stack key={version.id} spacing={0.75} sx={{ ...innerPanelSx(theme.colors), p: 2 }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <Typography
                sx={{ ...numericSx, color: theme.colors.textPrimary }}
                variant="subtitle2"
              >
                {tForm('versionLabel', { number: version.versionNo })}
              </Typography>
              <StatusPill
                label={tDictionary(`versionStatus.${version.status}`)}
                tone={getVersionStatusTone(version.status)}
              />
            </Stack>
            <Typography sx={{ ...numericSx, color: theme.colors.textSecondary }} variant="body2">
              {t('created', {
                author: version.createdBy,
                date: formatApiDate(version.createdAt, { withTime: true }),
              })}
            </Typography>
            {retiredAt && (
              <Typography sx={{ ...numericSx, color: theme.colors.textSecondary }} variant="body2">
                {t('retired', { date: retiredAt })}
              </Typography>
            )}
          </Stack>
        );
      })}
    </Stack>
  );
};
