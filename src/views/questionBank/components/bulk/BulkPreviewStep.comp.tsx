import { Box, Stack, TextField, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { BulkUpdateResultDto } from '@/api/generated';
import { InfoCallout } from '@/components/state/InfoCallout.comp.tsx';
import { fieldLabelSx, innerPanelSx, microLabelSx, numericSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { isLargeChange } from '@/views/questionBank/util/bulkRequest.util.ts';

type Props = {
  changeDescription: string;
  confirmation: string;
  onConfirmationChange: (value: string) => void;
  preview: BulkUpdateResultDto;
};

export const BulkPreviewStep = ({
  changeDescription,
  confirmation,
  onConfirmationChange,
  preview,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionBank.bulk.preview');
  const hiddenSampleCount = preview.affected - preview.sampleKeys.length;

  if (preview.affected === 0) {
    return <InfoCallout>{t('nothingToChange')}</InfoCallout>;
  }

  return (
    <Stack spacing={2.5}>
      <Stack spacing={0.5}>
        <Typography
          sx={{ ...numericSx, color: theme.colors.textPrimary, fontWeight: 700 }}
          variant="h4"
        >
          {t('affected', { count: preview.affected })}
        </Typography>
        {preview.skipped > 0 && (
          <Typography sx={{ ...numericSx, color: theme.colors.textSecondary }} variant="body2">
            {t('skipped', { count: preview.skipped })}
          </Typography>
        )}
      </Stack>
      <Typography sx={{ color: theme.colors.textPrimary }} variant="body2">
        {changeDescription}
      </Typography>
      <Stack spacing={1} sx={{ ...innerPanelSx(theme.colors), p: 2 }}>
        <Typography sx={microLabelSx(theme.colors.textSecondary)}>{t('sample')}</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {preview.sampleKeys.map(key => (
            <Typography
              component="span"
              key={key}
              sx={{ ...numericSx, color: theme.colors.textPrimary, fontWeight: 600 }}
              variant="body2"
            >
              {key}
            </Typography>
          ))}
          {hiddenSampleCount > 0 && (
            <Typography sx={{ color: theme.colors.textSecondary }} variant="body2">
              {t('more', { count: hiddenSampleCount })}
            </Typography>
          )}
        </Box>
      </Stack>
      {isLargeChange(preview.affected) && (
        <Stack spacing={1}>
          <InfoCallout title={t('large.title')} tone="warning">
            {t('large.description', { count: preview.affected })}
          </InfoCallout>
          <Box>
            <Box component="label" htmlFor="bulk-confirmation" sx={fieldLabelSx(theme.colors)}>
              {t('large.label', { count: preview.affected })}
            </Box>
            <TextField
              autoComplete="off"
              fullWidth
              id="bulk-confirmation"
              onChange={event => onConfirmationChange(event.target.value)}
              slotProps={{ htmlInput: { inputMode: 'numeric' } }}
              value={confirmation}
            />
          </Box>
        </Stack>
      )}
    </Stack>
  );
};
