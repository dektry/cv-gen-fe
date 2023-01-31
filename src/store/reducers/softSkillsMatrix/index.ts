import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';

import { RootState } from '../..';

import { appStoreName } from 'store/reducers/hardSkillsMatrix/actionTypes';
import { ISoftSkillsMatrixState, ISkill, IFormSoftSkillsMatrix, ILevel } from 'models/ISoftSkillsMatrix';
import { IDBPosition } from 'models/IUser';

import {
  getAllSoftSkillsMatrix,
  getOneSoftSkillsMatrix,
  copySoftSkillsMatrix,
  createSoftSkillsMatrix,
  editSoftSkillsMatrix,
} from './thunks';

import { sortSkillLevels } from 'store/helpers/sortLevels';

import paths from 'config/routes.json';

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
    setCurrentSoftSkillsMatrix: (state, { payload }: PayloadAction<IFormSoftSkillsMatrix>) => {
      state.currentMatrix = payload;
    },
    setCurrentPosition: (state, { payload }: PayloadAction<IDBPosition>) => {
      state.currentMatrix.position = payload;
    },
    setCurrentSkills: (state, { payload }: PayloadAction<IFormSoftSkillsMatrix>) => {
      if (payload.skills) {
        state.currentMatrix.skills = payload.skills;
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
      for (const group of payload.skills) {
        group.skills = group.skills?.map((skill: ISkill) => {
          const levels = sortSkillLevels(skill.levels);

          return {
            ...skill,
            levels,
          };
        });

        group.skills.sort((a: ILevel, b: ILevel) => a.order - b.order);
      }
      payload.skills.sort((a: ISkill, b: ISkill) => a.order - b.order);
      state.currentMatrix = payload;
    });
    builder.addCase(copySoftSkillsMatrix.pending, (state) => {
      state.softSkillMatrixLoading = true;
    });
    builder.addCase(copySoftSkillsMatrix.rejected, (state) => {
      state.softSkillMatrixLoading = false;
    });
    builder.addCase(copySoftSkillsMatrix.fulfilled, (state, { payload }) => {
      state.softSkillMatrixLoading = false;
      if (payload) {
        state.currentMatrix.id = payload.softSkillMatrixId;
        window.location.replace(`${paths.softSkillsMatrixDetails.replace(':id', payload.softSkillMatrixId)}`);
      }
    });
    builder.addCase(createSoftSkillsMatrix.fulfilled, () => {
      message.success('Matrix was created successfully');
      setTimeout(() => {
        window.location.replace(`${paths.settingsSoftSkillsMatrixList}`);
      }, 1000);
    });
    builder.addCase(editSoftSkillsMatrix.fulfilled, (state) => {
      if (!state.isAssessmentPage) {
        message.success('Changes saved successfully');
        setTimeout(() => {
          window.location.replace(`${paths.settingsSoftSkillsMatrixList}`);
        }, 1000);
      }
    });
  },
});

export default softSkillsMatrix.reducer;

export const softSkillsMatrixSelector = (state: RootState): ISoftSkillsMatrixState => state.softSkillsMatrix;

export const {
  setSoftSkillsMatrixIsLoading,
  setCurrentSoftSkillsMatrix,
  setCurrentPosition,
  setCurrentSkills,
  setCurrentSoftSkillsMatrixId,
  setIsAssessmentPage,
} = softSkillsMatrix.actions;
