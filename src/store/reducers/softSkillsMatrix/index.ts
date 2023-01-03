import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';

import { appStoreName } from 'store/reducers/hardSkillsMatrix/actionTypes';
import { ISoftSkillsMatrix, ISoftSkillsMatrixState, ISkill, IFormSoftSkillsMatrix } from 'models/ISoftSkillsMatrix';
import { IDBPosition } from 'models/IUser';

import { getAllSoftSkillsMatrix, getOneSoftSkillsMatrix } from './thunks';

import { sortSkillLevels } from 'store/helpers/sortLevels';

const initialState: ISoftSkillsMatrixState = {
  matrix: [],
  currentMatrix: {} as IFormSoftSkillsMatrix,
  softSkillMatrixLoading: false,
  isAssessmentPage: false,
};

const softSkillsMatrix = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    setSoftSkillsMatrixIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.softSkillMatrixLoading = payload;
    },
    setCurrentSoftSkillsMatrix: (state, { payload }: PayloadAction<ISoftSkillsMatrix>) => {
      state.currentMatrix = payload;
    },
    setCurrentPosition: (state, { payload }: PayloadAction<IDBPosition>) => {
      state.currentMatrix.position = payload;
    },
    setCurrentSkillGroups: (state, { payload }: PayloadAction<IFormSoftSkillsMatrix>) => {
      if (payload.skillGroups) {
        state.currentMatrix.skillGroups = payload.skillGroups;
      }
    },
    setCurrentSoftSkillsMatrixId: (state, { payload }: PayloadAction<string>) => {
      state.currentMatrix.id = payload;
    },
    setIsAssessmentPage: (state, { payload }: PayloadAction<boolean>) => {
      state.isAssessmentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSoftSkillsMatrix.pending, (state) => {
      state.softSkillMatrixLoading = true;
    });
    builder.addCase(getAllSoftSkillsMatrix.fulfilled, (state, { payload }) => {
      state.softSkillMatrixLoading = false;
      state.matrix = payload;
    });
    builder.addCase(getAllSoftSkillsMatrix.rejected, (state) => {
      state.softSkillMatrixLoading = false;
    });
    builder.addCase(getOneSoftSkillsMatrix.pending, (state) => {
      state.softSkillMatrixLoading = true;
    });
    builder.addCase(getOneSoftSkillsMatrix.rejected, (state) => {
      state.softSkillMatrixLoading = false;
    });
    builder.addCase(getOneSoftSkillsMatrix.fulfilled, (state, { payload }) => {
      state.softSkillMatrixLoading = false;
      for (const group of payload.skillGroups) {
        group.skills = group.skills?.map((skill: ISkill) => {
          const levels = sortSkillLevels(skill.levels);

          return {
            ...skill,
            levels,
          };
        });
      }

      state.currentMatrix = payload;
    });
  },
});

export default softSkillsMatrix.reducer;

export const softSkillsMatrixSelector = (state: RootState): ISoftSkillsMatrixState => state.softSkillsMatrix;

export const {
  setSoftSkillsMatrixIsLoading,
  setCurrentSoftSkillsMatrix,
  setCurrentPosition,
  setCurrentSkillGroups,
  setCurrentSoftSkillsMatrixId,
  setIsAssessmentPage,
} = softSkillsMatrix.actions;
