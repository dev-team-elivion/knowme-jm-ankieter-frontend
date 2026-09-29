import { Box, useTheme } from '@mui/material';
import { JSX, ReactNode } from 'react';

import { fieldLabelSx } from '@/config/theme/uiTokens.ts';

type Props = {
  children: ReactNode;
  label: string;
};

export const FilterField = ({ children, label }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <Box sx={{ minWidth: 0 }}>
      <Box aria-hidden sx={fieldLabelSx(theme.colors)}>
        {label}
      </Box>
      {children}
    </Box>
  );
};
