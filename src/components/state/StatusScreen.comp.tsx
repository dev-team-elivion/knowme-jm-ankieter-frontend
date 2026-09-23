import { SvgIconComponent } from '@mui/icons-material';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { JSX, ReactNode } from 'react';

import {
  iconTileSx,
  microLabelSx,
  panelSx,
  revealSx,
  TOP_BAR_HEIGHT,
} from '@/config/theme/uiTokens.ts';

type Props = {
  actions?: ReactNode;
  description: string;
  icon: SvgIconComponent;
  statusLabel: string;
  title: string;
  tone?: 'accent' | 'error';
  variant?: 'fullPage' | 'inline';
};

export const StatusScreen = ({
  actions,
  description,
  icon: Icon,
  statusLabel,
  title,
  tone = 'accent',
  variant = 'fullPage',
}: Props): JSX.Element => {
  const theme = useTheme();
  const toneColor = tone === 'error' ? theme.colors.red : theme.colors.accentInk;
  const toneBackground = tone === 'error' ? `${theme.colors.red}1A` : theme.colors.accentBg;
  const toneBorder = tone === 'error' ? `${theme.colors.red}40` : theme.colors.accentBorder;

  return (
    <Box
      component={variant === 'fullPage' ? 'main' : 'section'}
      sx={{
        alignItems: 'center',
        background:
          variant === 'fullPage'
            ? `radial-gradient(1200px 600px at 15% -10%, ${theme.colors.accentBg}, transparent 60%), ${theme.colors.bg}`
            : 'transparent',
        display: 'flex',
        justifyContent: 'center',
        minHeight: variant === 'fullPage' ? '100vh' : `calc(100vh - ${TOP_BAR_HEIGHT * 3}px)`,
        p: 4,
      }}
    >
      <Stack spacing={3} sx={{ ...panelSx(theme.colors), ...revealSx(), maxWidth: 560, p: 5 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Box sx={{ ...iconTileSx(toneBackground, 48, toneBorder), color: toneColor }}>
            <Icon />
          </Box>
          <Typography sx={microLabelSx(toneColor)}>{statusLabel}</Typography>
        </Stack>

        <Stack spacing={1.5}>
          <Typography component="h1" sx={{ color: theme.colors.textPrimary }} variant="h1">
            {title}
          </Typography>
          <Typography sx={{ color: theme.colors.textSecondary }} variant="body1">
            {description}
          </Typography>
        </Stack>

        {actions && (
          <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
            {actions}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
