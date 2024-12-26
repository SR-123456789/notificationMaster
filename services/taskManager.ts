import * as TaskManager from 'expo-task-manager';
import { sendNotification } from './notificationService';
import * as Location from 'expo-location';
import { NotificationListItem } from '@/types/types';

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
        region: NotificationListItem; // URLを含む
      };

      if (eventType === Location.GeofencingEventType.Enter) {
        await sendNotification(
          region.NotificationTitle!=="未設定"?region.NotificationTitle:(region.title||region.NotificationTitle),
          region.sentence||`${region.title}に入りました！`,
          { url: region.url } // URLを通知のデータに追加
        );
      }
    }
    }catch(e){
      console.log(e)
    }
   
  });
};
