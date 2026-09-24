import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  DataTableController,
  DataTableFilters,
  DataTableQuery,
} from '@/components/dataTable/model/DataTable.model.ts';
import {
  hasActiveFilters,
  parseDataTableQuery,
  writeDataTableQuery,
} from '@/components/dataTable/util/dataTableSearchParams.util.ts';

type Options<SortKey extends string, Filters extends DataTableFilters> = {
  defaults: DataTableQuery<SortKey, Filters>;
  searchParamPrefix?: string;
  sortKeys: readonly SortKey[];
};

export const useDataTableQuery = <SortKey extends string, Filters extends DataTableFilters>({
  defaults,
  searchParamPrefix = '',
  sortKeys,
}: Options<SortKey, Filters>): DataTableController<SortKey, Filters> => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = useMemo(
    () => parseDataTableQuery(searchParams, { defaults, prefix: searchParamPrefix, sortKeys }),
    [defaults, searchParamPrefix, searchParams, sortKeys],
  );

  const updateQuery = useCallback(
    (next: DataTableQuery<SortKey, Filters>) =>
      setSearchParams(
        current => writeDataTableQuery(current, next, { defaults, prefix: searchParamPrefix }),
        { replace: true },
      ),
    [defaults, searchParamPrefix, setSearchParams],
  );

  return {
    clearFilters: () => updateQuery({ ...query, filters: defaults.filters, page: 0 }),
    hasActiveFilters: hasActiveFilters(query.filters, defaults.filters),
    query,
    setFilter: (key, value) =>
      updateQuery({ ...query, filters: { ...query.filters, [key]: value }, page: 0 }),
    setPage: page => updateQuery({ ...query, page }),
    setPageSize: pageSize => updateQuery({ ...query, page: 0, pageSize }),
    toggleSort: sortKey =>
      updateQuery({
        ...query,
        page: 0,
        sortBy: sortKey,
        sortDirection: query.sortBy === sortKey && query.sortDirection === 'asc' ? 'desc' : 'asc',
      }),
  };
};
