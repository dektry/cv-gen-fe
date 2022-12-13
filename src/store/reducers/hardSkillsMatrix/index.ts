import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';

import { appStoreName } from 'store/reducers/hardSkillsMatrix/actionTypes';
import { IFormHardSkillsMatrix, IHardSkillsMatrix, IHardSkillsMatrixState } from 'models/IHardSkillsMatrix';
import { IDBPosition } from 'models/IUser';

import { getAllHardSkillsMatrix } from './thunks';

const initialState: IHardSkillsMatrixState = {
  matrix: [],
  currentMatrix: {} as IFormHardSkillsMatrix,
  isLoading: false,
};

const harSkillsMatrix = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    setHardSkillsMatrixIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setCurrentHardSkillsMatrix: (state, { payload }: PayloadAction<IHardSkillsMatrix>) => {
      state.currentMatrix = payload;
    },
    setCurrentPosition: (state, { payload }: PayloadAction<IDBPosition>) => {
      state.currentMatrix.position = payload;
    },
    setCurrentSkillGroups: (state, { payload }: PayloadAction<IFormHardSkillsMatrix>) => {
      if (payload.skillGroups) {
        state.currentMatrix.skillGroups = payload.skillGroups;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllHardSkillsMatrix.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllHardSkillsMatrix.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.matrix = payload;
    });
    builder.addCase(getAllHardSkillsMatrix.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default harSkillsMatrix.reducer;

export const hardSkillsMatrixSelector = (state: RootState): IHardSkillsMatrixState => state.hardSkillsMatrix;

export const { setHardSkillsMatrixIsLoading, setCurrentHardSkillsMatrix, setCurrentPosition, setCurrentSkillGroups } =
  harSkillsMatrix.actions;
