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
import { IAssessmentDetailedResult } from 'models/ITechAssessment';
import { NullableField } from 'models/TNullableField';

export type TTemplatesDic = { [name: string]: string };

type TInitialStateCvGeneration = {
  templates: TTemplatesDic;
  description: string;
  profSkills: {
    data: TProfSkill[];
    isLoading: boolean;
    lastAssessment: NullableField<IAssessmentDetailedResult>;
  };
  isLoading: boolean;
  isGeneratingPdf: boolean;
};

const initialState: TInitialStateCvGeneration = {
  templates: {},
  description: '',
  profSkills: {
    data: [],
    isLoading: false,
    lastAssessment: null,
  },
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
      state.profSkills = { data: payload.profSkills, isLoading: false, lastAssessment: payload.lastAssessment };
    });
    builder.addCase(fetchProfSkills.pending, (state) => {
      state.profSkills = { data: [], isLoading: true, lastAssessment: null };
    });
    builder.addCase(fetchProfSkills.rejected, (state) => {
      state.profSkills = { data: [], isLoading: false, lastAssessment: null };
    });
  },
});

export const { resetCvGeneration } = cvGeneration.actions;

export const cvGenerationSelector = (state: RootState) => state.cvGeneration;
export const profSkillsSelector = (state: RootState) => state.cvGeneration.profSkills;

export default cvGeneration.reducer;
