import { NotificationListItem } from "@/types/types";

// Notificationの状態を管理する型
interface Notification extends NotificationListItem {}
  
  interface NotificationState {
    notifications: Notification[];
  }
  
  const initialNotificationState: NotificationState = {
    notifications: [],
  };
  
  export default initialNotificationState;
  export type { Notification, NotificationState };
  