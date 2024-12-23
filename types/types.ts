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

export interface NotificationListItem {
    type:"location"|"time",
    title: string; // 通知タイトル
    id: string; // UUID
    notificationID: string; // UUID
    url: string; // URL文字列
    time: string; // 通知時間（ISO文字列などを想定）
    latitude: number; // 緯度
    longitude: number; // 経度
    radius: number; // 半径（メートル単位など）
    notifyOnEnter: boolean; // 入域時通知
    notifyOnExit: boolean; // 出域時通知
}
