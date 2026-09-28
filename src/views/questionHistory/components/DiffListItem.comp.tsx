import { Stack, Typography, useTheme } from '@mui/material';
import { JSX, ReactNode } from 'react';

import { innerPanelSx } from '@/config/theme/uiTokens.ts';
import { DiffKind } from '@/views/questionHistory/model/QuestionHistory.model.ts';

type Props = {
  aside?: ReactNode;
  kind: DiffKind;
  text: string;
};

export const DiffListItem = ({ aside, kind, text }: Props): JSX.Element => {
  const theme = useTheme();
  const accent =
    kind === 'added' ? theme.colors.green : kind === 'removed' ? theme.colors.red : null;

  return (
    <Stack
      component="li"
      direction="row"
      spacing={1.5}
      sx={{
        ...innerPanelSx(theme.colors),
        alignItems: 'center',
        backgroundColor: accent ? `${accent}14` : undefined,
        borderColor: accent ? `${accent}66` : theme.colors.border,
        justifyContent: 'space-between',
        listStyle: 'none',
        px: 2,
        py: 1,
      }}
    >
      <Typography
        sx={{
          color: kind === 'removed' ? theme.colors.textSecondary : theme.colors.textPrimary,
          textDecoration: kind === 'removed' ? 'line-through' : 'none',
          whiteSpace: 'pre-wrap',
        }}
        variant="body2"
      >
        {text}
      </Typography>
      {aside}
    </Stack>
  );
};
