import { SvgIconComponent } from '@mui/icons-material';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { JSX, ReactNode } from 'react';

import { iconTileSx, panelSx, revealSx } from '@/config/theme/uiTokens.ts';

type Props = {
  actions?: ReactNode;
  children: ReactNode;
  description?: string;
  icon: SvgIconComponent;
  revealIndex?: number;
  title: string;
};

export const SectionPanel = ({
  actions,
  children,
  description,
  icon: Icon,
  revealIndex = 0,
  title,
}: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <Box component="section" sx={{ ...panelSx(theme.colors), ...revealSx(revealIndex), p: 3 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              ...iconTileSx(theme.colors.bgCard3, 40, theme.colors.border),
              color: theme.colors.accentInk,
            }}
          >
            <Icon />
          </Box>
          <Stack spacing={0.25}>
            <Typography component="h2" sx={{ color: theme.colors.textPrimary }} variant="h4">
              {title}
            </Typography>
            {description && (
              <Typography sx={{ color: theme.colors.textSecondary }} variant="body2">
                {description}
              </Typography>
            )}
          </Stack>
        </Stack>
        {actions}
      </Stack>
      {children}
    </Box>
  );
};
