import {
  DataTableFilters,
  DataTableQuery,
  SortDirection,
} from '@/components/dataTable/model/DataTable.model.ts';

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

const PARAM = {
  page: 'page',
  size: 'size',
  sort: 'sort',
} as const;

type ParseOptions<SortKey extends string, Filters extends DataTableFilters> = {
  defaults: DataTableQuery<SortKey, Filters>;
  prefix: string;
  sortKeys: readonly SortKey[];
};

const isSortDirection = (value: string | undefined): value is SortDirection =>
  value === 'asc' || value === 'desc';

const parsePage = (raw: null | string): null | number => {
  const parsed = Number(raw);
  return raw !== null && Number.isInteger(parsed) && parsed >= 1 ? parsed - 1 : null;
};

const parsePageSize = (raw: null | string): null | number => {
  const parsed = Number(raw);
  return PAGE_SIZE_OPTIONS.find(option => option === parsed) ?? null;
};

export const parseDataTableQuery = <SortKey extends string, Filters extends DataTableFilters>(
  params: URLSearchParams,
  { defaults, prefix, sortKeys }: ParseOptions<SortKey, Filters>,
): DataTableQuery<SortKey, Filters> => {
  const [rawSortBy, rawDirection] = (params.get(`${prefix}${PARAM.sort}`) ?? '').split(',');
  const sortBy = sortKeys.find(key => key === rawSortBy);
  const filters = Object.keys(defaults.filters).reduce<Filters>((accumulator, key) => {
    const value = params.get(`${prefix}${key}`);
    return value === null ? accumulator : { ...accumulator, [key]: value };
  }, defaults.filters);

  return {
    filters,
    page: parsePage(params.get(`${prefix}${PARAM.page}`)) ?? defaults.page,
    pageSize: parsePageSize(params.get(`${prefix}${PARAM.size}`)) ?? defaults.pageSize,
    sortBy: sortBy ?? defaults.sortBy,
    sortDirection: sortBy && isSortDirection(rawDirection) ? rawDirection : defaults.sortDirection,
  };
};

const isDefaultFilterValue = (
  defaultFilters: DataTableFilters,
  key: string,
  value: string,
): boolean => new Map(Object.entries(defaultFilters)).get(key) === value;

export const hasActiveFilters = (filters: DataTableFilters, defaults: DataTableFilters): boolean =>
  Object.entries(filters).some(([key, value]) => !isDefaultFilterValue(defaults, key, value));

export const writeDataTableQuery = <SortKey extends string, Filters extends DataTableFilters>(
  current: URLSearchParams,
  query: DataTableQuery<SortKey, Filters>,
  { defaults, prefix }: Omit<ParseOptions<SortKey, Filters>, 'sortKeys'>,
): URLSearchParams => {
  const isDefaultSort =
    query.sortBy === defaults.sortBy && query.sortDirection === defaults.sortDirection;
  const entries: [string, null | string][] = [
    [PARAM.page, query.page === defaults.page ? null : String(query.page + 1)],
    [PARAM.size, query.pageSize === defaults.pageSize ? null : String(query.pageSize)],
    [PARAM.sort, isDefaultSort ? null : `${query.sortBy},${query.sortDirection}`],
    ...Object.entries(query.filters).map(([key, value]): [string, null | string] => [
      key,
      isDefaultFilterValue(defaults.filters, key, value) ? null : value,
    ]),
  ];

  return entries.reduce((params, [key, value]) => {
    const next = new URLSearchParams(params);
    if (value === null) {
      next.delete(`${prefix}${key}`);
    } else {
      next.set(`${prefix}${key}`, value);
    }
    return next;
  }, new URLSearchParams(current));
};
