import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { Button } from '@mui/material';
import { JSX, useState } from 'react';

import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { MarkForReviewDialog } from '@/components/reviewMark/MarkForReviewDialog.comp.tsx';
import { pressableSx } from '@/config/theme/uiTokens.ts';
import { useReviewMark } from '@/hooks/useReviewMark.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  questionId: string;
};

export const MarkForReviewButton = ({ questionId }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('components.reviewMark');
  const { notifyError, notifySuccess } = useNotifications();
  const { isPending, markForReview } = useReviewMark();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const confirm = async (reason: string): Promise<void> => {
    try {
      await markForReview(questionId, reason);
      notifySuccess(t('notifications.marked'));
      setIsDialogOpen(false);
    } catch {
      notifyError(t('notifications.markFailed'));
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        startIcon={<FlagOutlinedIcon />}
        sx={pressableSx}
        variant="outlined"
      >
        {t('mark')}
      </Button>
      <MarkForReviewDialog
        isOpen={isDialogOpen}
        isPending={isPending}
        onCancel={() => setIsDialogOpen(false)}
        onConfirm={reason => void confirm(reason)}
      />
    </>
  );
};
