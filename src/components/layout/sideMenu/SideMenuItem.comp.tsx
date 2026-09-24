import { Box, Tooltip, useTheme } from '@mui/material';
import { JSX } from 'react';
import { NavLink } from 'react-router-dom';

import { sideMenuItemSx } from '@/components/layout/sideMenu/SideMenu.styles.ts';
import { MenuItemModel } from '@/models/menu/MenuItem.model.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  collapsed: boolean;
  item: MenuItemModel;
};

export const SideMenuItem = ({ collapsed, item }: Props): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslationWithPrefix('menu.items');
  const { icon: Icon } = item;
  const label = t(item.id);

  return (
    <Tooltip disableHoverListener={!collapsed} placement="right" title={label}>
      <Box
        aria-label={collapsed ? label : undefined}
        component={NavLink}
        sx={sideMenuItemSx(theme.colors, collapsed)}
        to={item.route}
      >
        <Box className="side-menu-indicator" />
        <Icon />
        {!collapsed && (
          <Box component="span" sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {label}
          </Box>
        )}
      </Box>
    </Tooltip>
  );
};
