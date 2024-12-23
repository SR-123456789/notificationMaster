import { Action } from 'redux';
import initialNotificationState, { NotificationState } from '../states/notificationStates';
import { ADD_NOTIFICATION, MARK_AS_READ, REMOVE_NOTIFICATION } from '../actions/notificationActions';

interface PayloadAction extends Action {
  payload?: any;
}

const notificationReducer = (
  state: NotificationState = initialNotificationState,
  action: PayloadAction
): NotificationState => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default notificationReducer;
