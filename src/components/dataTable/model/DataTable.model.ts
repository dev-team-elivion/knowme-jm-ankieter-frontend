import { ReactNode } from 'react';

export type DataTableColumn<Row, SortKey extends string> = {
  align?: 'center' | 'left' | 'right';
  id: string;
  label: string;
  render: (row: Row) => ReactNode;
  sortKey?: SortKey;
  width?: number | string;
};

export type DataTableController<SortKey extends string, Filters extends DataTableFilters> = {
  clearFilters: () => void;
  hasActiveFilters: boolean;
  query: DataTableQuery<SortKey, Filters>;
  setFilter: (key: keyof Filters & string, value: string) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSort: (sortBy: SortKey, sortDirection: SortDirection) => void;
  toggleSort: (sortKey: SortKey) => void;
};

export type DataTableFilters = Record<string, string>;

export type DataTablePage<Row> = {
  items: Row[];
  totalElements: number;
};

export type DataTableQuery<SortKey extends string, Filters extends DataTableFilters> = {
  filters: Filters;
  page: number;
  pageSize: number;
  sortBy: SortKey;
  sortDirection: SortDirection;
};

export type DataTableSource<Row> = {
  data: DataTablePage<Row> | undefined;
  isError: boolean;
  isFetching: boolean;
  isLoading: boolean;
  retry: () => void;
};

export type FilterOption = {
  label: string;
  value: string;
};

export type SortDirection = 'asc' | 'desc';
