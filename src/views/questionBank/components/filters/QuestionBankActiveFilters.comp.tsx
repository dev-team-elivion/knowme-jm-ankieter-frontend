import { Box, Button, Chip, Stack, useTheme } from '@mui/material';
import { JSX } from 'react';

import { microLabelSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { ActiveFilterChip } from '@/views/questionBank/util/useActiveFilterChips.util.ts';

type Props = {
  chips: ActiveFilterChip[];
  onClearAll: () => void;
};

export const QuestionBankActiveFilters = ({ chips, onClearAll }: Props): JSX.Element | null => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionBank.filters');

  if (chips.length === 0) {
    return null;
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ alignItems: 'center', flexWrap: 'wrap', pt: 2, rowGap: 1 }}
    >
      <Box sx={microLabelSx(theme.colors.textSecondary)}>{t('activeSummary')}</Box>
      {chips.map(chip => (
        <Chip key={chip.id} label={chip.label} onDelete={chip.onRemove} size="small" />
      ))}
      <Button onClick={onClearAll} size="small" variant="text">
        {t('clearAll')}
      </Button>
    </Stack>
  );
};
