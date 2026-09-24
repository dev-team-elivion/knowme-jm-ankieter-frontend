import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { findMenuItemByPath } from '@/models/menu/menuSections.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

export const useDocumentTitle = (): void => {
  const { pathname } = useLocation();
  const { t: tLayout } = useTranslationWithPrefix('layout');
  const { t: tMenu } = useTranslationWithPrefix('menu.items');
  const menuItem = findMenuItemByPath(pathname);
  const appName = tLayout('appName');
  const title = menuItem ? `${tMenu(menuItem.id)} · ${appName}` : appName;

  useEffect(() => {
    document.title = title;
  }, [title]);
};
