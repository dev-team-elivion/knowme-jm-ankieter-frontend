import { DataTableQuery } from '@/components/dataTable/model/DataTable.model.ts';
import { QuestionSortKeyEnum } from '@/views/questionBank/model/QuestionSortKey.enum.ts';

export type QuestionBankFilters = {
  author: string;
  categoryId: string;
  changedFrom: string;
  changedTo: string;
  positionCode: string;
  purpose: string;
  q: string;
  source: string;
  status: string;
  tagIds: string;
  type: string;
};

export type QuestionBankQuery = DataTableQuery<QuestionSortKeyEnum, QuestionBankFilters>;
