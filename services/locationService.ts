import { NotificationListItem } from '@/types/types';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

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
    await new Promise(resolve => setTimeout(resolve, 200));

    if (foregroundResponse.status !== 'granted') {
      Alert.alert('フォアグラウンドでの位置情報の使用が許可されていません');
      return false;
    }
    // バックグラウンドの権限をリクエスト
    const backgroundResponse = await Location.requestBackgroundPermissionsAsync();
    await new Promise(resolve => setTimeout(resolve, 200));

    console.log('Background Permissions:', backgroundResponse.status);

    if (backgroundResponse.status !== 'granted') {
      Alert.alert('バックグラウンドでの位置情報の使用が許可されていません');
      return false;
    }

    return true;
  } catch (e) {
    console.log(e)
    return false
  }
  // フォアグラウンドの権限をリクエスト

};

const updateNotificationIDs = (json: any): any => {
  // JSONが配列の場合
  if (Array.isArray(json)) {
    return json.map((item) => updateNotificationIDs(item));
  }

  // JSONがオブジェクトの場合
  if (typeof json === "object" && json !== null) {
    const updatedObject: any = {};
    for (const key in json) {
      if (key === "notificationID") {
        updatedObject["identifier"] = json[key]; // キー名を置き換え
      } else {
        updatedObject[key] = updateNotificationIDs(json[key]); // 再帰的に適用
      }
    }
    return updatedObject;
  }

  // 配列やオブジェクトでない場合（文字列、数値など）
  return json;
};



export const setupGeofences = async (
  regions: NotificationListItem[],
  taskName: string
): Promise<void> => {
  console.log("sss")

  console.log('Foreground Permissions:', await Location.getForegroundPermissionsAsync());
  console.log('Background Permissions:', await Location.getBackgroundPermissionsAsync());


  const hasPermission = await requestLocationPermission();
  if (!hasPermission) return;

  try {
    await AsyncStorage.setItem('@storage_Key', JSON.stringify(regions));
    await Location.startGeofencingAsync(taskName, updateNotificationIDs(regions));
    console.log('Geofencesが設定されました:', regions);
  } catch (error) {
    console.error('Geofencesの設定に失敗しました:', error);
  }
};

export const reverseGeocodeWithNominatim = async (latitude: number, longitude: number): Promise<string> => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.address) {
      const { road, city, state, country } = data.address;
      // 住所をフォーマット
      return `${state || ''}${city || ''}${road || ''}`;
    }
    return '住所から通知';
  } catch (error) {
    console.error('逆ジオコーディングエラー:', error);
    return '住所から通知';
  }
};

export const getApproximateLocation = async (): Promise<null | { latitude: number; longitude: number }> => {
  try {
    // 権限の確認
    const { status } = await Location.getForegroundPermissionsAsync();
    console.log(status)

    // 権限がない場合
    if (status !== 'granted') {
      return null;
    }

    // 権限がある場合、大まかな位置情報を取得
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Low, // 大まかな場所を取得
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('位置情報の取得に失敗しました:', error);
    return null // エラー時も "no_permission" を返す
  }
};