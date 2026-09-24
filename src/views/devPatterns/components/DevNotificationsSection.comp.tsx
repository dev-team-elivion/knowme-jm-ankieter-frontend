import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Button, Stack } from '@mui/material';
import { JSX } from 'react';

import { useNotifications } from '@/components/notifications/Notification.context.ts';
import { SectionPanel } from '@/components/page/SectionPanel.comp.tsx';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

type Props = {
  revealIndex: number;
};

export const DevNotificationsSection = ({ revealIndex }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('views.devPatterns.notifications');
  const { notifyError, notifySuccess } = useNotifications();

  return (
    <SectionPanel
      description={t('description')}
      icon={NotificationsNoneOutlinedIcon}
      revealIndex={revealIndex}
      title={t('title')}
    >
      <Stack direction="row" spacing={1.5}>
        <Button onClick={() => notifySuccess(t('successMessage'))} variant="contained">
          {t('showSuccess')}
        </Button>
        <Button color="error" onClick={() => notifyError(t('errorMessage'))} variant="outlined">
          {t('showError')}
        </Button>
      </Stack>
    </SectionPanel>
  );
};
