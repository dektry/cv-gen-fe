import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';

import { appStoreName } from './actionTypes';
import {
  completeSoftAssessment,
  getAllSoftSkillAssessments,
  getOneSoftAssessment,
  loadSoftSkillsList,
  softSkillScores,
} from './thunks';

import { ISoftAssessmentState, ISoftSkill, ISoftAssessment } from 'models/ISoftAssessment';

import { defaultCurrentPage, defaultPageSize } from 'store/constants';

const initialState: ISoftAssessmentState = {
  assessments: [],
  softSkillsList: [],
  scores: [],
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
    setSoftAssessmentList: (state, { payload }: PayloadAction<ISoftAssessment[] | []>) => {
      state.assessments = payload;
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
            softSkills: el.softSkills,
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
    builder.addCase(loadSoftSkillsList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadSoftSkillsList.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(loadSoftSkillsList.fulfilled, (state, { payload }) => {
      const processedSkills = payload.map((skill: ISoftSkill) => {
        return {
          id: skill.id,
          value: skill.value,
          comment: skill.comment,
          questions: skill.questions,
          score: skill.score,
        };
      });
      state.softSkillsList = processedSkills;
      state.isLoading = false;
    });
    builder.addCase(softSkillScores.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(softSkillScores.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(softSkillScores.fulfilled, (state, { payload }) => {
      state.scores = payload;
      state.isLoading = false;
    });
    builder.addCase(completeSoftAssessment.fulfilled, (state, { payload }) => {
      state.assessmentResult = payload;
    });
  },
});

export default softSkillAssessment.reducer;

export const softSkillAssessmentSelector = (state: RootState): ISoftAssessmentState => state.softSkillAssessment;

export const {
  setSoftAssessmentResult,
  addNewSkill,
  setSoftSkillsList,
  chooseInterviewLevel,
  chooseInterviewPosition,
  setIsLoading,
  setSoftAssessmentList,
} = softSkillAssessment.actions;
