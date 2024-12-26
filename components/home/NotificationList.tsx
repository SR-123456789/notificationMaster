import { View, Text } from "react-native";
import React from "react";
import { NotificationListItem as NotificationListItemType } from "@/types/types";
import NotificationListItem from "./NotificationListItem";

interface NotificationListProps {
  deleteNotification: (id: string) => void;
  isDeleteMode: boolean;
  notifications: NotificationListItemType[];
  changeNotificationStatus: (id: string, value: boolean) => void;
}

const NotificationList = ({
  deleteNotification,
  notifications,
  changeNotificationStatus,
  isDeleteMode,
}: NotificationListProps) => {
  return (
    <View>
      {notifications.map((notification, index: number) => (
        <NotificationListItem
          deleteNotification={deleteNotification}
          isDeleteMode={isDeleteMode}
          key={index}
          notification={notification}
          changeNotificationStatus={changeNotificationStatus}
        />
      ))}
    </View>
  );
};

export default NotificationList;
