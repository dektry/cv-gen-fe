import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  httpGetAllSoftSkillsMatrix,
  httpGetOneSoftSkillsMatrix,
  httpDeleteSoftSkillsMatrix,
} from 'services/requests/softSkillsMatrix';

import { loadAllSoftSkillsMatrix, loadOneSoftSkillsMatrix, deleteSoftSkillsMatrixAction } from './actionTypes';

export const getAllSoftSkillsMatrix = createAsyncThunk(loadAllSoftSkillsMatrix, () => {
  return httpGetAllSoftSkillsMatrix();
});

export const getOneSoftSkillsMatrix = createAsyncThunk(loadOneSoftSkillsMatrix, (id: string) => {
  return httpGetOneSoftSkillsMatrix(id);
});

export const deleteSoftSkillsMatrix = createAsyncThunk(deleteSoftSkillsMatrixAction, (id: string) => {
  return httpDeleteSoftSkillsMatrix(id);
});
