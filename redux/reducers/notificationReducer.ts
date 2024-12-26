import { Action } from 'redux';
import initialNotificationState, { NotificationState } from '../states/notificationStates';
import { ADD_NOTIFICATION, CHANGE_NOTIFICATION_ID, CHANGE_NOTIFICATION_STATUS, MARK_AS_READ, REMOVE_NOTIFICATION } from '../actions/notificationActions';

interface PayloadAction extends Action {
  payload?: any;
}

const notificationReducer = (
  state: NotificationState = initialNotificationState,
  action: PayloadAction
): NotificationState => {
  switch (action.type) {
    case CHANGE_NOTIFICATION_STATUS:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload.id ? { ...notification, isActive: action.payload.value } : notification
        ),
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case MARK_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload ? { ...notification, isRead: true } : notification
        ),
      };
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter((notification) => notification.id !== action.payload),
      };
    case CHANGE_NOTIFICATION_ID:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload ? { ...notification, notificationID: action.payload.value } : notification
        ),
      };
    default:
      return state;
  }
};

export default notificationReducer;
