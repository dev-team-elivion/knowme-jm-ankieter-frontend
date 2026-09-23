import { Box, useTheme } from '@mui/material';
import { JSX } from 'react';

import { StatusPillTone } from '@/components/state/model/StatusPill.model.ts';
import { getStatusPillColor } from '@/components/state/util/statusPillColor.util.ts';
import { statusPillSx } from '@/config/theme/uiTokens.ts';

type Props = {
  label: string;
  tone: StatusPillTone;
};

export const StatusPill = ({ label, tone }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <Box component="span" sx={statusPillSx(getStatusPillColor(theme.colors, tone))}>
      {label}
    </Box>
  );
};
