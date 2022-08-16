import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import app from './redusers/app';
import candidates from './redusers/candidates';
import employees from './redusers/employees';
import interview from './redusers/interview';
import levels from './redusers/levels';
import positions from './redusers/positions';
import softskillsInterview from './redusers/softskillsInterview';

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
