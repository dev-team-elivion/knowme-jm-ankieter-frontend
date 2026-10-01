import { BulkOperationDto, BulkUpdateRequestDto } from '@/api/generated';
import { LARGE_CHANGE_THRESHOLD } from '@/views/questionBank/model/bulkOperation.constants.ts';
import { BulkOperationParams } from '@/views/questionBank/model/BulkOperation.model.ts';
import { QuestionBankQuery } from '@/views/questionBank/model/QuestionBank.model.ts';
import { QuestionSelection } from '@/views/questionBank/model/QuestionSelection.model.ts';
import { toQuestionFilter } from '@/views/questionBank/util/questionListParams.util.ts';

type BulkRequestInput = {
  operation: BulkOperationDto;
  params: BulkOperationParams;
  query: QuestionBankQuery;
  selection: QuestionSelection;
};

export const EMPTY_BULK_PARAMS: BulkOperationParams = {
  categoryId: '',
  reviewReason: '',
  tags: [],
};

export const needsBulkParams = (operation: BulkOperationDto): boolean =>
  operation !== BulkOperationDto.Retire && operation !== BulkOperationDto.ClearReview;

export const areBulkParamsComplete = (
  operation: BulkOperationDto,
  params: BulkOperationParams,
): boolean => {
  switch (operation) {
    case BulkOperationDto.AddTags:
    case BulkOperationDto.RemoveTags:
      return params.tags.length > 0;
    case BulkOperationDto.ClearReview:
    case BulkOperationDto.MarkForReview:
    case BulkOperationDto.Retire:
      return true;
    case BulkOperationDto.SetCategory:
      return params.categoryId !== '';
  }
};

const toOperationParams = (
  operation: BulkOperationDto,
  params: BulkOperationParams,
): Partial<BulkUpdateRequestDto> => {
  switch (operation) {
    case BulkOperationDto.AddTags:
    case BulkOperationDto.RemoveTags:
      return { tagIds: params.tags.map(tag => tag.id) };
    case BulkOperationDto.ClearReview:
    case BulkOperationDto.Retire:
      return {};
    case BulkOperationDto.MarkForReview:
      return { reviewReason: params.reviewReason.trim() || undefined };
    case BulkOperationDto.SetCategory:
      return { categoryId: params.categoryId };
  }
};

export const toBulkRequest = ({
  operation,
  params,
  query,
  selection,
}: BulkRequestInput): BulkUpdateRequestDto => ({
  ...(selection.kind === 'ids'
    ? { questionIds: selection.ids }
    : { filter: toQuestionFilter(query) }),
  ...toOperationParams(operation, params),
  operation,
});

export const isLargeChange = (affected: number): boolean => affected > LARGE_CHANGE_THRESHOLD;
