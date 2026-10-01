import { BulkOperationDto } from '@/api/generated';

export const LARGE_CHANGE_THRESHOLD = 50;
export const REVIEW_REASON_MAX_LENGTH = 500;

export const BULK_OPERATIONS: BulkOperationDto[] = [
  BulkOperationDto.AddTags,
  BulkOperationDto.RemoveTags,
  BulkOperationDto.SetCategory,
  BulkOperationDto.MarkForReview,
  BulkOperationDto.ClearReview,
  BulkOperationDto.Retire,
];
