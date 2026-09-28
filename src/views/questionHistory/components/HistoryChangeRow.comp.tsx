import { Box, Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { microLabelSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { DiffText } from '@/views/questionHistory/components/DiffText.comp.tsx';
import {
  TEXT_DIFF_FIELDS,
  VisibleChange,
} from '@/views/questionHistory/model/HistoryField.model.ts';
import { useFormatChangeValue } from '@/views/questionHistory/util/useFormatChangeValue.util.ts';
import { diffText } from '@/views/questionHistory/util/versionDiff.util.ts';

type Props = {
  change: VisibleChange;
};

export const HistoryChangeRow = ({ change }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionHistory');
  const formatValue = useFormatChangeValue();
  const { after, before, field } = change;
  const label = field ? t(`fields.${field}`) : t('otherField');
  const textSegments =
    field !== null &&
    TEXT_DIFF_FIELDS.includes(field) &&
    before?.type === 'text' &&
    after?.type === 'text'
      ? diffText(before.text, after.text)
      : null;
  const beforeText = before ? formatValue(field, before) : null;
  const afterText = after ? formatValue(field, after) : null;
  const summary =
    beforeText === null
      ? `${t('values.added')}: ${afterText ?? t('values.item')}`
      : afterText === null
        ? `${t('values.removed')}: ${beforeText}`
        : `${beforeText} → ${afterText}`;

  return (
    <Stack spacing={0.25}>
      <Box sx={microLabelSx(theme.colors.textSecondary)}>{label}</Box>
      {textSegments ? (
        <DiffText segments={textSegments} />
      ) : (
        <Typography
          sx={{ color: theme.colors.textPrimary, wordBreak: 'break-word' }}
          variant="body2"
        >
          {summary}
        </Typography>
      )}
    </Stack>
  );
};
