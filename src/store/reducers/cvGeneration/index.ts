import { createSlice } from '@reduxjs/toolkit';

import { appStoreName } from 'store/reducers/cvGeneration/actionTypes';
import { RootState } from 'store/index';
import {
  fetchCvGenerationTemplate,
  downloadCv,
  fetchGroupOfTemplates,
  fetchProfSkills,
} from 'store/reducers/cvGeneration/thunks';
import { TProfSkill } from 'Pages/CVGeneration';

export type TTemplatesDic = { [name: string]: string };

type TInitialStateCvGeneration = {
  templates: TTemplatesDic;
  description: string;
  profSkills: TProfSkill[];
  isLoading: boolean;
  isGeneratingPdf: boolean;
};

const initialState: TInitialStateCvGeneration = {
  templates: {},
  description: '',
  profSkills: [],
  isLoading: false,
  isGeneratingPdf: false,
};

const cvGeneration = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    resetCvGeneration: (state) => ({
      ...initialState,
      templates: state.templates,
    }),
  },
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
    builder.addCase(fetchProfSkills.fulfilled, (state, { payload }) => {
      state.profSkills = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchProfSkills.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProfSkills.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { resetCvGeneration } = cvGeneration.actions;

export const cvGenerationSelector = (state: RootState) => state.cvGeneration;

export default cvGeneration.reducer;
