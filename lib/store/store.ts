import { combineReducers, configureStore } from '@reduxjs/toolkit';
import studentReducer from '../features/Student/StudentSlice';
import { persistStore, persistReducer } from 'redux-persist';

import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

// Fallback for SSR
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem() {
      return Promise.resolve();
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
  key: 'student',
  storage,
};

const rootReducer = combineReducers({
  student: studentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
