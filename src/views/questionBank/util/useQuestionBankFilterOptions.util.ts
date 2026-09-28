import { useMemo } from 'react';

import {
  QuestionPurposeDto,
  QuestionSourceDto,
  QuestionTypeDto,
  TagDto,
  VersionStatusDto,
} from '@/api/generated';
import { FilterOption } from '@/components/dataTable/model/DataTable.model.ts';
import { useGetCategories } from '@/hooks/useGetCategories.util.ts';
import { useGetTags } from '@/hooks/useGetTags.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

export type QuestionBankFilterOptions = {
  categories: FilterOption[];
  purposes: FilterOption[];
  sources: FilterOption[];
  statuses: FilterOption[];
  tags: TagDto[];
  types: FilterOption[];
};

export const useQuestionBankFilterOptions = (): QuestionBankFilterOptions => {
  const { t } = useTranslationWithPrefix('views.dictionaries');
  const { categories } = useGetCategories();
  const { tags } = useGetTags({ search: '' });

  return useMemo(
    () => ({
      categories: categories.map(category => ({ label: category.name, value: category.id })),
      purposes: Object.values(QuestionPurposeDto).map(value => ({
        label: t(`questionPurpose.${value}`),
        value,
      })),
      sources: Object.values(QuestionSourceDto).map(value => ({
        label: t(`questionSource.${value}`),
        value,
      })),
      statuses: Object.values(VersionStatusDto).map(value => ({
        label: t(`versionStatus.${value}`),
        value,
      })),
      tags,
      types: Object.values(QuestionTypeDto).map(value => ({
        label: t(`questionType.${value}`),
        value,
      })),
    }),
    [categories, t, tags],
  );
};
