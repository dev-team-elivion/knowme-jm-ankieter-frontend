import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { JSX, useId, useState } from 'react';

import { BulkOperationDto } from '@/api/generated';
import { hasHttpStatus } from '@/api/guards/isAxiosError.guard.ts';
import { HttpStatusEnum } from '@/api/model/HttpStatus.enum.ts';
import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { ErrorState } from '@/components/state/ErrorState.comp.tsx';
import { LoadingState } from '@/components/state/LoadingState.comp.tsx';
import { useBulkUpdateQuestions } from '@/hooks/useBulkUpdateQuestions.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { BulkParamsStep } from '@/views/questionBank/components/bulk/BulkParamsStep.comp.tsx';
import { BulkPreviewStep } from '@/views/questionBank/components/bulk/BulkPreviewStep.comp.tsx';
import { BulkDialogStep } from '@/views/questionBank/model/BulkOperation.model.ts';
import { QuestionBankQuery } from '@/views/questionBank/model/QuestionBank.model.ts';
import { QuestionSelection } from '@/views/questionBank/model/QuestionSelection.model.ts';
import {
  areBulkParamsComplete,
  EMPTY_BULK_PARAMS,
  isLargeChange,
  needsBulkParams,
  toBulkRequest,
} from '@/views/questionBank/util/bulkRequest.util.ts';
import { useBulkChangeDescription } from '@/views/questionBank/util/useBulkChangeDescription.util.ts';
import { useGetBulkPreview } from '@/views/questionBank/util/useGetBulkPreview.util.ts';
import { QuestionBankFilterOptions } from '@/views/questionBank/util/useQuestionBankFilterOptions.util.ts';

const STATE_MIN_HEIGHT = 200;

type Props = {
  onClose: () => void;
  onDone: () => void;
  operation: BulkOperationDto;
  options: QuestionBankFilterOptions;
  query: QuestionBankQuery;
  selection: QuestionSelection;
};

export const BulkOperationDialog = ({
  onClose,
  onDone,
  operation,
  options,
  query,
  selection,
}: Props): JSX.Element => {
  const titleId = useId();
  const { t } = useTranslationWithPrefix('views.questionBank.bulk');
  const { notifyError, notifySuccess } = useNotifications();
  const describeChange = useBulkChangeDescription(options.categories);
  const { bulkUpdate, isPending } = useBulkUpdateQuestions();
  const [step, setStep] = useState<BulkDialogStep>(() =>
    needsBulkParams(operation) ? 'params' : 'preview',
  );
  const [params, setParams] = useState(EMPTY_BULK_PARAMS);
  const [confirmation, setConfirmation] = useState('');
  const request = toBulkRequest({ operation, params, query, selection });
  const {
    isError,
    isFetching,
    isPending: isPreviewPending,
    preview,
    retry,
  } = useGetBulkPreview(step === 'preview' ? request : null);
  const isConfirmed =
    preview !== undefined &&
    preview.affected > 0 &&
    (!isLargeChange(preview.affected) || confirmation.trim() === String(preview.affected));

  const apply = async (): Promise<void> => {
    if (preview === undefined) {
      return;
    }
    try {
      const result = await bulkUpdate({
        ...request,
        confirmLargeChange: isLargeChange(preview.affected),
      });
      notifySuccess(t('done', { count: result.affected }));
      onDone();
    } catch (error) {
      if (hasHttpStatus(error, HttpStatusEnum.CONFLICT)) {
        notifyError(t('errors.changedSincePreview'));
        setConfirmation('');
        retry();
        return;
      }
      notifyError(t('errors.applyFailed'));
    }
  };

  return (
    <Dialog
      aria-labelledby={titleId}
      fullWidth
      maxWidth="sm"
      onClose={isPending ? undefined : onClose}
      open
    >
      <DialogTitle id={titleId}>{t(`operations.${operation}`)}</DialogTitle>
      <DialogContent>
        {step === 'params' && (
          <BulkParamsStep
            categories={options.categories}
            onChange={setParams}
            operation={operation}
            params={params}
            tags={options.tags}
          />
        )}
        {step === 'preview' && isError && (
          <ErrorState isRetrying={isFetching} minHeight={STATE_MIN_HEIGHT} onRetry={retry} />
        )}
        {step === 'preview' && !isError && (isPreviewPending || preview === undefined) && (
          <LoadingState minHeight={STATE_MIN_HEIGHT} />
        )}
        {step === 'preview' && !isError && preview !== undefined && (
          <BulkPreviewStep
            changeDescription={describeChange(operation, params)}
            confirmation={confirmation}
            onConfirmationChange={setConfirmation}
            preview={preview}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button disabled={isPending} onClick={onClose} variant="text">
          {t('cancel')}
        </Button>
        {step === 'preview' && needsBulkParams(operation) && (
          <Button disabled={isPending} onClick={() => setStep('params')} variant="outlined">
            {t('back')}
          </Button>
        )}
        {step === 'params' ? (
          <Button
            disabled={!areBulkParamsComplete(operation, params)}
            onClick={() => setStep('preview')}
          >
            {t('next')}
          </Button>
        ) : (
          <Button
            disabled={!isConfirmed || isPending || isFetching}
            loading={isPending}
            onClick={() => void apply()}
          >
            {t(`operations.${operation}`)}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
