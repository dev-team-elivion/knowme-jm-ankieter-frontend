import { Box, Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { AnswerOptionDto, QuestionTranslationDto } from '@/api/generated';
import { innerPanelSx, microLabelSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  answers: AnswerOptionDto[];
  locale: string;
  translation: QuestionTranslationDto | undefined;
};

const toVisibleText = (value: string | undefined): string | undefined =>
  value?.trim() ? value : undefined;

export const TranslationPreview = ({ answers, locale, translation }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionForm.translations');
  const localizedAnswers = [...answers]
    .sort((first, second) => first.displayOrder - second.displayOrder)
    .map(answer => ({
      body: toVisibleText(answer.translations.find(item => item.locale === locale)?.body),
      id: answer.id,
    }));
  const questionBody = toVisibleText(translation?.body);
  const missingSx = { color: theme.colors.textSecondary, fontStyle: 'italic' } as const;

  return (
    <Stack spacing={2} sx={{ ...innerPanelSx(theme.colors), p: 2.5 }}>
      <Typography
        sx={questionBody ? { color: theme.colors.textPrimary } : missingSx}
        variant="body1"
      >
        {questionBody ?? t('missing')}
      </Typography>
      {localizedAnswers.length > 0 && (
        <Stack spacing={1}>
          <Box sx={microLabelSx(theme.colors.textSecondary)}>{t('answers')}</Box>
          <Stack component="ol" spacing={0.75} sx={{ m: 0, pl: 2.5 }}>
            {localizedAnswers.map(answer => (
              <Typography
                component="li"
                key={answer.id}
                sx={answer.body ? { color: theme.colors.textPrimary } : missingSx}
                variant="body2"
              >
                {answer.body ?? t('missing')}
              </Typography>
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
