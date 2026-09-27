import { useMemo } from 'react';

import { DataTableController, FilterOption } from '@/components/dataTable/model/DataTable.model.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { QUESTION_BANK_DEFAULTS } from '@/views/questionBank/model/questionBank.constants.ts';
import { QuestionBankFilters } from '@/views/questionBank/model/QuestionBank.model.ts';
import { QuestionSortKeyEnum } from '@/views/questionBank/model/QuestionSortKey.enum.ts';
import { joinTagIds, splitTagIds } from '@/views/questionBank/util/questionListParams.util.ts';
import { QuestionBankFilterOptions } from '@/views/questionBank/util/useQuestionBankFilterOptions.util.ts';

export type ActiveFilterChip = {
  id: string;
  label: string;
  onRemove: () => void;
};

type ChipSource = {
  key: Exclude<keyof QuestionBankFilters, 'locale' | 'tagIds'>;
  label: string;
  options?: FilterOption[];
};

const findLabel = (options: FilterOption[] | undefined, value: string): string =>
  options?.find(option => option.value === value)?.label ?? value;

export const useActiveFilterChips = (
  controller: DataTableController<QuestionSortKeyEnum, QuestionBankFilters>,
  options: QuestionBankFilterOptions,
): ActiveFilterChip[] => {
  const { t } = useTranslationWithPrefix('views.questionBank.filters');
  const { filters } = controller.query;
  const { setFilter } = controller;

  return useMemo(() => {
    const sources: ChipSource[] = [
      { key: 'q', label: t('search') },
      { key: 'categoryId', label: t('category'), options: options.categories },
      { key: 'type', label: t('type'), options: options.types },
      { key: 'purpose', label: t('purpose'), options: options.purposes },
      { key: 'status', label: t('status'), options: options.statuses },
      { key: 'source', label: t('source'), options: options.sources },
      {
        key: 'translationStatus',
        label: t('translationStatus'),
        options: options.translationStatuses,
      },
      { key: 'positionCode', label: t('positionCode') },
      { key: 'author', label: t('author') },
      { key: 'changedFrom', label: t('changedFrom') },
      { key: 'changedTo', label: t('changedTo') },
    ];
    const valueOf = new Map(Object.entries(filters));
    const defaultOf = new Map(Object.entries(QUESTION_BANK_DEFAULTS.filters));

    const fieldChips = sources.flatMap(({ key, label, options: sourceOptions }) => {
      const value = valueOf.get(key) ?? '';
      return value === '' || value === defaultOf.get(key)
        ? []
        : [
            {
              id: key,
              label: `${label}: ${findLabel(sourceOptions, value)}`,
              onRemove: () => setFilter(key, defaultOf.get(key) ?? ''),
            },
          ];
    });

    const tagIds = splitTagIds(filters.tagIds);
    const tagChips = tagIds.map(tagId => ({
      id: `tag:${tagId}`,
      label: `${t('tags')}: ${options.tags.find(tag => tag.id === tagId)?.label ?? tagId}`,
      onRemove: () =>
        setFilter('tagIds', joinTagIds(tagIds.filter(candidate => candidate !== tagId))),
    }));

    return [...fieldChips, ...tagChips];
  }, [filters, options, setFilter, t]);
};
