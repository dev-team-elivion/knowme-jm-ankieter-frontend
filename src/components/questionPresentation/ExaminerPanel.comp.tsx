import {
  Box,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from '@mui/material';
import { JSX, useState } from 'react';

import { innerPanelSx, microLabelSx, numericSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

const COMMENT_ROWS = 3;
const COMMENT_MAX_LENGTH = 2000;

type Props = {
  answerKey?: string;
  isCommentRequired: boolean;
  isPassFail: boolean;
  scaleMax: number;
  topics: string[];
  topicsToPick?: number;
};

export const ExaminerPanel = ({
  answerKey,
  isCommentRequired,
  isPassFail,
  scaleMax,
  topics,
  topicsToPick,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('components.questionPresentation.examiner');
  const [grade, setGrade] = useState<null | string>(null);
  const [comment, setComment] = useState('');
  const gradeOptions = isPassFail
    ? [
        { label: t('pass'), value: 'pass' },
        { label: t('fail'), value: 'fail' },
      ]
    : Array.from({ length: scaleMax + 1 }, (_, score) => ({
        label: String(score),
        value: String(score),
      }));
  const commentLabel = isCommentRequired ? t('commentRequired') : t('comment');

  return (
    <Stack spacing={2.5}>
      {topics.length > 0 && (
        <Stack spacing={1}>
          <Typography sx={microLabelSx(theme.colors.textSecondary)}>{t('topics')}</Typography>
          {topicsToPick !== undefined && (
            <Typography sx={{ color: theme.colors.textSecondary }} variant="body2">
              {t('topicsToPick', { count: topicsToPick })}
            </Typography>
          )}
          <Box component="ol" sx={{ color: theme.colors.textPrimary, m: 0, pl: 2.5 }}>
            {topics.map(topic => (
              <Typography component="li" key={topic} sx={{ py: 0.25 }} variant="body2">
                {topic}
              </Typography>
            ))}
          </Box>
        </Stack>
      )}
      {answerKey && (
        <Stack spacing={1} sx={{ ...innerPanelSx(theme.colors), p: 2 }}>
          <Typography sx={microLabelSx(theme.colors.textSecondary)}>{t('answerKey')}</Typography>
          <Typography
            sx={{ color: theme.colors.textPrimary, whiteSpace: 'pre-wrap' }}
            variant="body2"
          >
            {answerKey}
          </Typography>
        </Stack>
      )}
      <Stack spacing={1}>
        <Typography sx={microLabelSx(theme.colors.textSecondary)}>
          {isPassFail ? t('result') : t('scale', { max: scaleMax })}
        </Typography>
        <ToggleButtonGroup
          aria-label={isPassFail ? t('result') : t('scale', { max: scaleMax })}
          exclusive
          onChange={(_, value: null | string) => setGrade(value)}
          size="small"
          sx={{ flexWrap: 'wrap' }}
          value={grade}
        >
          {gradeOptions.map(option => (
            <ToggleButton key={option.value} sx={numericSx} value={option.value}>
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
      <TextField
        fullWidth
        minRows={COMMENT_ROWS}
        multiline
        onChange={event => setComment(event.target.value)}
        placeholder={commentLabel}
        slotProps={{ htmlInput: { 'aria-label': commentLabel, maxLength: COMMENT_MAX_LENGTH } }}
        value={comment}
      />
    </Stack>
  );
};
