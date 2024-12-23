import { View, Text } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NotificationList from "./NotificationList";
import { changeNotificationStatus } from "@/redux/actions/notificationActions";

const NotificationListContainer = () => {
  const dispatch = useDispatch();

  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );

  const onChangeNotificationStatus = (id: string, v: boolean) => {
    //ToDo 通知へ反映させる。
    dispatch(changeNotificationStatus(id, v));
  };
  return (
    <NotificationList
      notifications={notifications}
      changeNotificationStatus={(id,v)=>onChangeNotificationStatus(id,v)}
    />
  );
};

export default NotificationListContainer;
