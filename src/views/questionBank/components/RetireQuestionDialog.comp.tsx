import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { JSX, useId } from 'react';

import { BulkOperationDto, QuestionListItemDto } from '@/api/generated';
import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { useBulkUpdateQuestions } from '@/hooks/useBulkUpdateQuestions.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  onClose: () => void;
  question: null | QuestionListItemDto;
};

export const RetireQuestionDialog = ({ onClose, question }: Props): JSX.Element => {
  const titleId = useId();
  const descriptionId = useId();
  const { t } = useTranslationWithPrefix('views.questionBank.retireDialog');
  const { notifyError, notifySuccess } = useNotifications();
  const { bulkUpdate, isPending } = useBulkUpdateQuestions();

  const retire = async (target: QuestionListItemDto): Promise<void> => {
    try {
      await bulkUpdate({ operation: BulkOperationDto.Retire, questionIds: [target.id] });
      notifySuccess(t('done', { key: target.businessKey }));
      onClose();
    } catch {
      notifyError(t('failed'));
    }
  };

  return (
    <Dialog
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      maxWidth="sm"
      onClose={isPending ? undefined : onClose}
      open={question !== null}
    >
      <DialogTitle id={titleId}>{t('title', { key: question?.businessKey ?? '' })}</DialogTitle>
      <DialogContent>
        <DialogContentText id={descriptionId}>{t('description')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={isPending} onClick={onClose} variant="text">
          {t('cancel')}
        </Button>
        <Button
          disabled={isPending}
          loading={isPending}
          onClick={() => {
            if (question) {
              void retire(question);
            }
          }}
        >
          {t('confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
