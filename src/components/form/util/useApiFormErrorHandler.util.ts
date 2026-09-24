import { useCallback } from 'react';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

import { applyApiFieldErrors } from '@/components/form/util/applyApiFieldErrors.util.ts';
import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Return = (error: unknown) => void;

export const useApiFormErrorHandler = <TFieldValues extends FieldValues>(
  setError: UseFormSetError<TFieldValues>,
  fields: readonly Path<TFieldValues>[],
): Return => {
  const { notifyError } = useNotifications();
  const { t } = useTranslationWithPrefix('components.form');

  return useCallback(
    (error: unknown) => {
      const result = applyApiFieldErrors(error, setError, fields);
      const hasMappedFields = result !== null && result.mappedFields.length > 0;
      notifyError(hasMappedFields ? t('serverRejected') : t('unexpectedError'));
    },
    [fields, notifyError, setError, t],
  );
};
