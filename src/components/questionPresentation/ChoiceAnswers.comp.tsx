import { Box, Checkbox, Radio, Stack, Typography, useTheme } from '@mui/material';
import { JSX, useId, useState } from 'react';

import { ANSWER_MEDIA_MAX_HEIGHT } from '@/components/questionPresentation/model/questionPresentation.constants.ts';
import { PresentationAnswer } from '@/components/questionPresentation/model/QuestionPresentation.model.ts';
import { PresentationMedia } from '@/components/questionPresentation/PresentationMedia.comp.tsx';
import { answerRowSx } from '@/components/questionPresentation/QuestionPresentation.styles.ts';
import { StatusPill } from '@/components/state/StatusPill.comp.tsx';
import { numericSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  answers: PresentationAnswer[];
  isMultiple: boolean;
  showCorrect: boolean;
};

export const ChoiceAnswers = ({ answers, isMultiple, showCorrect }: Props): JSX.Element => {
  const theme = useTheme();
  const groupNameId = useId();
  const { t } = useTranslationWithPrefix('components.questionPresentation');
  const [selected, setSelected] = useState<string[]>([]);
  const Marker = isMultiple ? Checkbox : Radio;

  const toggle = (answerId: string): void =>
    setSelected(current => {
      if (!isMultiple) {
        return [answerId];
      }
      return current.includes(answerId)
        ? current.filter(id => id !== answerId)
        : [...current, answerId];
    });

  return (
    <Stack aria-label={t('answersLabel')} role={isMultiple ? 'group' : 'radiogroup'} spacing={1}>
      {answers.map(answer => {
        const isHighlighted = showCorrect && answer.isCorrect;

        return (
          <Stack key={answer.id} spacing={1} sx={answerRowSx(theme.colors, isHighlighted)}>
            <Box
              component="label"
              sx={{ alignItems: 'center', cursor: 'pointer', display: 'flex', gap: 1 }}
            >
              <Marker
                checked={selected.includes(answer.id)}
                name={groupNameId}
                onChange={() => toggle(answer.id)}
                size="small"
                sx={{ p: 0.5 }}
              />
              <Typography
                sx={{
                  color: answer.body ? theme.colors.textPrimary : theme.colors.textSecondary,
                  flex: 1,
                  fontStyle: answer.body ? 'normal' : 'italic',
                }}
                variant="body2"
              >
                {answer.body || t('emptyAnswer')}
              </Typography>
              {showCorrect && typeof answer.points === 'number' && (
                <Typography
                  sx={{ ...numericSx, color: theme.colors.textSecondary }}
                  variant="caption"
                >
                  {t('answerPoints', { points: answer.points })}
                </Typography>
              )}
              {isHighlighted && <StatusPill label={t('correct')} tone="success" />}
            </Box>
            <PresentationMedia
              assets={answer.media}
              label={t('answerMediaLabel')}
              maxHeight={ANSWER_MEDIA_MAX_HEIGHT}
            />
          </Stack>
        );
      })}
    </Stack>
  );
};
