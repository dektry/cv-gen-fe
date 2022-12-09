import { createAsyncThunk } from '@reduxjs/toolkit';
import { IHardSkillsMatrix } from 'models/IHardSkillsMatrix';

import {
  httpGetAllHardSkillsMatrix,
  httpGetOneHardSkillsMatrix,
  httpDeleteHardSkillsMatrix,
  httpCreateHardSkillsMatrix,
  httpEditHardSkillsMatrix,
} from 'services/requests/hardSkillsMatrix';

import {
  loadAllHardSkillsMatrix,
  loadOneHardSkillsMatrix,
  createHardSkillsMatrixAction,
  deleteHardSkillsMatrixAction,
  editHardSkillsMatrixAction,
} from './actionTypes';

export const getAllHardSkillsMatrix = createAsyncThunk(loadAllHardSkillsMatrix, () => {
  return httpGetAllHardSkillsMatrix();
});

export const getOneHardSkillsMatrix = createAsyncThunk(loadOneHardSkillsMatrix, (id: string) => {
  return httpGetOneHardSkillsMatrix(id);
});

export const deleteHardSkillsMatrix = createAsyncThunk(deleteHardSkillsMatrixAction, (id: string) => {
  return httpDeleteHardSkillsMatrix(id);
});

export const createHardSkillsMatrix = createAsyncThunk(createHardSkillsMatrixAction, (matrix: IHardSkillsMatrix) => {
  return httpCreateHardSkillsMatrix(matrix);
});

export const edtHardSkillsMatrix = createAsyncThunk(editHardSkillsMatrixAction, (matrix: IHardSkillsMatrix) => {
  return httpEditHardSkillsMatrix(matrix);
});
