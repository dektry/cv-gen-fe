import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';

import { RootState } from '../..';

import { appStoreName } from 'store/reducers/hardSkillsMatrix/actionTypes';
import { IFormHardSkillsMatrix, IHardSkillsMatrix, IHardSkillsMatrixState, ISkill } from 'models/IHardSkillsMatrix';
import { IDBPosition } from 'models/IUser';

import {
  getAllHardSkillsMatrix,
  copyHardSkillsMatrix,
  getOneHardSkillsMatrix,
  createHardSkillsMatrix,
  editHardSkillsMatrix,
} from './thunks';

import { sortSkillLevels } from 'store/helpers/sortLevels';

import paths from 'config/routes.json';

const initialState: IHardSkillsMatrixState = {
  matrix: [],
  currentMatrix: {} as IFormHardSkillsMatrix,
  hardSkillMatrixLoading: false,
  isAssessmentPage: false,
};

const hardSkillsMatrix = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    setHardSkillsMatrixIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.hardSkillMatrixLoading = payload;
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
    setCurrentHardSkillsMatrixId: (state, { payload }: PayloadAction<string>) => {
      state.currentMatrix.id = payload;
    },
    setIsAssessmentPage: (state, { payload }: PayloadAction<boolean>) => {
      state.isAssessmentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllHardSkillsMatrix.pending, (state) => {
      state.hardSkillMatrixLoading = true;
    });
    builder.addCase(getAllHardSkillsMatrix.fulfilled, (state, { payload }) => {
      state.hardSkillMatrixLoading = false;
      state.matrix = payload;
    });
    builder.addCase(getAllHardSkillsMatrix.rejected, (state) => {
      state.hardSkillMatrixLoading = false;
    });
    builder.addCase(copyHardSkillsMatrix.pending, (state) => {
      state.hardSkillMatrixLoading = true;
    });
    builder.addCase(copyHardSkillsMatrix.rejected, (state) => {
      state.hardSkillMatrixLoading = false;
    });
    builder.addCase(copyHardSkillsMatrix.fulfilled, (state, { payload }) => {
      state.hardSkillMatrixLoading = false;
      if (payload) {
        state.currentMatrix.id = payload.hardSkillMatrixId;
        window.location.replace(`${paths.hardSkillsMatrixDetails.replace(':id', payload.hardSkillMatrixId)}`);
      }
    });
    builder.addCase(getOneHardSkillsMatrix.pending, (state) => {
      state.hardSkillMatrixLoading = true;
    });
    builder.addCase(getOneHardSkillsMatrix.rejected, (state) => {
      state.hardSkillMatrixLoading = false;
    });
    builder.addCase(getOneHardSkillsMatrix.fulfilled, (state, { payload }) => {
      state.hardSkillMatrixLoading = false;
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
    builder.addCase(createHardSkillsMatrix.fulfilled, () => {
      message.success('Matrix was created successfully');
      setTimeout(() => {
        window.location.replace(`${paths.settingsHardSkillsMatrixList}`);
      }, 1000);
    });
    builder.addCase(editHardSkillsMatrix.fulfilled, (state) => {
      if (!state.isAssessmentPage) {
        message.success('Changes saved successfully');
        setTimeout(() => {
          window.location.replace(`${paths.settingsHardSkillsMatrixList}`);
        }, 1000);
      }
    });
  },
});

export default hardSkillsMatrix.reducer;

export const hardSkillsMatrixSelector = (state: RootState): IHardSkillsMatrixState => state.hardSkillsMatrix;

export const {
  setHardSkillsMatrixIsLoading,
  setCurrentHardSkillsMatrix,
  setCurrentPosition,
  setCurrentSkillGroups,
  setCurrentHardSkillsMatrixId,
  setIsAssessmentPage,
} = hardSkillsMatrix.actions;
