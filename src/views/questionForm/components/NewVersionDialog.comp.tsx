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
  isOpen: boolean;
  isSaving: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const NewVersionDialog = ({ isOpen, isSaving, onCancel, onConfirm }: Props): JSX.Element => {
  const titleId = useId();
  const descriptionId = useId();
  const { t } = useTranslationWithPrefix('views.questionForm.newVersionDialog');

  return (
    <Dialog
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      maxWidth="sm"
      onClose={isSaving ? undefined : onCancel}
      open={isOpen}
    >
      <DialogTitle id={titleId}>{t('title')}</DialogTitle>
      <DialogContent>
        <DialogContentText id={descriptionId}>{t('description')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={isSaving} onClick={onCancel} variant="text">
          {t('cancel')}
        </Button>
        <Button disabled={isSaving} onClick={onConfirm}>
          {t('confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
