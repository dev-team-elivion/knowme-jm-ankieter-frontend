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
      spacing={3}
      sx={{
        ...panelSx(theme.colors),
        ...revealSx(6),
        alignItems: 'center',
        bottom: 16,
        justifyContent: 'flex-end',
        position: 'sticky',
        px: 3,
        py: 2,
        zIndex: 2,
      }}
    >
      {children}
    </Stack>
  );
};
