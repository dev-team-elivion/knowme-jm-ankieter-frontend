import { TagDto } from '@/api/generated';
import { DataTablePage, SortDirection } from '@/components/dataTable/model/DataTable.model.ts';
import {
  DictionaryStatusFilterEnum,
  TagSortKeyEnum,
} from '@/views/dictionaryManagement/model/DictionaryManagement.enum.ts';

const COLLATOR = new Intl.Collator('pl', { sensitivity: 'base' });

type ActiveFlag = {
  active: boolean;
};

export const toClientPage = <Row>(
  rows: Row[],
  page: number,
  pageSize: number,
): DataTablePage<Row> => ({
  items: rows.slice(page * pageSize, (page + 1) * pageSize),
  totalElements: rows.length,
});

const ACTIVE_BY_STATUS_FILTER = new Map<string, boolean>([
  [DictionaryStatusFilterEnum.ACTIVE, true],
  [DictionaryStatusFilterEnum.INACTIVE, false],
]);

export const matchesStatusFilter = ({ active }: ActiveFlag, status: string): boolean => {
  const expected = ACTIVE_BY_STATUS_FILTER.get(status);
  return expected === undefined || expected === active;
};

const compareTags = (left: TagDto, right: TagDto, sortBy: TagSortKeyEnum): number =>
  sortBy === TagSortKeyEnum.QUESTION_COUNT
    ? left.questionCount - right.questionCount || COLLATOR.compare(left.label, right.label)
    : COLLATOR.compare(left.label, right.label);

export const sortTags = (
  tags: TagDto[],
  sortBy: TagSortKeyEnum,
  direction: SortDirection,
): TagDto[] => {
  const sign = direction === 'asc' ? 1 : -1;
  return [...tags].sort((left, right) => sign * compareTags(left, right, sortBy));
};

export const normalizeDictionaryText = (value: string): string =>
  value.trim().replace(/\s+/g, ' ').toLocaleLowerCase('pl');
