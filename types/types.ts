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