import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { hasHttpStatus } from '@/api/guards/isAxiosError.guard.ts';
import { HttpStatusEnum } from '@/api/model/HttpStatus.enum.ts';
import { ApiViolationResolver } from '@/components/form/util/applyApiFieldErrors.util.ts';
import { useApiFormErrorHandler } from '@/components/form/util/useApiFormErrorHandler.util.ts';
import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QuestionFormModel } from '@/views/questionForm/model/QuestionForm.model.ts';
import { matchQuestionViolation } from '@/views/questionForm/util/questionViolationRules.util.ts';

type Form = Pick<UseFormReturn<QuestionFormModel>, 'getValues' | 'setError'>;

type Return = (error: unknown) => void;

export const useQuestionSaveErrorHandler = ({ getValues, setError }: Form): Return => {
  const { notifyError } = useNotifications();
  const { t } = useTranslationWithPrefix('views.questionForm');

  const resolveViolation = useCallback<ApiViolationResolver<QuestionFormModel>>(
    violation => {
      const match = matchQuestionViolation(violation.field);
      return match && { field: match.field, message: t(`serverErrors.${match.messageKey}`) };
    },
    [t],
  );
  const handleFieldErrors = useApiFormErrorHandler(setError, resolveViolation);

  return useCallback(
    (error: unknown) => {
      if (hasHttpStatus(error, HttpStatusEnum.CONFLICT) && getValues('hasManualKey')) {
        setError(
          'businessKey',
          { message: t('errors.keyTaken'), type: 'server' },
          { shouldFocus: true },
        );
        notifyError(t('errors.keyTaken'));
        return;
      }
      if (hasHttpStatus(error, HttpStatusEnum.CONFLICT)) {
        notifyError(t('errors.conflict'));
        return;
      }
      if (hasHttpStatus(error, HttpStatusEnum.FORBIDDEN)) {
        notifyError(t('errors.forbidden'));
        return;
      }
      if (hasHttpStatus(error, HttpStatusEnum.NOT_FOUND)) {
        notifyError(t('errors.notFound'));
        return;
      }
      handleFieldErrors(error);
    },
    [getValues, handleFieldErrors, notifyError, setError, t],
  );
};
