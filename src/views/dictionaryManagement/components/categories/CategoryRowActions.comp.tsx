import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { JSX, MouseEvent, useState } from 'react';

import { CategoryDto } from '@/api/generated';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

export type CategoryRowActionHandlers = {
  onActivate: (category: CategoryDto) => void;
  onDeactivate: (category: CategoryDto) => void;
  onEdit: (category: CategoryDto) => void;
};

type Props = {
  category: CategoryDto;
} & CategoryRowActionHandlers;

export const CategoryRowActions = ({
  category,
  onActivate,
  onDeactivate,
  onEdit,
}: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.dictionaryManagement.categories.actions');
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleOpen = (event: MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    setAnchor(event.currentTarget);
  };

  const runAndClose = (action: (item: CategoryDto) => void) => (): void => {
    setAnchor(null);
    action(category);
  };

  return (
    <>
      <IconButton
        aria-haspopup="menu"
        aria-label={t('menu', { name: category.name })}
        onClick={handleOpen}
        size="small"
      >
        <MoreHorizRoundedIcon />
      </IconButton>
      <Menu
        anchorEl={anchor}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        onClick={event => event.stopPropagation()}
        onClose={() => setAnchor(null)}
        open={anchor !== null}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem onClick={runAndClose(onEdit)}>{t('edit')}</MenuItem>
        {category.active ? (
          <MenuItem onClick={runAndClose(onDeactivate)}>{t('deactivate')}</MenuItem>
        ) : (
          <MenuItem onClick={runAndClose(onActivate)}>{t('activate')}</MenuItem>
        )}
      </Menu>
    </>
  );
};
