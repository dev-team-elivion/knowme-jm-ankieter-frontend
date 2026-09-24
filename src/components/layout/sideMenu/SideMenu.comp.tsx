import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { JSX, useState } from 'react';

import { sideMenuSx } from '@/components/layout/sideMenu/SideMenu.styles.ts';
import { SideMenuItem } from '@/components/layout/sideMenu/SideMenuItem.comp.tsx';
import {
  readSideMenuCollapsed,
  storeSideMenuCollapsed,
} from '@/components/layout/sideMenu/sideMenuStorage.util.ts';
import { microLabelSx } from '@/config/theme/uiTokens.ts';
import { MENU_SECTIONS } from '@/models/menu/menuSections.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

export const SideMenu = (): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('layout.sideMenu');
  const { t: tMenu } = useTranslationWithPrefix('menu.sections');
  const [collapsed, setCollapsed] = useState(readSideMenuCollapsed);

  const handleToggle = (): void => {
    const next = !collapsed;
    setCollapsed(next);
    storeSideMenuCollapsed(next);
  };

  return (
    <Box aria-label={t('navigationLabel')} component="nav" sx={sideMenuSx(theme.colors, collapsed)}>
      <Stack
        spacing={2.5}
        sx={{ flex: 1, overflowX: 'hidden', overflowY: 'auto', p: 1.5, pt: 2.5 }}
      >
        {MENU_SECTIONS.map(section => (
          <Stack key={section.id} spacing={0.5}>
            <Typography
              sx={{
                ...microLabelSx(theme.colors.textMuted),
                height: 12,
                opacity: collapsed ? 0 : 1,
                px: 1.75,
                transition: 'opacity 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {tMenu(section.id)}
            </Typography>
            {section.items.map(item => (
              <SideMenuItem collapsed={collapsed} item={item} key={item.id} />
            ))}
          </Stack>
        ))}
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end', p: 1.5 }}>
        <IconButton
          aria-expanded={!collapsed}
          aria-label={collapsed ? t('expand') : t('collapse')}
          onClick={handleToggle}
          size="small"
        >
          <KeyboardDoubleArrowLeftRoundedIcon
            sx={{
              transform: collapsed ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};
