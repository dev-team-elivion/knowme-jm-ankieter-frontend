import { SvgIconComponent } from '@mui/icons-material';

import { MenuItemEnum, MenuSectionEnum } from '@/models/menu/MenuItem.enum.ts';
import { RouteEnum } from '@/models/route/Route.enum.ts';

export type MenuItemModel = {
  icon: SvgIconComponent;
  id: MenuItemEnum;
  route: RouteEnum;
};

export type MenuSectionModel = {
  id: MenuSectionEnum;
  items: MenuItemModel[];
};
