import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button, Stack } from '@mui/material';
import { JSX, useMemo, useState } from 'react';

import { TagDto } from '@/api/generated';
import { DataTable } from '@/components/dataTable/DataTable.comp.tsx';
import { DataTableFilterSelect } from '@/components/dataTable/DataTableFilterSelect.comp.tsx';
import { DataTableSearchField } from '@/components/dataTable/DataTableSearchField.comp.tsx';
import { DataTableToolbar } from '@/components/dataTable/DataTableToolbar.comp.tsx';
import { DataTableSource } from '@/components/dataTable/model/DataTable.model.ts';
import { useDataTableQuery } from '@/components/dataTable/util/useDataTableQuery.util.ts';
import { EmptyState } from '@/components/state/EmptyState.comp.tsx';
import { InfoCallout } from '@/components/state/InfoCallout.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { TagFormDialog } from '@/views/dictionaryManagement/components/tags/TagFormDialog.comp.tsx';
import { TagMergeDialog } from '@/views/dictionaryManagement/components/tags/TagMergeDialog.comp.tsx';
import { TagRowActionHandlers } from '@/views/dictionaryManagement/components/tags/TagRowActions.comp.tsx';
import {
  DICTIONARY_STATUS_FILTERS,
  TAG_SORT_KEYS,
  TAG_TABLE_DEFAULTS,
  TAG_TABLE_PREFIX,
} from '@/views/dictionaryManagement/model/dictionaryManagement.constants.ts';
import {
  matchesStatusFilter,
  sortTags,
  toClientPage,
} from '@/views/dictionaryManagement/util/dictionaryTable.util.ts';
import { useGetTagDictionary } from '@/views/dictionaryManagement/util/useGetTagDictionary.util.ts';
import { useTagColumns } from '@/views/dictionaryManagement/util/useTagColumns.util.tsx';

export const TagsSection = (): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.dictionaryManagement.tags');
  const [isCreating, setIsCreating] = useState(false);
  const [mergeSource, setMergeSource] = useState<null | TagDto>(null);
  const controller = useDataTableQuery({
    defaults: TAG_TABLE_DEFAULTS,
    searchParamPrefix: TAG_TABLE_PREFIX,
    sortKeys: TAG_SORT_KEYS,
  });
  const { filters, page, pageSize, sortBy, sortDirection } = controller.query;
  const { isError, isFetching, isLoading, retry, tags } = useGetTagDictionary({
    search: filters.q,
  });

  const handlers = useMemo<TagRowActionHandlers>(() => ({ onMerge: setMergeSource }), []);
  const columns = useTagColumns(handlers);
  const statusOptions = useMemo(
    () =>
      DICTIONARY_STATUS_FILTERS.map(value => ({
        label: t(`statusFilter.options.${value}`),
        value,
      })),
    [t],
  );

  const visibleTags =
    tags &&
    sortTags(
      tags.filter(tag => matchesStatusFilter(tag, filters.status)),
      sortBy,
      sortDirection,
    );
  const source: DataTableSource<TagDto> = {
    data: visibleTags && toClientPage(visibleTags, page, pageSize),
    isError,
    isFetching,
    isLoading,
    retry,
  };

  return (
    <Stack spacing={2}>
      <InfoCallout>{t('notice')}</InfoCallout>
      <DataTable
        ariaLabel={t('tableLabel')}
        columns={columns}
        controller={controller}
        emptyState={
          <EmptyState
            action={{ label: t('add'), onClick: () => setIsCreating(true) }}
            description={t('empty.description')}
            title={t('empty.title')}
          />
        }
        getRowKey={row => row.id}
        source={source}
        toolbar={
          <DataTableToolbar
            actions={
              <Button onClick={() => setIsCreating(true)} startIcon={<AddRoundedIcon />}>
                {t('add')}
              </Button>
            }
          >
            <DataTableSearchField
              label={t('search')}
              onChange={value => controller.setFilter('q', value)}
              value={filters.q}
            />
            <DataTableFilterSelect
              allLabel={t('statusFilter.all')}
              label={t('statusFilter.label')}
              onChange={value => controller.setFilter('status', value)}
              options={statusOptions}
              value={filters.status}
            />
          </DataTableToolbar>
        }
      />
      {isCreating && <TagFormDialog onClose={() => setIsCreating(false)} />}
      {mergeSource && <TagMergeDialog onClose={() => setMergeSource(null)} source={mergeSource} />}
    </Stack>
  );
};
