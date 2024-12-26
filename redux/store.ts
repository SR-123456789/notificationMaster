import { createStore, combineReducers } from 'redux';
import notificationReducer from './reducers/notificationReducer';
import commonReducer from './reducers/commonReducer';

const rootReducer = combineReducers({
  notifications: notificationReducer,
  common: commonReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
