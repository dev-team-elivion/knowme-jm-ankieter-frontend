import { Stack, TextField, Typography, useTheme } from '@mui/material';
import { JSX, useState } from 'react';

import { StatusPill } from '@/components/state/StatusPill.comp.tsx';
import { microLabelSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

const OPEN_ANSWER_ROWS = 5;
const OPEN_ANSWER_MAX_LENGTH = 4000;
const SHORT_ANSWER_MAX_LENGTH = 500;

type Props = {
  answerKey?: string;
  expectedAnswers: string[];
  isOpen: boolean;
  showCorrect: boolean;
};

export const TextAnswer = ({
  answerKey,
  expectedAnswers,
  isOpen,
  showCorrect,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('components.questionPresentation');
  const [value, setValue] = useState('');
  const label = isOpen ? t('openPlaceholder') : t('answerPlaceholder');

  return (
    <Stack spacing={1.5}>
      <TextField
        fullWidth
        minRows={isOpen ? OPEN_ANSWER_ROWS : undefined}
        multiline={isOpen}
        onChange={event => setValue(event.target.value)}
        placeholder={label}
        slotProps={{
          htmlInput: {
            'aria-label': label,
            maxLength: isOpen ? OPEN_ANSWER_MAX_LENGTH : SHORT_ANSWER_MAX_LENGTH,
          },
        }}
        value={value}
      />
      {showCorrect && !isOpen && expectedAnswers.length > 0 && (
        <Stack spacing={0.75}>
          <Typography sx={microLabelSx(theme.colors.textSecondary)}>
            {t('expectedAnswers')}
          </Typography>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75 }}>
            {expectedAnswers.map(answer => (
              <StatusPill key={answer} label={answer} tone="success" />
            ))}
          </Stack>
        </Stack>
      )}
      {showCorrect && isOpen && answerKey && (
        <Stack spacing={0.75}>
          <Typography sx={microLabelSx(theme.colors.textSecondary)}>{t('answerKey')}</Typography>
          <Typography
            sx={{ color: theme.colors.textPrimary, whiteSpace: 'pre-wrap' }}
            variant="body2"
          >
            {answerKey}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};
