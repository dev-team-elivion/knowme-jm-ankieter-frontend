import { Box, Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

export type QuestionEditState = 'clean' | 'dirty' | 'locked';

type Props = {
  isDraft: boolean;
  state: QuestionEditState;
};

export const QuestionEditStatus = ({ isDraft, state }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionForm.actions.status');
  const toDotColor = (): string => {
    if (state === 'locked') {
      return theme.colors.orange;
    }
    return state === 'dirty' ? theme.colors.accent : theme.colors.textMuted;
  };
  const toDescription = (): string => {
    if (state === 'locked') {
      return t('lockedDescription');
    }
    if (state === 'dirty') {
      return isDraft ? t('dirtyDraftDescription') : t('dirtyDescription');
    }
    return isDraft ? t('cleanDraftDescription') : t('cleanDescription');
  };
  const dotColor = toDotColor();
  const description = toDescription();

  return (
    <Stack
      direction="row"
      role="status"
      spacing={1.5}
      sx={{ alignItems: 'baseline', flex: 1, minWidth: 0 }}
    >
      <Box
        aria-hidden
        sx={{
          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
          background: dotColor,
          borderRadius: '50%',
          boxShadow: state === 'clean' ? 'none' : `0 0 0 4px ${dotColor}26`,
          flexShrink: 0,
          height: 8,
          transform: 'translateY(-1px)',
          transition: 'background-color 200ms ease-out, box-shadow 200ms ease-out',
          width: 8,
        }}
      />
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ color: theme.colors.textPrimary, fontWeight: 700 }} variant="body2">
          {t(state)}
        </Typography>
        <Typography
          sx={{ color: theme.colors.textSecondary, maxWidth: '72ch', textWrap: 'pretty' }}
          variant="caption"
        >
          {description}
        </Typography>
      </Box>
    </Stack>
  );
};
