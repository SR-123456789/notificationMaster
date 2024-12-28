import { NotificationListItem } from '@/types/types';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const MARK_AS_READ = 'MARK_AS_READ';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const CHANGE_NOTIFICATION_STATUS = 'CHANGE_NOTIFICATION_STATUS';
export const CHANGE_NOTIFICATION_ID='CHANGE_NOTIFICATION_ID'
export const EDIT_NOTIFICATION='EDIT_NOTIFICATION'

export const addNotification = (notification: NotificationListItem) => ({
  type: ADD_NOTIFICATION,
  payload: notification,
});

export const changeNotificationStatus = (id: string,value:boolean) => ({
  type: CHANGE_NOTIFICATION_STATUS,
  payload: {id, value}
})

export const markAsRead = (id: string) => ({
  type: MARK_AS_READ,
  payload: id,
});

export const changeNotificationID=(id:string,value:string)=>{
  return {
    type:CHANGE_NOTIFICATION_ID,
    payload:{id,value}
  }
}
export const deleteNotification=(id:string)=>{
  return {
    type:REMOVE_NOTIFICATION,
    payload:id
  }
}
export const editNotification=(id:string,notification:NotificationListItem)=>{
  return {
    type:EDIT_NOTIFICATION,
    payload:{id,notification}
  }
}