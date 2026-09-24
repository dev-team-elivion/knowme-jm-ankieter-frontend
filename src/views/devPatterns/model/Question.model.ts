import { DataTableQuery } from '@/components/dataTable/model/DataTable.model.ts';
import {
  QuestionCategoryEnum,
  QuestionSortKeyEnum,
  QuestionStatusEnum,
} from '@/views/devPatterns/model/Question.enum.ts';

export type QuestionFilters = {
  category: string;
  search: string;
  status: string;
};

export type QuestionFormModel = {
  authorEmail: string;
  category: string;
  content: string;
};

export type QuestionRow = {
  category: QuestionCategoryEnum;
  code: string;
  content: string;
  id: number;
  status: QuestionStatusEnum;
  updatedAt: string;
};

export type QuestionTableQuery = DataTableQuery<QuestionSortKeyEnum, QuestionFilters>;
