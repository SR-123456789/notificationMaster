import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notificationReducer from './reducers/notificationReducer';
import commonReducer from './reducers/commonReducer';

// 永続化の設定
const persistConfig = {
  key: 'root', // 永続化のルートキー
  storage: AsyncStorage, // AsyncStorage を使用
  whitelist: ['notifications'], // 永続化するリデューサーを指定
};

// ルートリデューサー
const rootReducer = combineReducers({
  notifications: notificationReducer,
  common: commonReducer,
});

// 永続化リデューサー
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ストア作成
const store = createStore(persistedReducer);

// 永続化のためのパーシスター作成
export const persistor = persistStore(store);

// 型定義
export type RootState = ReturnType<typeof rootReducer>;
export default store;
