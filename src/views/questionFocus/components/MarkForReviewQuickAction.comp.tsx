import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { Button } from '@mui/material';
import { JSX } from 'react';

import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { pressableSx } from '@/config/theme/uiTokens.ts';
import { useReviewMark } from '@/hooks/useReviewMark.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  questionId: string;
};

export const MarkForReviewQuickAction = ({ questionId }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('components.reviewMark');
  const { notifyError, notifySuccess } = useNotifications();
  const { isPending, markForReview } = useReviewMark();

  const mark = async (): Promise<void> => {
    try {
      await markForReview(questionId);
      notifySuccess(t('notifications.marked'));
    } catch {
      notifyError(t('notifications.markFailed'));
    }
  };

  return (
    <Button
      disabled={isPending}
      loading={isPending}
      onClick={() => void mark()}
      size="small"
      startIcon={<FlagOutlinedIcon />}
      sx={pressableSx}
      variant="outlined"
    >
      {t('mark')}
    </Button>
  );
};
