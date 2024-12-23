import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { NotificationListItem as NotificationListItemType } from "@/types/types";

interface NotificationListItemProps {
  notification: NotificationListItemType;
  changeNotificationStatus: (id: string, value: boolean) => void;
}

const NotificationListItem = ({
  notification,
  changeNotificationStatus,
}: NotificationListItemProps) => {
  const toggleSwitch = () => {
    changeNotificationStatus(notification.id, !notification.isActive);
  };

  return (
    <TouchableOpacity style={[styles.container]}>
      <View style={{ flex: 1, justifyContent: "center", borderRadius: 5 }}>
        <Text style={styles.title}>{notification.title}</Text>
      </View>
      <Switch onValueChange={toggleSwitch} value={notification.isActive} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:"center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  active: {
    backgroundColor: "#d4edda",
  },
  inactive: {
    backgroundColor: "#f8d7da",
  },
});

export default NotificationListItem;
