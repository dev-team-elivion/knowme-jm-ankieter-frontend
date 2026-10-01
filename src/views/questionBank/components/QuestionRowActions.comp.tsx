import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { IconButton, ListItemText, Menu, MenuItem } from '@mui/material';
import { JSX, MouseEvent, useState } from 'react';

import { QuestionListItemDto, VersionStatusDto } from '@/api/generated';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

export type QuestionRowActionHandlers = {
  onDuplicate: (question: QuestionListItemDto) => void;
  onEdit: (question: QuestionListItemDto) => void;
  onHistory: (question: QuestionListItemDto) => void;
  onPreview: (question: QuestionListItemDto) => void;
  onRetire: (question: QuestionListItemDto) => void;
};

type Props = {
  canDuplicate: boolean;
  question: QuestionListItemDto;
} & QuestionRowActionHandlers;

export const QuestionRowActions = ({
  canDuplicate,
  onDuplicate,
  onEdit,
  onHistory,
  onPreview,
  onRetire,
  question,
}: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionBank.actions');
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const canRetire = question.status === VersionStatusDto.Active;

  const handleOpen = (event: MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    setAnchor(event.currentTarget);
  };

  const runAndClose = (action: (item: QuestionListItemDto) => void) => (): void => {
    setAnchor(null);
    action(question);
  };

  return (
    <>
      <IconButton
        aria-haspopup="menu"
        aria-label={t('menu', { key: question.businessKey })}
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
        <MenuItem onClick={runAndClose(onPreview)}>{t('preview')}</MenuItem>
        <MenuItem disabled={!canDuplicate} onClick={runAndClose(onDuplicate)}>
          <ListItemText secondary={canDuplicate ? undefined : t('unsupportedType')}>
            {t('duplicate')}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={runAndClose(onEdit)}>{t('edit')}</MenuItem>
        <MenuItem onClick={runAndClose(onHistory)}>{t('history')}</MenuItem>
        <MenuItem disabled={!canRetire} onClick={runAndClose(onRetire)}>
          <ListItemText secondary={canRetire ? undefined : t('retireNoActiveVersion')}>
            {t('retire')}
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
