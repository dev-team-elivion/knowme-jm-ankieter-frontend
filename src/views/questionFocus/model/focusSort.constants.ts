import { SortDirection } from '@/components/dataTable/model/DataTable.model.ts';
import { QuestionSortKeyEnum } from '@/views/questionBank/model/QuestionSortKey.enum.ts';

export type FocusSortOption = {
  sortBy: QuestionSortKeyEnum;
  sortDirection: SortDirection;
};

export const FOCUS_SORT_OPTIONS: FocusSortOption[] = [
  { sortBy: QuestionSortKeyEnum.UPDATED_AT, sortDirection: 'desc' },
  { sortBy: QuestionSortKeyEnum.UPDATED_AT, sortDirection: 'asc' },
  { sortBy: QuestionSortKeyEnum.BUSINESS_KEY, sortDirection: 'asc' },
  { sortBy: QuestionSortKeyEnum.BUSINESS_KEY, sortDirection: 'desc' },
  { sortBy: QuestionSortKeyEnum.VERSION_NO, sortDirection: 'desc' },
  { sortBy: QuestionSortKeyEnum.VERSION_NO, sortDirection: 'asc' },
];

export const toSortValue = ({ sortBy, sortDirection }: FocusSortOption): string =>
  `${sortBy},${sortDirection}`;
