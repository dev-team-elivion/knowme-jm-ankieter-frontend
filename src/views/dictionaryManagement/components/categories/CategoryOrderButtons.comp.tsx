import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { IconButton, Stack } from '@mui/material';
import { JSX, MouseEvent } from 'react';

import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { MoveDirection } from '@/views/dictionaryManagement/model/DictionaryManagement.model.ts';

type Props = {
  canMoveDown: boolean;
  canMoveUp: boolean;
  disabled: boolean;
  name: string;
  onMove: (direction: MoveDirection) => void;
};

export const CategoryOrderButtons = ({
  canMoveDown,
  canMoveUp,
  disabled,
  name,
  onMove,
}: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.dictionaryManagement.categories.actions');

  const handleMove = (direction: MoveDirection) => (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onMove(direction);
  };

  return (
    <Stack direction="row" spacing={0.5}>
      <IconButton
        aria-label={t('moveUp', { name })}
        disabled={disabled || !canMoveUp}
        onClick={handleMove(-1)}
        size="small"
      >
        <KeyboardArrowUpRoundedIcon fontSize="small" />
      </IconButton>
      <IconButton
        aria-label={t('moveDown', { name })}
        disabled={disabled || !canMoveDown}
        onClick={handleMove(1)}
        size="small"
      >
        <KeyboardArrowDownRoundedIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
};
