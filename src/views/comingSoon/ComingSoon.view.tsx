import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { JSX } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { PageHeader } from '@/components/page/PageHeader.comp.tsx';
import { StatusPill } from '@/components/state/StatusPill.comp.tsx';
import { iconTileSx, panelSx, revealSx } from '@/config/theme/uiTokens.ts';
import { MenuItemEnum } from '@/models/menu/MenuItem.enum.ts';
import { findMenuItemByPath } from '@/models/menu/menuSections.ts';
import { RouteEnum } from '@/models/route/Route.enum.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

export const ComingSoonView = (): JSX.Element => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { t } = useTranslationWithPrefix('views.comingSoon');
  const { t: tMenu } = useTranslationWithPrefix('menu.items');
  const menuItem = findMenuItemByPath(pathname);
  const Icon = menuItem?.icon ?? ConstructionOutlinedIcon;
  const title = menuItem ? tMenu(menuItem.id) : t('statusLabel');
  const isDashboard = menuItem?.id === MenuItemEnum.DASHBOARD;

  return (
    <Stack spacing={4}>
      <Box sx={revealSx(0)}>
        <PageHeader icon={Icon} title={title} />
      </Box>
      <Stack
        spacing={3}
        sx={{
          ...panelSx(theme.colors),
          ...revealSx(1),
          alignItems: 'center',
          px: 4,
          py: 8,
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            ...iconTileSx(theme.colors.accentBg, 72, theme.colors.accentBorder),
            borderRadius: '20px',
            color: theme.colors.accentInk,
          }}
        >
          <ConstructionOutlinedIcon sx={{ fontSize: 32 }} />
        </Box>
        <Stack spacing={1.5} sx={{ alignItems: 'center', maxWidth: 520 }}>
          <StatusPill label={t('statusLabel')} tone="warning" />
          <Typography component="h2" sx={{ color: theme.colors.textPrimary }} variant="h3">
            {title}
          </Typography>
          <Typography sx={{ color: theme.colors.textSecondary }} variant="body1">
            {t('description')}
          </Typography>
          <Typography sx={{ color: theme.colors.textMuted }} variant="body2">
            {t('hint')}
          </Typography>
        </Stack>
        {!isDashboard && (
          <Button component={Link} to={RouteEnum.DASHBOARD} variant="outlined">
            {t('goToDashboard')}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
