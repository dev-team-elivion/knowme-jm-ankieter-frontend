import {
  QuestionFilterDto,
  QuestionPurposeDto,
  QuestionSourceDto,
  QuestionTypeDto,
  TranslationStatusDto,
  VersionStatusDto,
} from '@/api/generated';
import {
  QUESTION_LOCALE,
  TAG_ID_SEPARATOR,
} from '@/views/questionBank/model/questionBank.constants.ts';
import { QuestionBankQuery } from '@/views/questionBank/model/QuestionBank.model.ts';

export type QuestionListParams = {
  author?: string;
  categoryId?: string;
  changedFrom?: string;
  changedTo?: string;
  forReview?: boolean;
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

export const REVIEW_FILTER_MARKED = 'true';
export const REVIEW_FILTER_UNMARKED = 'false';

const toReviewFlag = (value: string): boolean | undefined => {
  if (value === REVIEW_FILTER_MARKED) {
    return true;
  }
  return value === REVIEW_FILTER_UNMARKED ? false : undefined;
};

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
    forReview: toReviewFlag(filters.forReview),
    locale: QUESTION_LOCALE,
    page,
    positionCode: toOptional(filters.positionCode),
    purpose: pickEnum(Object.values(QuestionPurposeDto), filters.purpose),
    q: toOptional(filters.q),
    size: pageSize,
    sort: `${sortBy},${sortDirection}`,
    source: pickEnum(Object.values(QuestionSourceDto), filters.source),
    status: pickEnum(Object.values(VersionStatusDto), filters.status),
    tagId: tagIds.length > 0 ? tagIds : undefined,
    type: pickEnum(Object.values(QuestionTypeDto), filters.type),
  };
};

export const toQuestionFilter = (query: QuestionBankQuery): QuestionFilterDto => {
  const params = toQuestionListParams(query);
  return {
    author: params.author,
    categoryId: params.categoryId,
    changedFrom: params.changedFrom,
    changedTo: params.changedTo,
    forReview: params.forReview,
    locale: params.locale,
    positionCode: params.positionCode,
    purpose: params.purpose,
    q: params.q,
    source: params.source,
    status: params.status,
    tagIds: params.tagId,
    translationStatus: params.translationStatus,
    type: params.type,
  };
};
