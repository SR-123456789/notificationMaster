import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const NotificationListContainer = () => {
    const notifications = useSelector((state: RootState) => state.notifications.notifications);
    return (
    <View>
      <Text>{JSON.stringify(notifications)}ss</Text>
    </View>
  )
}

export default NotificationListContainer