import { View, Text } from 'react-native'
import React from 'react'
import { NotificationListItem as NotificationListItemType } from '@/types/types';
import NotificationListItem from './NotificationListItem';

interface NotificationListProps {
    notifications: NotificationListItemType[];
    changeNotificationStatus: (id: string, value: boolean) => void;
    }

const NotificationList = ({notifications,changeNotificationStatus}:NotificationListProps) => {
  return (
    <View>
        {notifications.map((notification,index:number) => (
          <NotificationListItem key={index} notification={notification} changeNotificationStatus={changeNotificationStatus}/>
        ))}
    </View>
  )
}

export default NotificationList