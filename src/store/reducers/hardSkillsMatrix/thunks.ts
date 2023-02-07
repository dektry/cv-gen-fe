import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICopyHardSkillsMatrixProps, IFormHardSkillsMatrix } from 'models/IHardSkillsMatrix';

import {
  httpGetAllHardSkillsMatrix,
  httpGetOneHardSkillsMatrix,
  httpDeleteHardSkillsMatrix,
  httpCreateHardSkillsMatrix,
  httpEditHardSkillsMatrix,
  httpCopyHardSkillsMatrix,
  httpGetTechSkillLevels,
} from 'services/requests/hardSkillsMatrix';

import {
  loadAllHardSkillsMatrix,
  loadOneHardSkillsMatrix,
  createHardSkillsMatrixAction,
  deleteHardSkillsMatrixAction,
  editHardSkillsMatrixAction,
  copyHardSkillsMatrixAction,
} from './actionTypes';
import { RootState } from 'store/index';

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

export const getSkillLevels = createAsyncThunk<{ id: number; name: string }[], undefined, { state: RootState }>(
  'getSkillLevelsAction',
  (_, { getState, rejectWithValue }) => {
    const skillLevels = getState().hardSkillsMatrix.skillLevels;

    if (skillLevels.length) {
      return rejectWithValue('Skill levels already loaded');
    }

    return httpGetTechSkillLevels();
  }
);
