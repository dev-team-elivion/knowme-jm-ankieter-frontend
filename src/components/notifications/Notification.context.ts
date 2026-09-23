import { createContext, use } from 'react';

export type NotificationModel = {
  id: number;
  message: string;
  severity: NotificationSeverity;
};

export type NotificationSeverity = 'error' | 'success';

type NotificationContextValue = {
  notifyError: (message: string) => void;
  notifySuccess: (message: string) => void;
};

export const NotificationContext = createContext<NotificationContextValue>({
  notifyError: () => undefined,
  notifySuccess: () => undefined,
});

export const useNotifications = (): NotificationContextValue => use(NotificationContext);
