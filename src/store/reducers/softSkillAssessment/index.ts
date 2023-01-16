import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';

import { RootState } from 'store';

import { appStoreName } from './actionTypes';
import {
  getAllSoftSkillAssessments,
  getOneSoftAssessment,
  getSoftAssessmentResults,
  getSoftAssessmentsComparison,
  completeSoftAssessment,
  editSoftAssessment,
} from './thunks';

import { ISoftAssessmentState, ISoftSkill, ISoftAssessment } from 'models/ISoftAssessment';
import { IAssessmentHistoryRecord, IAssessmentsComparison } from 'models/ICommon';

import { defaultCurrentPage, defaultPageSize } from 'store/constants';
import paths from 'config/routes.json';

const initialState: ISoftAssessmentState = {
  assessments: [],
  assessmentsHistory: [],
  assessmentShortResult: null,
  softSkillsList: [],
  isLoading: false,
  isHistoryLoading: false,
  pageSize: defaultPageSize,
  currentPage: defaultCurrentPage,
  assessmentResult: null,
  chosenLevel: undefined,
  chosenPosition: undefined,
  assessmentsComparison: null,
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
    setAssessmentsComparison: (state, { payload }: PayloadAction<IAssessmentsComparison | null>) => {
      state.assessmentsComparison = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSoftSkillAssessments.pending, (state) => {
      state.isHistoryLoading = true;
    });
    builder.addCase(getAllSoftSkillAssessments.rejected, (state) => {
      state.isHistoryLoading = false;
    });
    builder.addCase(getAllSoftSkillAssessments.fulfilled, (state, { payload }) => {
      if (payload.length) {
        const processedAssessments = payload.map((el: IAssessmentHistoryRecord) => {
          return {
            ...el,
            created: new Date(el.created).toLocaleDateString(),
            updated: new Date(el.updated).toLocaleDateString(),
          };
        });
        state.assessmentsHistory = processedAssessments;
        state.isHistoryLoading = false;
      } else {
        state.assessmentsHistory = [];
        state.isHistoryLoading = false;
      }
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
    builder.addCase(getSoftAssessmentResults.fulfilled, (state, { payload }) => {
      state.assessmentShortResult = payload;
    });
    builder.addCase(getSoftAssessmentsComparison.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSoftAssessmentsComparison.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getSoftAssessmentsComparison.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.assessmentsComparison = payload;
    });
    builder.addCase(completeSoftAssessment.fulfilled, () => {
      message.success('Soft assessment was created successfully');
      setTimeout(() => {
        window.location.replace(
          `${paths.softSkillAssessmentHistory.replace(
            ':id',
            window.location.pathname.split('/employee/')[1].split('/soft-interview')[0]
          )}`
        );
      }, 1000);
    });
    builder.addCase(editSoftAssessment.fulfilled, () => {
      message.success('Changes to soft assessment saved successfully');
      setTimeout(() => {
        window.location.replace(
          `${paths.softSkillAssessmentHistory.replace(
            ':id',
            window.location.pathname.split('/employee/')[1].split('/soft-interview')[0]
          )}`
        );
      }, 1000);
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
  setAssessmentsComparison,
} = softSkillAssessment.actions;
