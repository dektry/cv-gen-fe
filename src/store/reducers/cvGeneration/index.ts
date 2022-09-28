import { createSlice } from '@reduxjs/toolkit';

import { appStoreName } from 'store/reducers/cvGeneration/actionTypes';
import { RootState } from 'store/index';
import { fetchCvGenerationTemplate, generateCv } from 'store/reducers/cvGeneration/thunks';

type InitialStateCvGeneration = {
  template: string;
  description: string;
  isLoading: boolean;
  isGeneratingPdf: boolean;
};

const initialState: InitialStateCvGeneration = {
  template: '',
  description: '',
  isLoading: false,
  isGeneratingPdf: false,
};

const cvGeneration = createSlice({
  name: appStoreName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCvGenerationTemplate.fulfilled, (state, { payload }) => {
      state.template = payload || '';
      state.isLoading = false;
    });
    builder.addCase(fetchCvGenerationTemplate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCvGenerationTemplate.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(generateCv.fulfilled, (state) => {
      state.isGeneratingPdf = false;
    });
    builder.addCase(generateCv.pending, (state) => {
      state.isGeneratingPdf = true;
    });
    builder.addCase(generateCv.rejected, (state) => {
      state.isGeneratingPdf = false;
    });
  },
});

export const cvGenerationSelector = (state: RootState) => state.cvGeneration;

export default cvGeneration.reducer;
