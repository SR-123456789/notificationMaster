import * as Location from 'expo-location';

export interface GeofenceRegion {
  identifier: string;
  latitude: number;
  longitude: number;
  radius: number;
  notifyOnEnter?: boolean;
  notifyOnExit?: boolean;
  url: string; // 各Geofenceに紐付くURL
}

export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const foregroundResponse = await Location.requestForegroundPermissionsAsync();
    if (foregroundResponse.status !== 'granted') {
      alert('フォアグラウンドでの位置情報の使用が許可されていません');
      return false;
    }

    // バックグラウンドの権限をリクエスト
    const backgroundResponse = await Location.requestBackgroundPermissionsAsync();
    if (backgroundResponse.status !== 'granted') {
      alert('バックグラウンドでの位置情報の使用が許可されていません');
      return false;
    }

    return true;
  } catch (e) {
    console.log(e)
    return false
  }
  // フォアグラウンドの権限をリクエスト

};


export const setupGeofences = async (
  regions: GeofenceRegion[],
  taskName: string
): Promise<void> => {
  console.log("sss")

  console.log('Foreground Permissions:', await Location.getForegroundPermissionsAsync());
  console.log('Background Permissions:', await Location.getBackgroundPermissionsAsync());


  const hasPermission = await requestLocationPermission();
  if (!hasPermission) return;

  try {
    await Location.startGeofencingAsync(taskName, regions);
    console.log('Geofencesが設定されました:', regions);
  } catch (error) {
    console.error('Geofencesの設定に失敗しました:', error);
  }
};
