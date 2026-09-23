import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { JSX, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title?: ReactNode;
  tone?: 'info' | 'warning';
};

export const InfoCallout = ({ children, title, tone = 'info' }: Props): JSX.Element => {
  const theme = useTheme();
  const accent = tone === 'warning' ? theme.colors.orange : theme.colors.blue;
  const Icon = tone === 'warning' ? WarningAmberRoundedIcon : InfoOutlinedIcon;

  return (
    <Box
      sx={{
        alignItems: title ? 'flex-start' : 'center',
        background: `${accent}14`,
        border: `1px solid ${accent}40`,
        borderRadius: '12px',
        display: 'flex',
        gap: 1.25,
        p: 2,
      }}
    >
      <Icon sx={{ color: accent, mt: title ? 0.1 : 0 }} />
      <Stack spacing={0.4}>
        {title && (
          <Typography sx={{ color: theme.colors.textPrimary }} variant="subtitle2">
            {title}
          </Typography>
        )}
        <Typography sx={{ color: theme.colors.textSecondary }} variant="body2">
          {children}
        </Typography>
      </Stack>
    </Box>
  );
};
