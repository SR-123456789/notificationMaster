import * as Notifications from 'expo-notifications';

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
    console.log('通知を送信します');
    // const { granted } = await Notifications.getPermissionsAsync();
    // if (granted) { 
    //   console.log(granted)
    //   return }   
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "通知タイトル",
        body: "これはローカル通知の例です",
        sound: true,
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
