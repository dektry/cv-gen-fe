import { createSlice } from '@reduxjs/toolkit';

import { appStoreName } from 'store/reducers/cvGeneration/actionTypes';
import { RootState } from 'store/index';
import { fetchCvGenerationTemplate, downloadCv, fetchGroupOfTemplates } from 'store/reducers/cvGeneration/thunks';

export type TTemplatesDic = { [name: string]: string };

type TInitialStateCvGeneration = {
  templates: TTemplatesDic;
  description: string;
  isLoading: boolean;
  isGeneratingPdf: boolean;
};

const initialState: TInitialStateCvGeneration = {
  templates: {},
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
      state.templates = { ...state.templates, ...payload };
      state.isLoading = false;
    });
    builder.addCase(fetchCvGenerationTemplate.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCvGenerationTemplate.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(downloadCv.fulfilled, (state) => {
      state.isGeneratingPdf = false;
    });
    builder.addCase(downloadCv.pending, (state) => {
      state.isGeneratingPdf = true;
    });
    builder.addCase(downloadCv.rejected, (state) => {
      state.isGeneratingPdf = false;
    });
    builder.addCase(fetchGroupOfTemplates.fulfilled, (state, { payload }) => {
      state.templates = { ...state.templates, ...payload };

      state.isLoading = false;
    });
    builder.addCase(fetchGroupOfTemplates.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchGroupOfTemplates.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const cvGenerationSelector = (state: RootState) => state.cvGeneration;

export default cvGeneration.reducer;
