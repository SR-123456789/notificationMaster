import { NotificationListItem } from '@/types/types';
import { Notification } from '../states/notificationStates';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const MARK_AS_READ = 'MARK_AS_READ';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const addNotification = (notification: NotificationListItem) => ({
  type: ADD_NOTIFICATION,
  payload: notification,
});

export const markAsRead = (id: string) => ({
  type: MARK_AS_READ,
  payload: id,
});

export const removeNotification = (id: string) => ({
  type: REMOVE_NOTIFICATION,
  payload: id,
});