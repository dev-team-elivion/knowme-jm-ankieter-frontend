import { Box, Stack, useTheme } from '@mui/material';
import { JSX, ReactNode } from 'react';

import { microLabelSx } from '@/config/theme/uiTokens.ts';

type Props = {
  children: ReactNode;
  label: string;
};

export const LabeledBlock = ({ children, label }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <Stack spacing={0.75}>
      <Box sx={microLabelSx(theme.colors.textSecondary)}>{label}</Box>
      {children}
    </Stack>
  );
};
