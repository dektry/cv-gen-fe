import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';
import paths from 'config/routes.json';

import {
  appStoreName,
  loadAllTechAssessmentsAction,
  completeTechAssessmentAction,
  editTechAssessmentAction,
  getTechAssessmentAction,
  getTechAssessmentResultsAction,
} from 'store/reducers/techAssessment/actionTypes';
import {
  getAllTechAssessments,
  httpCompleteTechAssessment,
  httpEditTechAssessment,
  httpGetTechAssessment,
  httpGetTechAssessmentResults,
} from 'services/requests/techAssessment';

import { IAssessmentHistoryRecord, IFormAssessmentResult, ITechAssessmentState } from 'models/ITechAssessment';
import { defaultCurrentPage, defaultPageSize } from 'store/constants';
import { message } from 'antd';

export const loadTechAssessments = createAsyncThunk(loadAllTechAssessmentsAction, (id: string) =>
  getAllTechAssessments(id)
);

export const finishTechAssessment = createAsyncThunk(
  completeTechAssessmentAction,
  (assessment: IFormAssessmentResult) => {
    return httpCompleteTechAssessment(assessment);
  }
);

export const editTechAssessment = createAsyncThunk(
  editTechAssessmentAction,
  ({ assessment, id }: { assessment: IFormAssessmentResult; id: string }) => {
    return httpEditTechAssessment(assessment, id);
  }
);

export const getTechAssessment = createAsyncThunk(getTechAssessmentAction, (id: string) => {
  return httpGetTechAssessment(id);
});

export const getTechAssessmentResults = createAsyncThunk(getTechAssessmentResultsAction, (id: string) => {
  return httpGetTechAssessmentResults(id);
});

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
      setTimeout(() => {
        window.location.replace(
          `${paths.technicalAssessmentHistory.replace(
            ':id',
            window.location.pathname.split('/employee/')[1].split('/tech-interview')[0]
          )}`
        );
      }, 1000);
    });
    builder.addCase(getTechAssessmentResults.fulfilled, (state, { payload }) => {
      state.assessmentShortResult = payload;
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
} = techAssessment.actions;
