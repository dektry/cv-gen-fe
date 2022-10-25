import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

import { appStoreName } from './actionTypes';

import { getEducation } from './thunks';

import { IEducation, IEducationState } from 'models/IEducation';

const initialState: IEducationState = {
  educationIsLoading: false,
  education: [],
};

const education = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    setEducationList: (state, { payload }: PayloadAction<IEducation[]>) => {
      state.education = payload;
    },
    setIsEducationLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.educationIsLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEducation.pending, (state) => {
      state.educationIsLoading = true;
    });
    builder.addCase(getEducation.rejected, (state) => {
      state.educationIsLoading = false;
    });
    builder.addCase(getEducation.fulfilled, (state, { payload }) => {
      if (payload) {
        state.education = payload;
      }
    });
  },
});

export default education.reducer;

export const educationSelector = (state: RootState): IEducationState => state.education;

export const { setEducationList, setIsEducationLoading } = education.actions;
