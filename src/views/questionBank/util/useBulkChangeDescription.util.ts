import { BulkOperationDto } from '@/api/generated';
import { FilterOption } from '@/components/dataTable/model/DataTable.model.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';
import { BulkOperationParams } from '@/views/questionBank/model/BulkOperation.model.ts';

type Return = (operation: BulkOperationDto, params: BulkOperationParams) => string;

export const useBulkChangeDescription = (categories: FilterOption[]): Return => {
  const { t } = useTranslationWithPrefix('views.questionBank.bulk.change');

  return (operation, params) => {
    const tagLabels = params.tags.map(tag => tag.label).join(', ');
    const reason = params.reviewReason.trim();

    switch (operation) {
      case BulkOperationDto.AddTags:
        return t('addTags', { tags: tagLabels });
      case BulkOperationDto.ClearReview:
        return t('clearReview');
      case BulkOperationDto.MarkForReview:
        return reason ? t('markForReviewWithReason', { reason }) : t('markForReview');
      case BulkOperationDto.RemoveTags:
        return t('removeTags', { tags: tagLabels });
      case BulkOperationDto.Retire:
        return t('retire');
      case BulkOperationDto.SetCategory:
        return t('setCategory', {
          category: categories.find(category => category.value === params.categoryId)?.label ?? '',
        });
    }
  };
};
