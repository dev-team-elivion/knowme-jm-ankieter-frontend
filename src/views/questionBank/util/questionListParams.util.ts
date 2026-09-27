import {
  QuestionPurposeDto,
  QuestionSourceDto,
  QuestionTypeDto,
  TranslationStatusDto,
  VersionStatusDto,
} from '@/api/generated';
import { TAG_ID_SEPARATOR } from '@/views/questionBank/model/questionBank.constants.ts';
import { QuestionBankQuery } from '@/views/questionBank/model/QuestionBank.model.ts';

export type QuestionListParams = {
  author?: string;
  categoryId?: string;
  changedFrom?: string;
  changedTo?: string;
  locale: string;
  page: number;
  positionCode?: string;
  purpose?: QuestionPurposeDto;
  q?: string;
  size: number;
  sort: string;
  source?: QuestionSourceDto;
  status?: VersionStatusDto;
  tagId?: string[];
  translationStatus?: TranslationStatusDto;
  type?: QuestionTypeDto;
};

const pickEnum = <T extends string>(values: readonly T[], raw: string): T | undefined =>
  values.find(value => value === raw);

const toOptional = (value: string): string | undefined => value.trim() || undefined;

export const splitTagIds = (raw: string): string[] => raw.split(TAG_ID_SEPARATOR).filter(Boolean);

export const joinTagIds = (tagIds: string[]): string => tagIds.join(TAG_ID_SEPARATOR);

export const toQuestionListParams = ({
  filters,
  page,
  pageSize,
  sortBy,
  sortDirection,
}: QuestionBankQuery): QuestionListParams => {
  const tagIds = splitTagIds(filters.tagIds);

  return {
    author: toOptional(filters.author),
    categoryId: toOptional(filters.categoryId),
    changedFrom: toOptional(filters.changedFrom),
    changedTo: toOptional(filters.changedTo),
    locale: filters.locale,
    page,
    positionCode: toOptional(filters.positionCode),
    purpose: pickEnum(Object.values(QuestionPurposeDto), filters.purpose),
    q: toOptional(filters.q),
    size: pageSize,
    sort: `${sortBy},${sortDirection}`,
    source: pickEnum(Object.values(QuestionSourceDto), filters.source),
    status: pickEnum(Object.values(VersionStatusDto), filters.status),
    tagId: tagIds.length > 0 ? tagIds : undefined,
    translationStatus: pickEnum(Object.values(TranslationStatusDto), filters.translationStatus),
    type: pickEnum(Object.values(QuestionTypeDto), filters.type),
  };
};
