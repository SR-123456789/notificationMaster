import { NotificationListItem } from "@/types/types";

// Notificationの状態を管理する型

  interface NotificationState {
    notifications: NotificationListItem[];
  }
  
  const initialNotificationState: NotificationState = {
    notifications: [],
  };
  
  export default initialNotificationState;
  export type { NotificationListItem, NotificationState };
  