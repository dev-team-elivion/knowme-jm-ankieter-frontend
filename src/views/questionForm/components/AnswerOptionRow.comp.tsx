import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { Box, Checkbox, IconButton, Radio, Stack, Tooltip, useTheme } from '@mui/material';
import { JSX } from 'react';
import { useWatch } from 'react-hook-form';

import { TextFormField } from '@/components/form/TextFormField.comp.tsx';
import { innerPanelSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { AnswerMediaField } from '@/views/questionForm/components/AnswerMediaField.comp.tsx';
import { QuestionFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';

const CONTROL_ROW_SX = { alignItems: 'center', display: 'flex', height: 40, mt: 3 } as const;

type Props = {
  canRemove: boolean;
  index: number;
  isLast: boolean;
  isScored: boolean;
  isSingleChoice: boolean;
  markerName: string;
  onMarkCorrect: (index: number, isCorrect: boolean) => void;
  onMove: (from: number, to: number) => void;
  onRemove: (index: number) => void;
};

export const AnswerOptionRow = ({
  canRemove,
  index,
  isLast,
  isScored,
  isSingleChoice,
  markerName,
  onMarkCorrect,
  onMove,
  onRemove,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('views.questionForm.answers');
  const isCorrect = useWatch<QuestionFormModel, `answers.${number}.isCorrect`>({
    name: `answers.${index}.isCorrect`,
  });
  const number = index + 1;
  const markerLabel = t('markCorrect', { number });
  const Marker = isSingleChoice ? Radio : Checkbox;
  const isHighlighted = isScored && isCorrect;

  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{
        ...innerPanelSx(theme.colors),
        alignItems: 'flex-start',
        borderColor: isHighlighted ? `${theme.colors.green}66` : theme.colors.border,
        px: 2,
        py: 1.5,
        transition: 'border-color 0.18s',
      }}
    >
      {isScored && (
        <Box sx={CONTROL_ROW_SX}>
          <Tooltip title={markerLabel}>
            <Marker
              checked={isCorrect}
              name={markerName}
              onChange={event => onMarkCorrect(index, event.target.checked)}
              slotProps={{ input: { 'aria-label': markerLabel } }}
              value={String(index)}
            />
          </Tooltip>
        </Box>
      )}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <TextFormField<QuestionFormModel, `answers.${number}.body`>
          label={t('answerLabel', { number })}
          name={`answers.${index}.body`}
          placeholder={t('answerPlaceholder')}
        />
        <AnswerMediaField index={index} />
      </Box>
      <Stack direction="row" spacing={0.25} sx={CONTROL_ROW_SX}>
        <Tooltip title={t('moveUp', { number })}>
          <span>
            <IconButton
              aria-label={t('moveUp', { number })}
              disabled={index === 0}
              onClick={() => onMove(index, index - 1)}
            >
              <ArrowUpwardRoundedIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={t('moveDown', { number })}>
          <span>
            <IconButton
              aria-label={t('moveDown', { number })}
              disabled={isLast}
              onClick={() => onMove(index, index + 1)}
            >
              <ArrowDownwardRoundedIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={canRemove ? t('remove', { number }) : t('removeDisabled')}>
          <span>
            <IconButton
              aria-label={t('remove', { number })}
              disabled={!canRemove}
              onClick={() => onRemove(index)}
            >
              <DeleteOutlineRoundedIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
    </Stack>
  );
};
