import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { NotificationListItem as NotificationListItemType } from "@/types/types";
import Entypo from '@expo/vector-icons/Entypo';
interface NotificationListItemProps {
  deleteNotification: (id: string) => void;
  isDeleteMode: boolean;
  notification: NotificationListItemType;
  changeNotificationStatus: (id: string, value: boolean) => void;
  onOpenEditNotificationDialog: (v: string) => void;
}

const NotificationListItem = ({
  deleteNotification,
  notification,
  isDeleteMode,
  changeNotificationStatus,
  onOpenEditNotificationDialog,
}: NotificationListItemProps) => {
  const toggleSwitch = () => {
    changeNotificationStatus(notification.id, !notification.isActive);
  };

  return (
    <TouchableOpacity style={[styles.container]} onPress={()=>onOpenEditNotificationDialog(notification.id)}>
      {isDeleteMode &&<TouchableOpacity style={{marginRight:20}} onPress={()=>deleteNotification(notification.id)}><Entypo name="circle-with-minus" size={24} color="red" /></TouchableOpacity>}
      <View style={{ flex: 1, justifyContent: "center", borderRadius: 5 }}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={{fontSize:12}}>{notification.NotificationTitle}</Text>
      </View>
      <Switch onValueChange={toggleSwitch} value={notification.isActive} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 2,
    marginVertical: 5,
    borderRadius: 5,
  },
  title: {
    flex: 1,
    fontSize: 25,
  },
  active: {
    backgroundColor: "#d4edda",
  },
  inactive: {
    backgroundColor: "#f8d7da",
  },
});

export default NotificationListItem;
