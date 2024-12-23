// Notificationの状態を管理する型
interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: Date;
    isRead: boolean;
  }
  
  interface NotificationState {
    notifications: Notification[];
  }
  
  const initialNotificationState: NotificationState = {
    notifications: [],
  };
  
  export default initialNotificationState;
  export type { Notification, NotificationState };
  