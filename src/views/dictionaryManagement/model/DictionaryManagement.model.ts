import { DataTableQuery } from '@/components/dataTable/model/DataTable.model.ts';
import {
  CategorySortKeyEnum,
  ProcedureNameSortKeyEnum,
  TagSortKeyEnum,
} from '@/views/dictionaryManagement/model/DictionaryManagement.enum.ts';

export type CategoryFormModel = {
  codePrefix: string;
  name: string;
};

export type CategoryTableQuery = DataTableQuery<CategorySortKeyEnum, Record<string, never>>;

export type MoveDirection = -1 | 1;

export type ProcedureNameTableFilters = {
  q: string;
};

export type ProcedureNameTableQuery = DataTableQuery<
  ProcedureNameSortKeyEnum,
  ProcedureNameTableFilters
>;

export type TagFormModel = {
  label: string;
};

export type TagTableFilters = {
  q: string;
  status: string;
};

export type TagTableQuery = DataTableQuery<TagSortKeyEnum, TagTableFilters>;
