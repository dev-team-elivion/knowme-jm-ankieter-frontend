import {
  QuestionCategoryEnum,
  QuestionSortKeyEnum,
  QuestionStatusEnum,
} from '@/views/devPatterns/model/Question.enum.ts';
import { QuestionTableQuery } from '@/views/devPatterns/model/Question.model.ts';

export const QUESTION_TABLE_DEFAULTS: QuestionTableQuery = {
  filters: { category: '', search: '', status: '' },
  page: 0,
  pageSize: 10,
  sortBy: QuestionSortKeyEnum.UPDATED_AT,
  sortDirection: 'desc',
};

export const QUESTION_SORT_KEYS = Object.values(QuestionSortKeyEnum);
export const QUESTION_CATEGORIES = Object.values(QuestionCategoryEnum);
export const QUESTION_STATUSES = Object.values(QuestionStatusEnum);
