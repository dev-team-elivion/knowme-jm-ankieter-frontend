import { Stack, useTheme } from '@mui/material';
import { JSX, ReactNode } from 'react';

import { panelSx, revealSx } from '@/config/theme/uiTokens.ts';

type Props = {
  children: ReactNode;
};

export const QuestionFormActionBar = ({ children }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        ...panelSx(theme.colors),
        ...revealSx(6),
        alignItems: 'flex-start',
        bottom: 16,
        justifyContent: 'flex-end',
        p: 2,
        position: 'sticky',
        zIndex: 2,
      }}
    >
      {children}
    </Stack>
  );
};
