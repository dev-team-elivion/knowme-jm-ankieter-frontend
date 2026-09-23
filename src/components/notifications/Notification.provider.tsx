import { Alert, Snackbar } from '@mui/material';
import { JSX, ReactNode, SyntheticEvent, useCallback, useMemo, useRef, useState } from 'react';

import {
  NotificationContext,
  NotificationModel,
  NotificationSeverity,
} from '@/components/notifications/Notification.context.ts';
import { appendToNotificationQueue } from '@/components/notifications/notificationQueue.util.ts';
import { useTranslationWithPrefix } from '@/utils/useTranslationWithPrefix.util.ts';

const SUCCESS_AUTO_HIDE_MS = 4000;

type Props = {
  children: ReactNode;
};

export const NotificationProvider = ({ children }: Props): JSX.Element => {
  const { t } = useTranslationWithPrefix('components.notifications');
  const [queue, setQueue] = useState<NotificationModel[]>([]);
  const [closingId, setClosingId] = useState<null | number>(null);
  const nextIdRef = useRef(0);
  const current = queue.at(0);

  const enqueue = useCallback((severity: NotificationSeverity, message: string) => {
    nextIdRef.current += 1;
    const notification = { id: nextIdRef.current, message, severity };
    setQueue(previous => appendToNotificationQueue(previous, notification));
  }, []);

  const contextValue = useMemo(
    () => ({
      notifyError: (message: string) => enqueue('error', message),
      notifySuccess: (message: string) => enqueue('success', message),
    }),
    [enqueue],
  );

  const handleClose = (_event?: Event | SyntheticEvent, reason?: string): void => {
    if (reason === 'clickaway' || current === undefined) {
      return;
    }
    setClosingId(current.id);
  };

  const handleExited = (): void => {
    setQueue(previous => previous.slice(1));
  };

  return (
    <NotificationContext value={contextValue}>
      {children}
      {current && (
        <Snackbar
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          autoHideDuration={current.severity === 'success' ? SUCCESS_AUTO_HIDE_MS : null}
          key={current.id}
          onClose={handleClose}
          open={closingId !== current.id}
          slotProps={{ transition: { onExited: handleExited } }}
        >
          <Alert
            onClose={handleClose}
            severity={current.severity}
            slotProps={{ closeButton: { 'aria-label': t('close') } }}
            sx={{ minWidth: 320 }}
          >
            {current.message}
          </Alert>
        </Snackbar>
      )}
    </NotificationContext>
  );
};
