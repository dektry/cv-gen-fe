import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';

import { RootState } from '../..';

import { appStoreName } from 'store/reducers/hardSkillsMatrix/actionTypes';
import {
  IFormHardSkillsMatrix,
  IHardSkillsMatrix,
  IHardSkillsMatrixState,
  ISkill,
  ISkillGroup,
} from 'models/IHardSkillsMatrix';
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
    builder.addCase(copyHardSkillsMatrix.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(copyHardSkillsMatrix.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(copyHardSkillsMatrix.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      if (payload) {
        state.currentMatrix.id = payload.hardSkillMatrixId;
        window.location.replace(`${paths.hardSkillsMatrixDetails.replace(':id', payload.hardSkillMatrixId)}`);
      }
    });
    builder.addCase(getOneHardSkillsMatrix.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOneHardSkillsMatrix.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getOneHardSkillsMatrix.fulfilled, (state, { payload }) => {
      state.isLoading = false;
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
        window.location.replace(`${paths.settings}`);
      }, 1000);
    });
    builder.addCase(editHardSkillsMatrix.fulfilled, () => {
      message.success('Changes saved successfully');
      setTimeout(() => {
        window.location.replace(`${paths.settings}`);
      }, 1000);
    });
  },
});

export default harSkillsMatrix.reducer;

export const hardSkillsMatrixSelector = (state: RootState): IHardSkillsMatrixState => state.hardSkillsMatrix;

export const { setHardSkillsMatrixIsLoading, setCurrentHardSkillsMatrix, setCurrentPosition, setCurrentSkillGroups } =
  harSkillsMatrix.actions;
