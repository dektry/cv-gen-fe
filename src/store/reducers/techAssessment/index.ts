import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';

import { appStoreName, loadAllTechAssessmentsAction } from './actions';
import { getAllTechAssessments } from 'actions/techAssessment';

import { IAssessmentFromDB, ITechAssessmentState } from 'models/ITechAssessment';
import { defaultCurrentPage, defaultPageSize } from 'store/constants';

export const loadTechAssessments = createAsyncThunk(loadAllTechAssessmentsAction, (id: string) => getAllTechAssessments(id));

const initialState: ITechAssessmentState = {
  assessments: [],
  isLoading: false,
  pageSize: defaultPageSize,
  currentPage: defaultCurrentPage,
}

const techAssessment = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    setTechAssessments: (state, { payload }: PayloadAction<IAssessmentFromDB[]>) => {
      state.assessments = payload;
    },
    setPageSize: (state, { payload }: PayloadAction<number>) => {
      state.pageSize = payload;
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTechAssessments.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadTechAssessments.fulfilled, (state, { payload }) => {      
      if (payload.length) {
        const processedAssessments = payload.map((el: IAssessmentFromDB) => {
          return {
            date: new Date(el.createdAt).toLocaleDateString(),
            position: el.position?.name,
            level: el.level?.name,
            type: 'Assessment',
          }
        })
        state.assessments = processedAssessments;
      }
      state.isLoading = false;
    });
  }
});

export default techAssessment.reducer;

export const techAssessmentSelector = (state: RootState): ITechAssessmentState => state.techAssessment;

export const { setTechAssessments } =
  techAssessment.actions;