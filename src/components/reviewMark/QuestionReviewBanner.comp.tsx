import { JSX } from 'react';

import { ReviewMarkDto } from '@/api/generated';
import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { ReviewMarkBanner } from '@/components/reviewMark/ReviewMarkBanner.comp.tsx';
import { useReviewMark } from '@/hooks/useReviewMark.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  questionId: string;
  review: ReviewMarkDto;
};

export const QuestionReviewBanner = ({ questionId, review }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('components.reviewMark.notifications');
  const { notifyError, notifySuccess } = useNotifications();
  const { clearReview, isPending } = useReviewMark();

  const clear = async (): Promise<void> => {
    try {
      await clearReview(questionId);
      notifySuccess(t('cleared'));
    } catch {
      notifyError(t('clearFailed'));
    }
  };

  return <ReviewMarkBanner isPending={isPending} onClear={() => void clear()} review={review} />;
};
