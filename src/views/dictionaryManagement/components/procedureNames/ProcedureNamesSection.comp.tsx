import { Stack } from '@mui/material';
import { JSX, useMemo } from 'react';

import { DataTable } from '@/components/dataTable/DataTable.comp.tsx';
import { DataTableSearchField } from '@/components/dataTable/DataTableSearchField.comp.tsx';
import { DataTableToolbar } from '@/components/dataTable/DataTableToolbar.comp.tsx';
import { DataTableColumn, DataTableSource } from '@/components/dataTable/model/DataTable.model.ts';
import { useDataTableQuery } from '@/components/dataTable/util/useDataTableQuery.util.ts';
import { EmptyState } from '@/components/state/EmptyState.comp.tsx';
import { InfoCallout } from '@/components/state/InfoCallout.comp.tsx';
import { useGetProcedureNames } from '@/hooks/useGetProcedureNames.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import {
  PROCEDURE_NAME_SORT_KEYS,
  PROCEDURE_NAME_TABLE_DEFAULTS,
  PROCEDURE_NAME_TABLE_PREFIX,
} from '@/views/dictionaryManagement/model/dictionaryManagement.constants.ts';
import { ProcedureNameSortKeyEnum } from '@/views/dictionaryManagement/model/DictionaryManagement.enum.ts';
import { toClientPage } from '@/views/dictionaryManagement/util/dictionaryTable.util.ts';

export const ProcedureNamesSection = (): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.dictionaryManagement.procedureNames');
  const controller = useDataTableQuery({
    defaults: PROCEDURE_NAME_TABLE_DEFAULTS,
    searchParamPrefix: PROCEDURE_NAME_TABLE_PREFIX,
    sortKeys: PROCEDURE_NAME_SORT_KEYS,
  });
  const { filters, page, pageSize } = controller.query;
  const { isError, isFetching, isLoading, procedureNames, retry } = useGetProcedureNames({
    enabled: true,
    search: filters.q,
  });

  const columns = useMemo<DataTableColumn<string, ProcedureNameSortKeyEnum>[]>(
    () => [{ id: 'name', label: t('columns.name'), render: name => name }],
    [t],
  );
  const source: DataTableSource<string> = {
    data: isLoading || isError ? undefined : toClientPage(procedureNames, page, pageSize),
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
        emptyState={<EmptyState description={t('empty.description')} title={t('empty.title')} />}
        getRowKey={name => name}
        source={source}
        toolbar={
          <DataTableToolbar>
            <DataTableSearchField
              label={t('search')}
              onChange={value => controller.setFilter('q', value)}
              value={filters.q}
            />
          </DataTableToolbar>
        }
      />
    </Stack>
  );
};
