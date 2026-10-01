import { useMemo } from 'react';

import {
  QuestionPurposeDto,
  QuestionSourceDto,
  QuestionTypeDto,
  TagDto,
  TranslationStatusDto,
  VersionStatusDto,
} from '@/api/generated';
import { FilterOption } from '@/components/dataTable/model/DataTable.model.ts';
import { useGetCategories } from '@/hooks/useGetCategories.util.ts';
import { useGetTags } from '@/hooks/useGetTags.util.ts';
import { formatLocaleName } from '@/utils/localeName.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { SUPPORTED_LOCALES } from '@/views/questionBank/model/questionBank.constants.ts';
import {
  REVIEW_FILTER_MARKED,
  REVIEW_FILTER_UNMARKED,
} from '@/views/questionBank/util/questionListParams.util.ts';

export type QuestionBankFilterOptions = {
  categories: FilterOption[];
  locales: FilterOption[];
  purposes: FilterOption[];
  reviewMarks: FilterOption[];
  sources: FilterOption[];
  statuses: FilterOption[];
  tags: TagDto[];
  translationStatuses: FilterOption[];
  types: FilterOption[];
};

export const useQuestionBankFilterOptions = (): QuestionBankFilterOptions => {
  const { i18n, t } = useTranslationWithPrefix('views.dictionaries');
  const { categories } = useGetCategories();
  const { tags } = useGetTags({ search: '' });
  const { t: tFilters } = useTranslationWithPrefix('views.questionBank.filters');

  return useMemo(
    () => ({
      categories: categories.map(category => ({ label: category.name, value: category.id })),
      locales: SUPPORTED_LOCALES.map(locale => ({
        label: formatLocaleName(locale, i18n.language),
        value: locale,
      })),
      purposes: Object.values(QuestionPurposeDto).map(value => ({
        label: t(`questionPurpose.${value}`),
        value,
      })),
      reviewMarks: [
        { label: tFilters('reviewMarked'), value: REVIEW_FILTER_MARKED },
        { label: tFilters('reviewUnmarked'), value: REVIEW_FILTER_UNMARKED },
      ],
      sources: Object.values(QuestionSourceDto).map(value => ({
        label: t(`questionSource.${value}`),
        value,
      })),
      statuses: Object.values(VersionStatusDto).map(value => ({
        label: t(`versionStatus.${value}`),
        value,
      })),
      tags,
      translationStatuses: Object.values(TranslationStatusDto).map(value => ({
        label: t(`translationStatus.${value}`),
        value,
      })),
      types: Object.values(QuestionTypeDto).map(value => ({
        label: t(`questionType.${value}`),
        value,
      })),
    }),
    [categories, i18n.language, t, tFilters, tags],
  );
};
