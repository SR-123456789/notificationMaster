import * as SQLite from 'expo-sqlite';

// データベースを開く
const db = SQLite.openDatabaseAsync('app.db');

// テーブル作成
export const initNotificationsTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        time TEXT NOT NULL,
        latitude REAL,
        longitude REAL,
        radius INTEGER,
        enabled INTEGER DEFAULT 1
      );`,
      [],
      () => console.log('Notifications table created'),
      (_, error) => console.error('Error creating notifications table:', error)
    );
  });
};

// 通知を追加
export const addNotification = (notification, callback) => {
  const { title, time, latitude, longitude, radius, enabled } = notification;

  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO notifications (title, time, latitude, longitude, radius, enabled) VALUES (?, ?, ?, ?, ?, ?);`,
      [title, time, latitude, longitude, radius, enabled ? 1 : 0],
      (_, result) => callback?.(result),
      (_, error) => console.error('Error inserting notification:', error)
    );
  });
};

// 通知を取得
export const getNotifications = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM notifications;`,
      [],
      (_, { rows }) => callback(rows._array),
      (_, error) => console.error('Error fetching notifications:', error)
    );
  });
};

// 通知を更新
export const updateNotification = (id, updates, callback) => {
  const { title, time, latitude, longitude, radius, enabled } = updates;

  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE notifications SET title = ?, time = ?, latitude = ?, longitude = ?, radius = ?, enabled = ? WHERE id = ?;`,
      [title, time, latitude, longitude, radius, enabled ? 1 : 0, id],
      (_, result) => callback?.(result),
      (_, error) => console.error('Error updating notification:', error)
    );
  });
};

// 通知を削除
export const deleteNotification = (id, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `DELETE FROM notifications WHERE id = ?;`,
      [id],
      (_, result) => callback?.(result),
      (_, error) => console.error('Error deleting notification:', error)
    );
  });
};
