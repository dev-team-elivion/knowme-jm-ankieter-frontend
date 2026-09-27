import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { JSX, useId } from 'react';

import { ErrorState } from '@/components/state/ErrorState.comp.tsx';
import { LoadingState } from '@/components/state/LoadingState.comp.tsx';
import { useGetQuestion } from '@/hooks/useGetQuestion.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionHistoryContent } from '@/views/questionBank/components/QuestionHistoryContent.comp.tsx';
import { QuestionPreviewContent } from '@/views/questionBank/components/QuestionPreviewContent.comp.tsx';
import { QuestionDialog } from '@/views/questionBank/model/QuestionBank.model.ts';

const STATE_MIN_HEIGHT = 200;

type Props = {
  dialog: null | QuestionDialog;
  locale: string;
  onClose: () => void;
};

export const QuestionDetailDialog = ({ dialog, locale, onClose }: Props): JSX.Element => {
  const titleId = useId();
  const { t } = useTranslationWithPrefix('views.questionBank');
  const { isError, isFetching, isPending, question, retry } = useGetQuestion(dialog?.questionId);
  const isPreview = dialog?.kind === 'preview';

  return (
    <Dialog
      aria-labelledby={titleId}
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      open={dialog !== null}
    >
      <DialogTitle id={titleId}>{isPreview ? t('preview.title') : t('history.title')}</DialogTitle>
      <DialogContent>
        {isError && (
          <ErrorState isRetrying={isFetching} minHeight={STATE_MIN_HEIGHT} onRetry={retry} />
        )}
        {!isError && (isPending || question === undefined) && (
          <LoadingState minHeight={STATE_MIN_HEIGHT} />
        )}
        {!isError && question !== undefined && isPreview && (
          <QuestionPreviewContent locale={locale} question={question} />
        )}
        {!isError && question !== undefined && !isPreview && (
          <QuestionHistoryContent question={question} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text">
          {isPreview ? t('preview.close') : t('history.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
