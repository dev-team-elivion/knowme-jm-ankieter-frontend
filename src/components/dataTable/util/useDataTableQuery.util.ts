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
  withoutParams,
  writeDataTableQuery,
} from '@/components/dataTable/util/dataTableSearchParams.util.ts';

type Options<SortKey extends string, Filters extends DataTableFilters> = {
  defaults: DataTableQuery<SortKey, Filters>;
  paramsResetOnChange?: readonly string[];
  searchParamPrefix?: string;
  sortKeys: readonly SortKey[];
};

const NO_RESET_PARAMS: readonly string[] = [];

export const useDataTableQuery = <SortKey extends string, Filters extends DataTableFilters>({
  defaults,
  paramsResetOnChange = NO_RESET_PARAMS,
  searchParamPrefix = '',
  sortKeys,
}: Options<SortKey, Filters>): DataTableController<SortKey, Filters> => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = useMemo(
    () => parseDataTableQuery(searchParams, { defaults, prefix: searchParamPrefix, sortKeys }),
    [defaults, searchParamPrefix, searchParams, sortKeys],
  );

  const updateQuery = useCallback(
    (next: DataTableQuery<SortKey, Filters>, resetsPosition = false) =>
      setSearchParams(
        current => {
          const written = writeDataTableQuery(current, next, {
            defaults,
            prefix: searchParamPrefix,
          });
          return resetsPosition ? withoutParams(written, paramsResetOnChange) : written;
        },
        { replace: true },
      ),
    [defaults, paramsResetOnChange, searchParamPrefix, setSearchParams],
  );

  return {
    clearFilters: () => updateQuery({ ...query, filters: defaults.filters, page: 0 }, true),
    hasActiveFilters: hasActiveFilters(query.filters, defaults.filters),
    query,
    setFilter: (key, value) =>
      updateQuery({ ...query, filters: { ...query.filters, [key]: value }, page: 0 }, true),
    setPage: page => updateQuery({ ...query, page }),
    setPageSize: pageSize => updateQuery({ ...query, page: 0, pageSize }),
    setSort: (sortBy, sortDirection) =>
      updateQuery({ ...query, page: 0, sortBy, sortDirection }, true),
    toggleSort: sortKey =>
      updateQuery(
        {
          ...query,
          page: 0,
          sortBy: sortKey,
          sortDirection: query.sortBy === sortKey && query.sortDirection === 'asc' ? 'desc' : 'asc',
        },
        true,
      ),
  };
};
