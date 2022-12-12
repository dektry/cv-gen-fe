import { createAsyncThunk } from '@reduxjs/toolkit';
import { IHardSkillsMatrix, ICopyHardSkillsMatrixProps } from 'models/IHardSkillsMatrix';

import {
  httpGetAllHardSkillsMatrix,
  httpGetOneHardSkillsMatrix,
  httpDeleteHardSkillsMatrix,
  httpCreateHardSkillsMatrix,
  httpEditHardSkillsMatrix,
  httpCopyHardSkillsMatrix,
} from 'services/requests/hardSkillsMatrix';

import {
  loadAllHardSkillsMatrix,
  loadOneHardSkillsMatrix,
  createHardSkillsMatrixAction,
  deleteHardSkillsMatrixAction,
  editHardSkillsMatrixAction,
  copyHardSkillsMatrixAction,
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

export const copyHardSkillsMatrix = createAsyncThunk(copyHardSkillsMatrixAction, (data: ICopyHardSkillsMatrixProps) => {
  return httpCopyHardSkillsMatrix(data);
});
