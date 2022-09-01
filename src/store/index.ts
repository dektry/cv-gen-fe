import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import app from './reducers/app';
import candidates from './reducers/candidates';
import employees from './reducers/employees';
import interview from './reducers/interview';
import levels from './reducers/levels';
import positions from './reducers/positions';
import softskillsInterview from './reducers/softskillsInterview';

const rootReducer = combineReducers({
  app,
  candidates,
  employees,
  interview,
  levels,
  positions,
  softskillsInterview,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
