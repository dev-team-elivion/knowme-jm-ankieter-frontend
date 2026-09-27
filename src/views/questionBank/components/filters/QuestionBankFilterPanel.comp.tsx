import { Box } from '@mui/material';
import { JSX } from 'react';

import { DataTableFilterSelect } from '@/components/dataTable/DataTableFilterSelect.comp.tsx';
import { DataTableController } from '@/components/dataTable/model/DataTable.model.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { DateFilterField } from '@/views/questionBank/components/filters/DateFilterField.comp.tsx';
import { FilterField } from '@/views/questionBank/components/filters/FilterField.comp.tsx';
import { TagsFilterField } from '@/views/questionBank/components/filters/TagsFilterField.comp.tsx';
import { TextFilterField } from '@/views/questionBank/components/filters/TextFilterField.comp.tsx';
import { QuestionBankFilters } from '@/views/questionBank/model/QuestionBank.model.ts';
import { QuestionSortKeyEnum } from '@/views/questionBank/model/QuestionSortKey.enum.ts';
import { joinTagIds, splitTagIds } from '@/views/questionBank/util/questionListParams.util.ts';
import { QuestionBankFilterOptions } from '@/views/questionBank/util/useQuestionBankFilterOptions.util.ts';

type Props = {
  controller: DataTableController<QuestionSortKeyEnum, QuestionBankFilters>;
  options: QuestionBankFilterOptions;
};

type SelectFilterKey = keyof Pick<
  QuestionBankFilters,
  'categoryId' | 'purpose' | 'source' | 'status' | 'translationStatus' | 'type'
>;

export const QuestionBankFilterPanel = ({ controller, options }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.questionBank.filters');
  const { filters } = controller.query;

  const selectFilters: { key: SelectFilterKey; label: string; options: typeof options.types }[] = [
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
  ];

  return (
    <Box
      sx={{
        alignItems: 'flex-end',
        columnGap: 2,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        pt: 2,
        rowGap: 2,
      }}
    >
      {selectFilters.map(filter => (
        <FilterField key={filter.key} label={filter.label}>
          <DataTableFilterSelect
            allLabel={t('all')}
            label={filter.label}
            onChange={value => controller.setFilter(filter.key, value)}
            options={filter.options}
            value={filters[filter.key]}
          />
        </FilterField>
      ))}
      <FilterField label={t('positionCode')}>
        <TextFilterField
          label={t('positionCode')}
          onChange={value => controller.setFilter('positionCode', value)}
          value={filters.positionCode}
        />
      </FilterField>
      <FilterField label={t('author')}>
        <TextFilterField
          label={t('author')}
          onChange={value => controller.setFilter('author', value)}
          value={filters.author}
        />
      </FilterField>
      <FilterField label={t('changedFrom')}>
        <DateFilterField
          maxDate={filters.changedTo}
          onChange={value => controller.setFilter('changedFrom', value)}
          value={filters.changedFrom}
        />
      </FilterField>
      <FilterField label={t('changedTo')}>
        <DateFilterField
          minDate={filters.changedFrom}
          onChange={value => controller.setFilter('changedTo', value)}
          value={filters.changedTo}
        />
      </FilterField>
      <Box sx={{ gridColumn: '1 / -1' }}>
        <FilterField label={t('tags')}>
          <TagsFilterField
            onChange={tagIds => controller.setFilter('tagIds', joinTagIds(tagIds))}
            options={options.tags}
            selectedIds={splitTagIds(filters.tagIds)}
          />
        </FilterField>
      </Box>
    </Box>
  );
};
