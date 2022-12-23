import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';

import {
  appStoreName,
  loadAllTechAssessmentsAction,
  completeTechAssessmentAction,
  editTechAssessmentAction,
  getTechAssessmentAction,
} from 'store/reducers/techAssessment/actionTypes';
import {
  getAllTechAssessments,
  httpCompleteTechAssessment,
  httpEditTechAssessment,
  httpGetTechAssessment,
} from 'services/requests/techAssessment';

import {
  IAssessmentFromDB,
  IAssessmentHistoryRecord,
  ICompleteAssessment,
  ITechAssessmentState,
} from 'models/ITechAssessment';
import { defaultCurrentPage, defaultPageSize } from 'store/constants';
import { message } from 'antd';

export const loadTechAssessments = createAsyncThunk(loadAllTechAssessmentsAction, (id: string) =>
  getAllTechAssessments(id)
);

export const finishTechAssessment = createAsyncThunk(
  completeTechAssessmentAction,
  (assessment: ICompleteAssessment) => {
    return httpCompleteTechAssessment(assessment);
  }
);

export const editTechAssessment = createAsyncThunk(editTechAssessmentAction, (assessment: ICompleteAssessment) => {
  return httpEditTechAssessment(assessment);
});

export const getTechAssessment = createAsyncThunk(getTechAssessmentAction, (id: string) => {
  return httpGetTechAssessment(id);
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
  },
  extraReducers: (builder) => {
    builder.addCase(loadTechAssessments.pending, (state) => {
      state.isLoading = true;
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
        state.isLoading = false;
      } else {
        state.assessmentsHistory = [];
        state.isLoading = false;
      }
    });
    builder.addCase(loadTechAssessments.rejected, (state) => {
      state.isLoading = false;
      message.error(`Server error. Please contact admin`);
    });
    builder.addCase(getTechAssessment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTechAssessment.fulfilled, (state, { payload }) => {
      state.assessmentResult = {
        ...payload.interview,
        answers: payload.answers,
      };
      state.isLoading = false;
    });
    builder.addCase(getTechAssessment.rejected, (state) => {
      state.isLoading = false;
      message.error(`Server error. Please contact admin`);
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
