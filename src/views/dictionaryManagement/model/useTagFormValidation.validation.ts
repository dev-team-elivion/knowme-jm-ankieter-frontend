import { useMemo } from 'react';
import { object, ObjectSchema, string } from 'yup';

import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { TAG_LABEL_MAX_LENGTH } from '@/views/dictionaryManagement/model/dictionaryManagement.constants.ts';
import { TagFormModel } from '@/views/dictionaryManagement/model/DictionaryManagement.model.ts';

export const useTagFormValidation = (): ObjectSchema<TagFormModel> => {
  const { t } = useTranslationWithPrefix('validation');

  return useMemo(
    () =>
      object({
        label: string()
          .trim()
          .required(t('required'))
          .max(TAG_LABEL_MAX_LENGTH, t('maxLength', { max: TAG_LABEL_MAX_LENGTH })),
      }),
    [t],
  );
};
