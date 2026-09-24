import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';

import { CONFIG } from '@/config/config.ts';
import { MenuItemEnum, MenuSectionEnum } from '@/models/menu/MenuItem.enum.ts';
import { MenuItemModel, MenuSectionModel } from '@/models/menu/MenuItem.model.ts';
import { RouteEnum } from '@/models/route/Route.enum.ts';

const MAIN_SECTIONS: MenuSectionModel[] = [
  {
    id: MenuSectionEnum.MODULES,
    items: [
      {
        icon: LibraryBooksOutlinedIcon,
        id: MenuItemEnum.QUESTION_BANK,
        route: RouteEnum.QUESTION_BANK,
      },
      { icon: AssignmentOutlinedIcon, id: MenuItemEnum.TESTS, route: RouteEnum.TESTS },
      { icon: PollOutlinedIcon, id: MenuItemEnum.SURVEYS, route: RouteEnum.SURVEYS },
      { icon: RouteOutlinedIcon, id: MenuItemEnum.PATHS, route: RouteEnum.PATHS },
      { icon: AccountTreeOutlinedIcon, id: MenuItemEnum.PROCESSES, route: RouteEnum.PROCESSES },
    ],
  },
  {
    id: MenuSectionEnum.OVERVIEW,
    items: [
      { icon: DashboardOutlinedIcon, id: MenuItemEnum.DASHBOARD, route: RouteEnum.DASHBOARD },
    ],
  },
  {
    id: MenuSectionEnum.SYSTEM,
    items: [{ icon: SettingsOutlinedIcon, id: MenuItemEnum.SETTINGS, route: RouteEnum.SETTINGS }],
  },
];

const DEVELOPER_SECTION: MenuSectionModel = {
  id: MenuSectionEnum.DEVELOPER,
  items: [
    { icon: WidgetsOutlinedIcon, id: MenuItemEnum.DEV_PATTERNS, route: RouteEnum.DEV_PATTERNS },
  ],
};

export const MENU_SECTIONS: MenuSectionModel[] = CONFIG.DEV_TOOLS_ENABLED
  ? [...MAIN_SECTIONS, DEVELOPER_SECTION]
  : MAIN_SECTIONS;

const matchesRoute = (pathname: string, route: string): boolean =>
  pathname === route || pathname.startsWith(`${route}/`);

export const findMenuItemByPath = (pathname: string): MenuItemModel | undefined =>
  MENU_SECTIONS.flatMap(section => section.items).find(item => matchesRoute(pathname, item.route));
