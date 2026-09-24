import { DataTablePage } from '@/components/dataTable/model/DataTable.model.ts';
import { QuestionRow, QuestionTableQuery } from '@/views/devPatterns/model/Question.model.ts';

const matchesValue = (filterValue: string, rowValue: string): boolean =>
  filterValue === '' || rowValue === filterValue;

const matchesFilters = (row: QuestionRow, { filters }: QuestionTableQuery): boolean => {
  const search = filters.search.toLocaleLowerCase('pl');
  const matchesSearch =
    search === '' ||
    row.content.toLocaleLowerCase('pl').includes(search) ||
    row.code.toLocaleLowerCase('pl').includes(search);
  return (
    matchesSearch &&
    matchesValue(filters.category, row.category) &&
    matchesValue(filters.status, row.status)
  );
};

export const queryQuestionFixture = (
  rows: readonly QuestionRow[],
  query: QuestionTableQuery,
): DataTablePage<QuestionRow> => {
  const direction = query.sortDirection === 'asc' ? 1 : -1;
  const filtered = rows.filter(row => matchesFilters(row, query));
  const sorted = [...filtered].sort(
    (left, right) =>
      direction * String(left[query.sortBy]).localeCompare(String(right[query.sortBy]), 'pl'),
  );
  const start = query.page * query.pageSize;

  return {
    items: sorted.slice(start, start + query.pageSize),
    totalElements: filtered.length,
  };
};
