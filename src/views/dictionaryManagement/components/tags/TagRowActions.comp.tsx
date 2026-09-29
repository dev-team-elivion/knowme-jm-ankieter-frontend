import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { IconButton, ListItemText, Menu, MenuItem } from '@mui/material';
import { JSX, MouseEvent, useState } from 'react';

import { TagDto } from '@/api/generated';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

export type TagRowActionHandlers = {
  onMerge: (tag: TagDto) => void;
};

type Props = {
  tag: TagDto;
} & TagRowActionHandlers;

export const TagRowActions = ({ onMerge, tag }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.dictionaryManagement.tags.actions');
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleOpen = (event: MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    setAnchor(event.currentTarget);
  };

  const handleMerge = (): void => {
    setAnchor(null);
    onMerge(tag);
  };

  return (
    <>
      <IconButton
        aria-haspopup="menu"
        aria-label={t('menu', { label: tag.label })}
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
        <MenuItem disabled={!tag.active} onClick={handleMerge}>
          <ListItemText secondary={tag.active ? undefined : t('mergeUnavailable')}>
            {t('merge')}
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
