import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICopySoftSkillsMatrixProps } from 'models/ISoftSkillsMatrix';

import {
  httpGetAllSoftSkillsMatrix,
  httpGetOneSoftSkillsMatrix,
  httpDeleteSoftSkillsMatrix,
  httpCopySoftSkillsMatrix,
  httpCreateSoftSkillsMatrix,
  httpEditSoftSkillsMatrix,
} from 'services/requests/softSkillsMatrix';

import {
  loadAllSoftSkillsMatrix,
  loadOneSoftSkillsMatrix,
  deleteSoftSkillsMatrixAction,
  copySoftSkillsMatrixAction,
  editSoftSkillsMatrixAction,
  createSoftSkillsMatrixAction,
} from './actionTypes';

import { IFormSoftSkillsMatrix } from 'models/ISoftSkillsMatrix';

export const getAllSoftSkillsMatrix = createAsyncThunk(loadAllSoftSkillsMatrix, () => {
  return httpGetAllSoftSkillsMatrix();
});

export const getOneSoftSkillsMatrix = createAsyncThunk(loadOneSoftSkillsMatrix, (id: string) => {
  return httpGetOneSoftSkillsMatrix(id);
});

export const deleteSoftSkillsMatrix = createAsyncThunk(deleteSoftSkillsMatrixAction, (id: string) => {
  return httpDeleteSoftSkillsMatrix(id);
});

export const copySoftSkillsMatrix = createAsyncThunk(copySoftSkillsMatrixAction, (data: ICopySoftSkillsMatrixProps) => {
  return httpCopySoftSkillsMatrix(data);
});

export const createSoftSkillsMatrix = createAsyncThunk(
  createSoftSkillsMatrixAction,
  ({ matrix, positionId }: { matrix: IFormSoftSkillsMatrix; positionId: string }) => {
    return httpCreateSoftSkillsMatrix(matrix, positionId);
  }
);

export const editSoftSkillsMatrix = createAsyncThunk(
  editSoftSkillsMatrixAction,
  ({ matrix, positionId }: { matrix: IFormSoftSkillsMatrix; positionId: string }) => {
    return httpEditSoftSkillsMatrix(matrix, positionId);
  }
);
