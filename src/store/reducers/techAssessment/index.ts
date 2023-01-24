import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';
import paths from 'config/routes.json';

import { appStoreName } from 'store/reducers/techAssessment/actionTypes';

import { ITechAssessmentState } from 'models/ITechAssessment';
import { IAssessmentHistoryRecord, IAssessmentsComparison } from 'models/ICommon';
import { defaultCurrentPage, defaultPageSize } from 'store/constants';
import { message } from 'antd';

import {
  loadTechAssessments,
  getTechAssessment,
  getTechAssessmentResults,
  editTechAssessment,
  finishTechAssessment,
  getTechAssessmentsComparison,
} from './thunks';

const initialState: ITechAssessmentState = {
  assessments: [],
  assessmentsHistory: [],
  isLoading: false,
  pageSize: defaultPageSize,
  currentPage: defaultCurrentPage,
  chosenLevel: undefined,
  chosenPosition: undefined,
  assessmentResult: null,
  assessmentShortResult: null,
  isHistoryLoading: false,
  assessmentsComparison: null,
};

const techAssessment = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    setTechAssessments: (state, { payload }: PayloadAction<IAssessmentHistoryRecord[] | []>) => {
      state.assessmentsHistory = payload;
    },
    setPageSize: (state, { payload }: PayloadAction<number>) => {
      state.pageSize = payload;
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload;
    },
    chooseInterviewPosition: (state, { payload }: PayloadAction<string | undefined>) => {
      state.chosenPosition = payload;
    },
    chooseInterviewLevel: (state, { payload }: PayloadAction<string | undefined>) => {
      state.chosenLevel = payload;
    },
    setSkillID: (state, { payload }: PayloadAction<string>) => {
      state.skillId = payload;
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setIsHistoryLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isHistoryLoading = payload;
    },
    setAssessmentsComparison: (state, { payload }: PayloadAction<IAssessmentsComparison | null>) => {
      state.assessmentsComparison = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTechAssessments.pending, (state) => {
      state.isHistoryLoading = true;
    });
    builder.addCase(loadTechAssessments.fulfilled, (state, { payload }) => {
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
    builder.addCase(loadTechAssessments.rejected, (state) => {
      state.isHistoryLoading = false;
      message.error(`Server error. Please contact admin`);
    });
    builder.addCase(getTechAssessment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTechAssessment.fulfilled, (state, { payload }) => {
      state.assessmentResult = payload;
      state.isLoading = false;
    });
    builder.addCase(getTechAssessment.rejected, (state) => {
      state.isLoading = false;
      message.error(`Server error. Please contact admin`);
    });
    builder.addCase(finishTechAssessment.fulfilled, () => {
      message.success('Technical assessment was created successfully');
      setTimeout(() => {
        window.location.replace(
          `${paths.technicalAssessmentHistory.replace(
            ':id',
            window.location.pathname.split('/employee/')[1].split('/tech-interview')[0]
          )}`
        );
      }, 1000);
    });
    builder.addCase(editTechAssessment.fulfilled, () => {
      message.success('Changes to technical assessment saved successfully');
      // setTimeout(() => {
      //   window.location.replace(
      //     `${paths.technicalAssessmentHistory.replace(
      //       ':id',
      //       window.location.pathname.split('/employee/')[1].split('/tech-interview')[0]
      //     )}`
      //   );
      // }, 1000);
    });
    builder.addCase(getTechAssessmentResults.fulfilled, (state, { payload }) => {
      state.assessmentShortResult = payload;
    });
    builder.addCase(getTechAssessmentsComparison.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTechAssessmentsComparison.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getTechAssessmentsComparison.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.assessmentsComparison = payload;
    });
  },
});

export default techAssessment.reducer;

export const techAssessmentSelector = (state: RootState): ITechAssessmentState => state.techAssessment;

export const {
  setTechAssessments,
  setPageSize,
  setCurrentPage,
  setSkillID,
  chooseInterviewLevel,
  chooseInterviewPosition,
  setIsLoading,
  setAssessmentsComparison,
} = techAssessment.actions;
