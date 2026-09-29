import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { JSX, useId } from 'react';

import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  fileName: string;
  isOpen: boolean;
  isRemoving: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const MediaDeleteDialog = ({
  fileName,
  isOpen,
  isRemoving,
  onCancel,
  onConfirm,
}: Props): JSX.Element => {
  const titleId = useId();
  const descriptionId = useId();
  const { t } = useTranslationWithPrefix('views.questionForm.media.deleteDialog');

  return (
    <Dialog
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      maxWidth="sm"
      onClose={isRemoving ? undefined : onCancel}
      open={isOpen}
    >
      <DialogTitle id={titleId}>{t('title')}</DialogTitle>
      <DialogContent>
        <DialogContentText id={descriptionId}>
          {t('description', { name: fileName })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={isRemoving} onClick={onCancel} variant="text">
          {t('cancel')}
        </Button>
        <Button disabled={isRemoving} onClick={onConfirm}>
          {t('confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
