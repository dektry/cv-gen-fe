import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import app from './reducers/app';
import candidates from './reducers/candidates';
import employees from './reducers/employees';
import interview from './reducers/interview';
import levels from './reducers/levels';
import positions from './reducers/positions';
import softskillsInterview from './reducers/softskillsInterview';
import techAssessment from './reducers/techAssessment';

const rootReducer = combineReducers({
  app,
  candidates,
  employees,
  interview,
  levels,
  positions,
  softskillsInterview,
  techAssessment,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
