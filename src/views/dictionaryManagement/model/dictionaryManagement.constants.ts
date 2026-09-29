import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import {
  CategorySortKeyEnum,
  DictionarySectionEnum,
  DictionaryStatusFilterEnum,
  ProcedureNameSortKeyEnum,
  TagSortKeyEnum,
} from '@/views/dictionaryManagement/model/DictionaryManagement.enum.ts';
import {
  CategoryTableQuery,
  ProcedureNameTableQuery,
  TagTableQuery,
} from '@/views/dictionaryManagement/model/DictionaryManagement.model.ts';

export const SECTION_PARAM = 'section';
export const DICTIONARY_SECTIONS = Object.values(DictionarySectionEnum);
export const DICTIONARY_STATUS_FILTERS = Object.values(DictionaryStatusFilterEnum);

export const CATEGORY_NAME_MAX_LENGTH = 120;
export const CATEGORY_PREFIX_MAX_LENGTH = 16;
export const TAG_LABEL_MAX_LENGTH = 120;
export const TAG_SUGGESTION_MIN_LENGTH = 2;

export const CATEGORY_DICTIONARY_QUERY_KEY = [
  QueryKeyEnum.LIST_CATEGORIES,
  { activeOnly: false },
] as const;

export const CATEGORY_TABLE_PREFIX = 'category_';
export const CATEGORY_SORT_KEYS = Object.values(CategorySortKeyEnum);
export const CATEGORY_TABLE_DEFAULTS: CategoryTableQuery = {
  filters: {},
  page: 0,
  pageSize: 25,
  sortBy: CategorySortKeyEnum.DISPLAY_ORDER,
  sortDirection: 'asc',
};

export const TAG_TABLE_PREFIX = 'tag_';
export const TAG_SORT_KEYS = Object.values(TagSortKeyEnum);
export const TAG_TABLE_DEFAULTS: TagTableQuery = {
  filters: { q: '', status: '' },
  page: 0,
  pageSize: 25,
  sortBy: TagSortKeyEnum.QUESTION_COUNT,
  sortDirection: 'desc',
};

export const PROCEDURE_NAME_TABLE_PREFIX = 'procedure_';
export const PROCEDURE_NAME_SORT_KEYS = Object.values(ProcedureNameSortKeyEnum);
export const PROCEDURE_NAME_TABLE_DEFAULTS: ProcedureNameTableQuery = {
  filters: { q: '' },
  page: 0,
  pageSize: 25,
  sortBy: ProcedureNameSortKeyEnum.USAGE,
  sortDirection: 'desc',
};
