import { Box, Checkbox, Radio, Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { QuestionDetailsDto, QuestionTypeDto, VersionStatusDto } from '@/api/generated';
import { InfoCallout } from '@/components/state/InfoCallout.comp.tsx';
import { innerPanelSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  locale: string;
  question: QuestionDetailsDto;
};

export const QuestionPreviewContent = ({ locale, question }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionBank.preview');
  const version =
    question.versions.find(item => item.status === VersionStatusDto.Active) ??
    question.versions.at(0);

  if (version === undefined) {
    return <InfoCallout>{t('noActiveVersion')}</InfoCallout>;
  }

  const hasLocale = version.translations.some(item => item.locale === locale && item.body);
  const shownLocale = hasLocale ? locale : version.sourceLocale;
  const body = version.translations.find(item => item.locale === shownLocale)?.body;
  const Marker = question.type === QuestionTypeDto.SingleChoice ? Radio : Checkbox;
  const answers = [...version.answers]
    .sort((first, second) => first.displayOrder - second.displayOrder)
    .map(answer => ({
      body: answer.translations.find(item => item.locale === shownLocale)?.body ?? '',
      id: answer.id,
    }));

  return (
    <Stack spacing={2}>
      <Typography sx={{ color: theme.colors.textSecondary }} variant="body2">
        {t('description')}
      </Typography>
      {!hasLocale && <InfoCallout tone="warning">{t('fallbackLanguage')}</InfoCallout>}
      <Stack spacing={2} sx={{ ...innerPanelSx(theme.colors), p: 3 }}>
        <Typography sx={{ color: theme.colors.textPrimary }} variant="h4">
          {body}
        </Typography>
        {answers.length > 0 && (
          <Stack spacing={1}>
            {answers.map(answer => (
              <Box
                component="label"
                key={answer.id}
                sx={{
                  alignItems: 'center',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '12px',
                  display: 'flex',
                  gap: 1,
                  px: 1.5,
                  py: 0.5,
                }}
              >
                <Marker name={`preview-${question.id}`} size="small" />
                <Typography sx={{ color: theme.colors.textPrimary }} variant="body2">
                  {answer.body}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
