import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  useTheme,
} from '@mui/material';
import { JSX, useId, useState } from 'react';

import { fieldLabelSx } from '@/config/theme/uiTokens.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

const REASON_ROWS = 3;
const REASON_MAX_LENGTH = 500;

type Props = {
  isOpen: boolean;
  isPending: boolean;
  onCancel: () => void;
  onConfirm: (reason: string) => void;
};

export const MarkForReviewDialog = ({
  isOpen,
  isPending,
  onCancel,
  onConfirm,
}: Props): JSX.Element => {
  const theme = useTheme();
  const titleId = useId();
  const reasonId = useId();
  const { t } = useTranslationWithPrefix('components.reviewMark.dialog');
  const [reason, setReason] = useState('');

  return (
    <Dialog
      aria-labelledby={titleId}
      fullWidth
      maxWidth="sm"
      onClose={isPending ? undefined : onCancel}
      open={isOpen}
      slotProps={{ transition: { onExited: () => setReason('') } }}
    >
      <DialogTitle id={titleId}>{t('title')}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <DialogContentText>{t('description')}</DialogContentText>
          <Box>
            <Box component="label" htmlFor={reasonId} sx={fieldLabelSx(theme.colors)}>
              {t('reason')}
            </Box>
            <TextField
              fullWidth
              id={reasonId}
              minRows={REASON_ROWS}
              multiline
              onChange={event => setReason(event.target.value)}
              placeholder={t('reasonPlaceholder')}
              slotProps={{ htmlInput: { maxLength: REASON_MAX_LENGTH } }}
              value={reason}
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button disabled={isPending} onClick={onCancel} variant="text">
          {t('cancel')}
        </Button>
        <Button disabled={isPending} loading={isPending} onClick={() => onConfirm(reason)}>
          {t('confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
