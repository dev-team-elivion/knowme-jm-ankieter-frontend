import { Box, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';

import { DiffKind, DiffSegment } from '@/views/questionHistory/model/QuestionHistory.model.ts';

type Props = {
  segments: DiffSegment[];
  variant?: 'body1' | 'body2';
};

export const DiffText = ({ segments, variant = 'body2' }: Props): JSX.Element => {
  const theme = useTheme();

  const segmentSx = (kind: DiffKind) => {
    if (kind === 'added') {
      return { backgroundColor: `${theme.colors.green}29`, borderRadius: '4px', px: 0.25 };
    }
    if (kind === 'removed') {
      return {
        backgroundColor: `${theme.colors.red}29`,
        borderRadius: '4px',
        color: theme.colors.textSecondary,
        px: 0.25,
        textDecoration: 'line-through',
      };
    }
    return {};
  };

  return (
    <Typography
      sx={{ color: theme.colors.textPrimary, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
      variant={variant}
    >
      {segments.map(segment => (
        <Box component="span" key={segment.id} sx={segmentSx(segment.kind)}>
          {segment.text}
        </Box>
      ))}
    </Typography>
  );
};
