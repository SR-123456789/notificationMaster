import * as TaskManager from 'expo-task-manager';
import { sendNotification } from './notificationService';
import * as Location from 'expo-location';
import { NotificationListItem } from '@/types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const defineGeofenceTask = (taskName: string): void => {
  TaskManager.defineTask(taskName, async ({ data, error }) => {
    try{
       if (error) {
      console.error('タスクエラー:', error);
      return;
    }

    if (data) {
      const { eventType, region } = data as {
        eventType: Location.GeofencingEventType;
        region: any; // URLを含む
      };

      const storedData = await AsyncStorage.getItem('@storage_Key');

      // データが存在しない場合
      if (!storedData) {
        console.warn('ストレージにデータが存在しません');
        return null;
      }
  
      // JSONデコード
      const notifications = JSON.parse(storedData);
  
      // 対象のデータを検索
      const notification = notifications.find((item: { id: string }) => item.notificationID === region.identifier);


      if (eventType === Location.GeofencingEventType.Enter) {
        await sendNotification(
          notification.NotificationTitle!=="未設定"?notification.NotificationTitle:(notification.title||notification.NotificationTitle),
          notification.sentence||`${notification.title}に入りました！`,
          { url: notification.url } // URLを通知のデータに追加
        );
      }
    }
    }catch(e){
      console.log(e)
    }
   
  });
};
