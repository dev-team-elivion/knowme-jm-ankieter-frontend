import { useMemo } from 'react';
import { object, ObjectSchema, string } from 'yup';

import { CategoryDto } from '@/api/generated';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import {
  CATEGORY_NAME_MAX_LENGTH,
  CATEGORY_PREFIX_MAX_LENGTH,
} from '@/views/dictionaryManagement/model/dictionaryManagement.constants.ts';
import { CategoryFormModel } from '@/views/dictionaryManagement/model/DictionaryManagement.model.ts';
import { normalizeDictionaryText } from '@/views/dictionaryManagement/util/dictionaryTable.util.ts';

type Options = {
  categories: CategoryDto[];
  editedCategoryId: null | string;
};

const isTaken = (
  others: CategoryDto[],
  pick: (category: CategoryDto) => string,
  value: string | undefined,
): boolean =>
  value !== undefined &&
  others.some(
    category => normalizeDictionaryText(pick(category)) === normalizeDictionaryText(value),
  );

export const useCategoryFormValidation = ({
  categories,
  editedCategoryId,
}: Options): ObjectSchema<CategoryFormModel> => {
  const { t } = useTranslationWithPrefix('validation');

  return useMemo(() => {
    const others = categories.filter(category => category.id !== editedCategoryId);
    return object({
      codePrefix: string()
        .trim()
        .required(t('required'))
        .max(CATEGORY_PREFIX_MAX_LENGTH, t('maxLength', { max: CATEGORY_PREFIX_MAX_LENGTH }))
        .test(
          'prefix-unique',
          t('categoryPrefixTaken'),
          value => !isTaken(others, category => category.codePrefix, value),
        ),
      name: string()
        .trim()
        .required(t('required'))
        .max(CATEGORY_NAME_MAX_LENGTH, t('maxLength', { max: CATEGORY_NAME_MAX_LENGTH }))
        .test(
          'name-unique',
          t('categoryNameTaken'),
          value => !isTaken(others, category => category.name, value),
        ),
    });
  }, [categories, editedCategoryId, t]);
};
