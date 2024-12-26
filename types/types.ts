export interface notificationLocation {
    location: {
        latitude: number;
        longitude: number;
    }
    range: number;
}
export interface NotificationRegion {
    identifier: string;
    latitude: number;
    longitude: number;
    radius: number;
    notifyOnEnter: boolean;
    notifyOnExit: boolean;
    url: string;
}

export interface NotificationTime {
    hour: number;
    minute: number;
}

export interface LocationNotification {
    type: "location";
    sentence: string;
    NotificationTitle: string;
    isActive: boolean; // 通知の有効/無効
    title: string; // 通知タイトル
    id: string; // UUID
    notificationID: string; // UUID
    url: string; // URL文字列
    latitude: number; // 緯度
    longitude: number; // 経度
    radius: number; // 半径（メートル単位など）
    notifyOnEnter: boolean; // 入域時通知
    notifyOnExit: boolean; // 出域時通知
    time?: NotificationTime; // 時間情報は不要
}

export interface ClockNotification {
    type: "clock";
    sentence: string;
    NotificationTitle: string;
    isActive: boolean; // 通知の有効/無効
    title: string; // 通知タイトル
    id: string; // UUID
    notificationID: string; // UUID
    url: string; // URL文字列
    time: NotificationTime; // 時間情報は必須
    latitude?: never; // 緯度は不要
    longitude?: never; // 経度は不要
    radius?: never; // 半径は不要
    notifyOnEnter?: never; // 入域時通知は不要
    notifyOnExit?: never; // 出域時通知は不要
}

// ユニオン型を定義
export type NotificationListItem = LocationNotification | ClockNotification;
