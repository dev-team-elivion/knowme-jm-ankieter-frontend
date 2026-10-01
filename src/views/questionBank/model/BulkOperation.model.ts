import { TagDto } from '@/api/generated';

export type BulkDialogStep = 'params' | 'preview';

export type BulkOperationParams = {
  categoryId: string;
  reviewReason: string;
  tags: TagDto[];
};
