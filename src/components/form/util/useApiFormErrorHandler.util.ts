import { useCallback } from 'react';
import { FieldValues, UseFormSetError } from 'react-hook-form';

import {
  ApiViolationResolver,
  applyApiFieldErrors,
} from '@/components/form/util/applyApiFieldErrors.util.ts';
import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Return = (error: unknown) => void;

export const useApiFormErrorHandler = <TFieldValues extends FieldValues>(
  setError: UseFormSetError<TFieldValues>,
  resolveViolation: ApiViolationResolver<TFieldValues>,
): Return => {
  const { notifyError } = useNotifications();
  const { t } = useTranslationWithPrefix('components.form');

  return useCallback(
    (error: unknown) => {
      const result = applyApiFieldErrors(error, setError, resolveViolation);
      const hasMappedFields = result !== null && result.mappedFields.length > 0;
      notifyError(hasMappedFields ? t('serverRejected') : t('unexpectedError'));
    },
    [notifyError, resolveViolation, setError, t],
  );
};
