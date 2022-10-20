import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

import { appStoreName } from './actionTypes';

import { getSoftSkillsToCvList, getSoftSkillsToCvOfEmployee } from './thunks';

import { ISoftSkillToCv, ISoftSkillsToCvState } from 'models/ISoftSkillToCv';

const initialState: ISoftSkillsToCvState = {
  skills: [],
  skillsOfEmployee: [],
  softSkillsToCvLoading: false,
};

const softSkillsToCv = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    setSoftSkillsToCvList: (state, { payload }: PayloadAction<string[]>) => {
      state.skills = payload;
    },
    setSoftSkillsToCvOfEmployee: (state, { payload }: PayloadAction<string[]>) => {
      state.skillsOfEmployee = payload;
    },
    setsoftSkillsToCvLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.softSkillsToCvLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSoftSkillsToCvList.pending, (state) => {
      state.softSkillsToCvLoading = true;
    });
    builder.addCase(getSoftSkillsToCvList.rejected, (state) => {
      state.softSkillsToCvLoading = false;
    });
    builder.addCase(getSoftSkillsToCvList.fulfilled, (state, { payload }) => {
      if (payload && payload.softSkillsToCv) {
        const processedSoftSkillsToCv: string[] = payload.softSkillsToCv.map((el: ISoftSkillToCv) => el.name);
        state.skills = processedSoftSkillsToCv;
      }
      state.softSkillsToCvLoading = false;
    });
    builder.addCase(getSoftSkillsToCvOfEmployee.pending, (state) => {
      state.softSkillsToCvLoading = true;
    });
    builder.addCase(getSoftSkillsToCvOfEmployee.rejected, (state) => {
      state.softSkillsToCvLoading = false;
    });
    builder.addCase(getSoftSkillsToCvOfEmployee.fulfilled, (state, { payload }) => {
      if (payload) {
        const processedSoftSkillsToCvOfEmployee: string[] = payload.map((el: ISoftSkillToCv) => el.name);
        state.skillsOfEmployee = processedSoftSkillsToCvOfEmployee;
      }
      state.softSkillsToCvLoading = false;
    });
  },
});

export default softSkillsToCv.reducer;

export const softSkillsToCvSelector = (state: RootState): ISoftSkillsToCvState => state.softSkillsToCV;

export const { setSoftSkillsToCvList, setSoftSkillsToCvOfEmployee, setsoftSkillsToCvLoading } = softSkillsToCv.actions;
