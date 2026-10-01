import { QuestionBankQuery } from '@/views/questionBank/model/QuestionBank.model.ts';
import { QuestionSortKeyEnum } from '@/views/questionBank/model/QuestionSortKey.enum.ts';

export const SUPPORTED_LOCALES = ['pl', 'uk', 'en'] as const;
export const QUESTION_LOCALE = 'pl';
export const TAG_ID_SEPARATOR = ',';

export const QUESTION_SORT_KEYS = Object.values(QuestionSortKeyEnum);

export const QUESTION_BANK_DEFAULTS: QuestionBankQuery = {
  filters: {
    author: '',
    categoryId: '',
    changedFrom: '',
    changedTo: '',
    forReview: '',
    positionCode: '',
    purpose: '',
    q: '',
    source: '',
    status: '',
    tagIds: '',
    type: '',
  },
  page: 0,
  pageSize: 25,
  sortBy: QuestionSortKeyEnum.UPDATED_AT,
  sortDirection: 'desc',
};
