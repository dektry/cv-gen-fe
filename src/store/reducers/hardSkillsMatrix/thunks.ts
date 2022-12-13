import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICopyHardSkillsMatrixProps, IFormHardSkillsMatrix } from 'models/IHardSkillsMatrix';

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

export const createHardSkillsMatrix = createAsyncThunk(
  createHardSkillsMatrixAction,
  ({ matrix, positionId }: { matrix: IFormHardSkillsMatrix; positionId: string }) => {
    return httpCreateHardSkillsMatrix(matrix, positionId);
  }
);

export const editHardSkillsMatrix = createAsyncThunk(
  editHardSkillsMatrixAction,
  ({ matrix, positionId }: { matrix: IFormHardSkillsMatrix; positionId: string }) => {
    return httpEditHardSkillsMatrix(matrix, positionId);
  }
);

export const copyHardSkillsMatrix = createAsyncThunk(copyHardSkillsMatrixAction, (data: ICopyHardSkillsMatrixProps) => {
  return httpCopyHardSkillsMatrix(data);
});
