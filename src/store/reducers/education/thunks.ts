import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICvEducation } from 'models/ICVGeneration';

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

export const createEducation = createAsyncThunk(createEducationAction, (education: ICvEducation) => {
  return httpPostEducation(education);
});

export const editEducation = createAsyncThunk(editEducationAction, (education: ICvEducation) => {
  return httpPutEducation(education);
});

export const deleteEducation = createAsyncThunk(deleteEducationAction, (education: ICvEducation) => {
  return httpDeleteEducation(String(education.id));
});
