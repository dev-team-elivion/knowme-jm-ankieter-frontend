import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { Reorder } from 'framer-motion';
import { JSX, useState } from 'react';

import { ANSWER_MEDIA_MAX_HEIGHT } from '@/components/questionPresentation/model/questionPresentation.constants.ts';
import { PresentationAnswer } from '@/components/questionPresentation/model/QuestionPresentation.model.ts';
import { PresentationMedia } from '@/components/questionPresentation/PresentationMedia.comp.tsx';
import { answerRowSx } from '@/components/questionPresentation/QuestionPresentation.styles.ts';
import { moveItem } from '@/components/questionPresentation/util/questionPresentation.util.ts';
import { StatusPill } from '@/components/state/StatusPill.comp.tsx';
import { numericSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  answers: PresentationAnswer[];
  showCorrect: boolean;
};

const LIST_STYLE = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  listStyle: 'none',
  margin: 0,
  padding: 0,
} as const;

export const OrderingAnswers = ({ answers, showCorrect }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('components.questionPresentation');
  const [order, setOrder] = useState(answers);

  const move = (from: number, to: number): void => setOrder(current => moveItem(current, from, to));

  return (
    <Stack spacing={1}>
      <Typography sx={{ color: theme.colors.textSecondary }} variant="body2">
        {t('ordering.hint')}
      </Typography>
      <Reorder.Group
        aria-label={t('answersLabel')}
        axis="y"
        onReorder={setOrder}
        style={LIST_STYLE}
        values={order}
      >
        {order.map((answer, index) => {
          const isInPlace = showCorrect && answer.correctOrder === index + 1;
          const label = answer.body || t('emptyAnswer');

          return (
            <Reorder.Item key={answer.id} style={{ cursor: 'grab' }} value={answer}>
              <Stack spacing={1} sx={answerRowSx(theme.colors, isInPlace)}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <DragIndicatorRoundedIcon
                    aria-hidden
                    sx={{ color: theme.colors.iconMuted, fontSize: 20 }}
                  />
                  <Typography
                    sx={{ ...numericSx, color: theme.colors.textSecondary, minWidth: 20 }}
                    variant="body2"
                  >
                    {index + 1}.
                  </Typography>
                  <Typography sx={{ color: theme.colors.textPrimary, flex: 1 }} variant="body2">
                    {label}
                  </Typography>
                  {showCorrect && typeof answer.correctOrder === 'number' && (
                    <StatusPill
                      label={t('ordering.correctPosition', { position: answer.correctOrder })}
                      tone={isInPlace ? 'success' : 'neutral'}
                    />
                  )}
                  <Box sx={{ display: 'flex' }}>
                    <IconButton
                      aria-label={t('ordering.moveUp', { answer: label })}
                      disabled={index === 0}
                      onClick={() => move(index, index - 1)}
                      size="small"
                    >
                      <ArrowUpwardRoundedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label={t('ordering.moveDown', { answer: label })}
                      disabled={index === order.length - 1}
                      onClick={() => move(index, index + 1)}
                      size="small"
                    >
                      <ArrowDownwardRoundedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Stack>
                <PresentationMedia
                  assets={answer.media}
                  label={t('answerMediaLabel')}
                  maxHeight={ANSWER_MEDIA_MAX_HEIGHT}
                />
              </Stack>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </Stack>
  );
};
