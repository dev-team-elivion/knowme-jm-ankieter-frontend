import { Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { innerPanelSx, microLabelSx, numericSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  explanation?: string;
  maxPoints: number;
};

export const PresentationSolution = ({ explanation, maxPoints }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('components.questionPresentation.solution');

  return (
    <Stack spacing={1.5} sx={{ ...innerPanelSx(theme.colors), p: 2 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
        <Typography sx={microLabelSx(theme.colors.textSecondary)}>{t('maxPoints')}</Typography>
        <Typography
          sx={{ ...numericSx, color: theme.colors.textPrimary, fontWeight: 700 }}
          variant="body2"
        >
          {maxPoints}
        </Typography>
      </Stack>
      {explanation && (
        <Stack spacing={0.75}>
          <Typography sx={microLabelSx(theme.colors.textSecondary)}>{t('explanation')}</Typography>
          <Typography
            sx={{ color: theme.colors.textPrimary, whiteSpace: 'pre-wrap' }}
            variant="body2"
          >
            {explanation}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};
