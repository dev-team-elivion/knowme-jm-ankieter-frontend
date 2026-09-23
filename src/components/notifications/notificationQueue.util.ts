import { NotificationModel } from '@/components/notifications/Notification.context.ts';

const MAX_QUEUE_LENGTH = 4;

export const appendToNotificationQueue = (
  queue: NotificationModel[],
  notification: NotificationModel,
): NotificationModel[] => {
  const next = [...queue, notification];
  if (next.length <= MAX_QUEUE_LENGTH) {
    return next;
  }
  const [visible, ...waiting] = next;
  return [visible, ...waiting.slice(-(MAX_QUEUE_LENGTH - 1))];
};
