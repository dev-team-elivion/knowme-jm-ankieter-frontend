import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';
import { Link } from 'react-router-dom';

import { UserMenu } from '@/components/layout/topBar/UserMenu.comp.tsx';
import { iconTileSx, microLabelSx, TOP_BAR_HEIGHT } from '@/config/theme/uiTokens.ts';
import { RouteEnum } from '@/models/route/Route.enum.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

export const TopBar = (): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('layout');

  return (
    <Box
      component="header"
      sx={{
        alignItems: 'center',
        background: theme.colors.bgTopbar,
        borderBottom: `1px solid ${theme.colors.topbarBorder}`,
        display: 'flex',
        flexShrink: 0,
        height: TOP_BAR_HEIGHT,
        justifyContent: 'space-between',
        position: 'sticky',
        px: 3,
        top: 0,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Stack
        component={Link}
        direction="row"
        spacing={1.5}
        sx={{ alignItems: 'center', color: 'inherit', textDecoration: 'none' }}
        to={RouteEnum.DASHBOARD}
      >
        <Box
          sx={{
            ...iconTileSx(theme.colors.topbarAccentBg, 36, theme.colors.topbarAccentBorder),
            color: theme.colors.topbarAccent,
          }}
        >
          <FactCheckOutlinedIcon />
        </Box>
        <Stack spacing={0.25}>
          <Typography sx={{ color: theme.colors.topbarText, lineHeight: 1 }} variant="h4">
            {t('appName')}
          </Typography>
          <Typography sx={microLabelSx(theme.colors.topbarTextMuted)}>{t('appTagline')}</Typography>
        </Stack>
      </Stack>
      <UserMenu />
    </Box>
  );
};
