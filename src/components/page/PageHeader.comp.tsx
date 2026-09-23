import { SvgIconComponent } from '@mui/icons-material';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { JSX, ReactNode } from 'react';

import { iconTileSx } from '@/config/theme/uiTokens.ts';

type Props = {
  actions?: ReactNode;
  description?: string;
  icon?: SvgIconComponent;
  title: string;
};

export const PageHeader = ({ actions, description, icon: Icon, title }: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <Stack
      component="header"
      direction="row"
      spacing={3}
      sx={{ alignItems: 'center', justifyContent: 'space-between' }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', minWidth: 0 }}>
        {Icon && (
          <Box
            sx={{
              ...iconTileSx(theme.colors.accentBg, 48, theme.colors.accentBorder),
              color: theme.colors.accentInk,
            }}
          >
            <Icon />
          </Box>
        )}
        <Stack spacing={0.5} sx={{ minWidth: 0 }}>
          <Typography component="h1" sx={{ color: theme.colors.textPrimary }} variant="h2">
            {title}
          </Typography>
          {description && (
            <Typography sx={{ color: theme.colors.textSecondary, maxWidth: 720 }} variant="body2">
              {description}
            </Typography>
          )}
        </Stack>
      </Stack>
      {actions && (
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', flexShrink: 0 }}>
          {actions}
        </Stack>
      )}
    </Stack>
  );
};
