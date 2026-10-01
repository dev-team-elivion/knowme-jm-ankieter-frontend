import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { BulkOperationDto } from '@/api/generated';
import { numericSx, panelSx, pressableSx, revealSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { BULK_OPERATIONS } from '@/views/questionBank/model/bulkOperation.constants.ts';
import { QuestionSelection } from '@/views/questionBank/model/QuestionSelection.model.ts';

type Props = {
  canSelectAllMatching: boolean;
  onClear: () => void;
  onOperation: (operation: BulkOperationDto) => void;
  onSelectAllMatching: () => void;
  selection: QuestionSelection;
  total: number;
};

export const QuestionSelectionBar = ({
  canSelectAllMatching,
  onClear,
  onOperation,
  onSelectAllMatching,
  selection,
  total,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionBank.bulk');

  return (
    <Stack
      spacing={1.5}
      sx={{
        ...panelSx(theme.colors),
        ...revealSx(0),
        border: `1px solid ${theme.colors.accentBorder}`,
        bottom: 16,
        position: 'sticky',
        px: 3,
        py: 2,
        zIndex: 2,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 1 }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography
            aria-live="polite"
            sx={{ ...numericSx, color: theme.colors.textPrimary, fontWeight: 700 }}
            variant="body2"
          >
            {selection.kind === 'allMatching'
              ? t('selectedAllMatching', { count: total })
              : t('selected', { count: selection.ids.length })}
          </Typography>
          {canSelectAllMatching && (
            <Button onClick={onSelectAllMatching} size="small" variant="text">
              {t('selectAllMatching', { count: total })}
            </Button>
          )}
          <Button onClick={onClear} size="small" variant="text">
            {t('clear')}
          </Button>
        </Stack>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {BULK_OPERATIONS.map(operation => (
            <Button
              key={operation}
              onClick={() => onOperation(operation)}
              size="small"
              sx={pressableSx}
              variant="outlined"
            >
              {t(`operations.${operation}`)}
            </Button>
          ))}
        </Box>
      </Stack>
    </Stack>
  );
};
