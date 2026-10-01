import { BulkOperationDto } from '@/api/generated';
import { useBulkUpdateQuestions } from '@/hooks/useBulkUpdateQuestions.util.ts';

type Return = {
  clearReview: (questionId: string) => Promise<void>;
  isPending: boolean;
  markForReview: (questionId: string, reason?: string) => Promise<void>;
};

export const useReviewMark = (): Return => {
  const { bulkUpdate, isPending } = useBulkUpdateQuestions();

  return {
    clearReview: async questionId => {
      await bulkUpdate({ operation: BulkOperationDto.ClearReview, questionIds: [questionId] });
    },
    isPending,
    markForReview: async (questionId, reason = '') => {
      const trimmed = reason.trim();
      await bulkUpdate({
        operation: BulkOperationDto.MarkForReview,
        questionIds: [questionId],
        reviewReason: trimmed === '' ? undefined : trimmed,
      });
    },
  };
};
