import { SvgIconComponent } from '@mui/icons-material';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { JSX, ReactNode } from 'react';

import { iconTileSx } from '@/config/theme/uiTokens.ts';

type Props = {
  actions?: ReactNode;
  backAction?: ReactNode;
  description?: string;
  icon?: SvgIconComponent;
  title: string;
  titleAdornment?: ReactNode;
};

export const PageHeader = ({
  actions,
  backAction,
  description,
  icon: Icon,
  title,
  titleAdornment,
}: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <Stack component="header" spacing={1.5}>
      {backAction && <Box sx={{ alignSelf: 'flex-start' }}>{backAction}</Box>}
      <Stack
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
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', minWidth: 0 }}>
              <Typography
                component="h1"
                sx={{ color: theme.colors.textPrimary, textWrap: 'balance' }}
                variant="h2"
              >
                {title}
              </Typography>
              {titleAdornment}
            </Stack>
            {description && (
              <Typography
                sx={{ color: theme.colors.textSecondary, maxWidth: 720, textWrap: 'pretty' }}
                variant="body2"
              >
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
    </Stack>
  );
};
