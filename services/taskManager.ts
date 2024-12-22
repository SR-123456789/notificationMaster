import * as TaskManager from 'expo-task-manager';
import { sendNotification } from './notificationService';
import * as Location from 'expo-location';

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
        region: { identifier: string; url: string }; // URLを含む
      };

      if (eventType === Location.GeofencingEventType.Enter) {
        await sendNotification(
          'ジオフェンス通知',
          `${region.identifier}に入りました！`,
          { url: region.url } // URLを通知のデータに追加
        );
      }
    }
    }catch(e){
      console.log(e)
    }
   
  });
};
