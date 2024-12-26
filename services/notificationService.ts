import { NotificationListItem } from '@/types/types';
import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';

export const requestNotificationPermission = async (): Promise<void> => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    await Notifications.requestPermissionsAsync();
  }
};


export const sendNotification = async (
  title: string,
  body: string,
  data: { [key: string]: any } = {}
): Promise<void> => {
  try {
    // const { granted } = await Notifications.getPermissionsAsync();
    // if (granted) { 
    //   console.log(granted)
    //   return }   
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        sound: true,
        data: {
          url: data.url, // URLをデータとして渡す
        },
      },
      trigger: null
    });
    // await Notifications.scheduleNotificationAsync({
    //   content: {
    //     title,
    //     body,
    //     data, // URLなどのデータを含める
    //   },
    //   trigger: {
    //     seconds: 10,
    //  },
    // });
    console.log('通知を送信しました');
  } catch (error) {
    console.error('通知の送信に失敗しました:', error);
  }
};


export const setupNotficationSchedule = async (NotificationListItem: NotificationListItem) => {
  try {
    if (NotificationListItem.type !== "clock") return
    console.log(NotificationListItem);
    // await Notifications.cancelAllScheduledNotificationsAsync();
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: NotificationListItem.NotificationTitle,
        body: NotificationListItem.sentence,
        sound: true,
        data: {
          url: NotificationListItem.url, // URLをデータとして渡す
        },
      },
      trigger: {
        type: SchedulableTriggerInputTypes.DAILY,
        hour: NotificationListItem.time.hour,
        minute: NotificationListItem.time.minute,
      },
    });
    return notificationId;
  } catch (e) {
    console.log(e)
  }
}
export const cancelScheduleNotification = async (notificationId: string) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log(`Notification with ID ${notificationId} canceled.`);
  } catch (error) {
    console.error("Failed to cancel notification:", error);
  }
};