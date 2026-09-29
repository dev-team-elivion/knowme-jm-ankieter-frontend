import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { JSX, useId } from 'react';

import { CategoryDto } from '@/api/generated';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  category: CategoryDto | null;
  isPending: boolean;
  onClose: () => void;
  onConfirm: (category: CategoryDto) => void;
};

export const CategoryDeactivateDialog = ({
  category,
  isPending,
  onClose,
  onConfirm,
}: Props): JSX.Element => {
  const titleId = useId();
  const { t } = useTranslationWithPrefix('views.dictionaryManagement.categories.statusDialog');

  return (
    <Dialog
      aria-labelledby={titleId}
      fullWidth
      maxWidth="xs"
      onClose={onClose}
      open={category !== null}
    >
      <DialogTitle id={titleId}>{t('title', { name: category?.name ?? '' })}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('used', { count: category?.questionCount ?? 0 })}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text">
          {t('cancel')}
        </Button>
        <Button
          disabled={isPending || category === null}
          onClick={() => category && onConfirm(category)}
        >
          {t('confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
