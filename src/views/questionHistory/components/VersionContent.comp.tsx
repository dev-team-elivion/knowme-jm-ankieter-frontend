import { Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { StatusPill } from '@/components/state/StatusPill.comp.tsx';
import { innerPanelSx, numericSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { LabeledBlock } from '@/views/questionHistory/components/LabeledBlock.comp.tsx';
import { VersionSnapshot } from '@/views/questionHistory/model/QuestionHistory.model.ts';

type Props = {
  snapshot: VersionSnapshot;
};

export const VersionContent = ({ snapshot }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionHistory.preview');
  const { t: tDictionary } = useTranslationWithPrefix('views.dictionaries');
  const textSx = { color: theme.colors.textPrimary, whiteSpace: 'pre-wrap' } as const;
  const rowSx = { ...innerPanelSx(theme.colors), alignItems: 'center', px: 2, py: 1 } as const;

  return (
    <Stack spacing={2.5}>
      <LabeledBlock label={t('body')}>
        <Typography sx={textSx} variant="body1">
          {snapshot.body}
        </Typography>
      </LabeledBlock>
      {snapshot.answers.length > 0 && (
        <LabeledBlock label={t('answers')}>
          <Stack component="ol" spacing={1} sx={{ m: 0, p: 0 }}>
            {snapshot.answers.map(answer => (
              <Stack
                component="li"
                direction="row"
                key={answer.id}
                spacing={1.5}
                sx={{ ...rowSx, justifyContent: 'space-between', listStyle: 'none' }}
              >
                <Typography sx={textSx} variant="body2">
                  {answer.body}
                </Typography>
                {answer.isCorrect && <StatusPill label={t('correct')} tone="success" />}
              </Stack>
            ))}
          </Stack>
        </LabeledBlock>
      )}
      {snapshot.expectedAnswers.length > 0 && (
        <LabeledBlock label={t('expectedAnswers')}>
          <Stack component="ul" spacing={1} sx={{ m: 0, p: 0 }}>
            {snapshot.expectedAnswers.map(answer => (
              <Stack component="li" key={answer} sx={{ ...rowSx, listStyle: 'none' }}>
                <Typography sx={textSx} variant="body2">
                  {answer}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </LabeledBlock>
      )}
      {snapshot.explanation && (
        <LabeledBlock label={t('explanation')}>
          <Typography sx={textSx} variant="body2">
            {snapshot.explanation}
          </Typography>
        </LabeledBlock>
      )}
      <Stack direction="row" spacing={4}>
        <LabeledBlock label={t('maxPoints')}>
          <Typography sx={{ ...textSx, ...numericSx }} variant="body2">
            {snapshot.maxPoints}
          </Typography>
        </LabeledBlock>
        <LabeledBlock label={t('scoringRule')}>
          <Typography sx={textSx} variant="body2">
            {tDictionary(`scoringRule.${snapshot.scoringRule}.label`)}
          </Typography>
        </LabeledBlock>
      </Stack>
    </Stack>
  );
};
