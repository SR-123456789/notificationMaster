import { View, Text, Alert } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NotificationList from "./NotificationList";
import {
  changeNotificationID,
  changeNotificationStatus,
  deleteNotification as deleteNotificationAction,
} from "@/redux/actions/notificationActions";
import { setupGeofences } from "@/services/locationService";
import { NotificationListItem } from "@/types/types";
import {
  cancelScheduleNotification,
  setupNotficationSchedule,
} from "@/services/notificationService";
import { setDeleteMode } from "@/redux/actions/commonActions";

const GEOFENCE_TASK = "geofenceTask";

const NotificationListContainer = () => {
  const dispatch = useDispatch();

  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  const isDeleteMode = useSelector(
    (state: RootState) => state.common.isDeleteMode
  );

  const deleteNotification = async (id: string) => {
    const result = notifications.find((item) => item.id === id);

    if (result?.isActive) {
      if (result.type === "clock") {
        cancelScheduleNotification(result.notificationID);
      }
      if (result.type === "location") {
        const allNotificationList = notifications.filter(
          (item) => item.type === "location" && item.isActive === true
        );
        const deletedNotificationList = allNotificationList.filter(
          (item) => item.id !== id
        );
        setupGeofences(deletedNotificationList, GEOFENCE_TASK);
      }
    }
    dispatch(deleteNotificationAction(id));
  };

  const onChangeNotificationStatus = async (id: string, v: boolean) => {
    dispatch(setDeleteMode(false))
    //ToDo 通知へ反映させる。
    const result = notifications.find((item) => item.id === id);

    if (!result) return;

    if (result.type === "clock") {
      if (v) {
        //ToDo 通知を設定する
        result.notificationID =
          (await setupNotficationSchedule(result)) || "error";
        changeNotificationID(result.id, result.notificationID);
      } else {
        //ToDo 通知を解除する
        cancelScheduleNotification(result.notificationID);
      }
    }
    if (result.type === "location") {
      if (v) {
        //ToDo 通知を設定する
        activeLocationNotification(result);
      } else {
        //ToDo 通知を解除する
        disableLocationNotification(result);
      }
    }

    dispatch(changeNotificationStatus(id, v));
  };

  const activeLocationNotification = (
    thisNotification: NotificationListItem
  ) => {
    const allNotificationList = notifications.filter(
      (item) => item.type === "location" && item.isActive === true
    );

    if (allNotificationList.length >= 20) {
      Alert.alert("位置通知の登録は20個までです");
      return;
    }
    allNotificationList.push(thisNotification);
    setupGeofences(allNotificationList, GEOFENCE_TASK);
  };

  const disableLocationNotification = (
    thisNotification: NotificationListItem
  ) => {
    const allNotificationList = notifications.filter(
      (item) => item.type === "location" && item.isActive === true
    );
    const deletedNotificationList = allNotificationList.filter(
      (item) => item.id !== thisNotification.id
    );
    setupGeofences(deletedNotificationList, GEOFENCE_TASK);
  };

  return (
    <NotificationList
      deleteNotification={(id) => deleteNotification(id)}
      isDeleteMode={isDeleteMode}
      notifications={notifications}
      changeNotificationStatus={(id, v) => onChangeNotificationStatus(id, v)}
    />
  );
};

export default NotificationListContainer;
