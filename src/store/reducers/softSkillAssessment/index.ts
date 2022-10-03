import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';

import { appStoreName } from './actionTypes';
import { getAllSoftSkillAssessments, getOneSoftAssessment } from './thunks';

import { ISoftAssessmentState, ISoftSkill, ISoftAssessment } from 'models/ISoftAssessment';

import { defaultCurrentPage, defaultPageSize } from 'store/constants';

const initialState: ISoftAssessmentState = {
  assessments: [],
  softSkillsList: [],
  isLoading: false,
  pageSize: defaultPageSize,
  currentPage: defaultCurrentPage,
  assessmentResult: null,
  chosenLevel: undefined,
  chosenPosition: undefined,
};

const softSkillAssessment = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    setSoftAssessmentResult: (state, { payload }: PayloadAction<ISoftAssessment>) => {
      state.assessmentResult = payload;
    },
    setSoftSkillsList: (state, { payload }: PayloadAction<ISoftSkill[]>) => {
      state.softSkillsList = payload;
    },
    addNewSkill: (state, { payload }: PayloadAction<ISoftSkill>) => {
      const softSkillsList = [...state.softSkillsList];
      softSkillsList.push(payload);
      state.softSkillsList = softSkillsList;
    },
    chooseInterviewPosition: (state, { payload }: PayloadAction<string | undefined>) => {
      state.chosenPosition = payload;
    },
    chooseInterviewLevel: (state, { payload }: PayloadAction<string | undefined>) => {
      state.chosenLevel = payload;
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSoftSkillAssessments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllSoftSkillAssessments.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getAllSoftSkillAssessments.fulfilled, (state, { payload }) => {
      if (payload.length) {
        const processedAssessments = payload.map((el: ISoftAssessment) => {
          return {
            id: el.id,
            date: new Date(el.createdAt).toLocaleDateString(),
            position: el.position?.name,
            level: el.level?.name,
            type: 'Assessment',
          };
        });
        state.assessments = processedAssessments;
      }
      state.isLoading = false;
    });
    builder.addCase(getOneSoftAssessment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOneSoftAssessment.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getOneSoftAssessment.fulfilled, (state, { payload }) => {
      state.assessmentResult = payload;
      state.isLoading = false;
    });
  },
});

export default softSkillAssessment.reducer;

export const softSkillInterviewSelector = (state: RootState): ISoftAssessmentState => state.softSkillAssessment;

export const {
  setSoftAssessmentResult,
  addNewSkill,
  setSoftSkillsList,
  chooseInterviewLevel,
  chooseInterviewPosition,
  setIsLoading,
} = softSkillAssessment.actions;
