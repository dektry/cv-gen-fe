import { createAsyncThunk } from '@reduxjs/toolkit';
import { IEducation } from 'models/IEducation';

import {
  httpGetEducation,
  httpPostEducation,
  httpPutEducation,
  httpDeleteEducation,
} from 'services/requests/education';

import {
  loadEducationListAction,
  createEducationAction,
  editEducationAction,
  deleteEducationAction,
} from './actionTypes';

export const getEducation = createAsyncThunk(loadEducationListAction, (employeeId: string) => {
  return httpGetEducation(employeeId);
});

export const createEducation = createAsyncThunk(createEducationAction, (education: IEducation) => {
  return httpPostEducation(education);
});

export const editEducation = createAsyncThunk(editEducationAction, (education: IEducation) => {
  return httpPutEducation(education);
});

export const deleteEducation = createAsyncThunk(deleteEducationAction, (educationId: string) => {
  return httpDeleteEducation(educationId);
});
