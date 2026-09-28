import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { JSX, useId } from 'react';

import { ErrorState } from '@/components/state/ErrorState.comp.tsx';
import { LoadingState } from '@/components/state/LoadingState.comp.tsx';
import { useGetQuestion } from '@/hooks/useGetQuestion.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionPreviewContent } from '@/views/questionBank/components/QuestionPreviewContent.comp.tsx';

const STATE_MIN_HEIGHT = 200;

type Props = {
  onClose: () => void;
  questionId: null | string;
};

export const QuestionPreviewDialog = ({ onClose, questionId }: Props): JSX.Element => {
  const titleId = useId();
  const { t } = useTranslationWithPrefix('views.questionBank.preview');
  const { isError, isFetching, isPending, question, retry } = useGetQuestion(
    questionId ?? undefined,
  );

  return (
    <Dialog
      aria-labelledby={titleId}
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      open={questionId !== null}
    >
      <DialogTitle id={titleId}>{t('title')}</DialogTitle>
      <DialogContent>
        {isError && (
          <ErrorState isRetrying={isFetching} minHeight={STATE_MIN_HEIGHT} onRetry={retry} />
        )}
        {!isError && (isPending || question === undefined) && (
          <LoadingState minHeight={STATE_MIN_HEIGHT} />
        )}
        {!isError && question !== undefined && <QuestionPreviewContent question={question} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text">
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
