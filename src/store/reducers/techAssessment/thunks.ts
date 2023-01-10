import { createAsyncThunk } from '@reduxjs/toolkit';

import { IFormAssessmentResult } from 'models/ITechAssessment';

import {
  loadAllTechAssessmentsAction,
  completeTechAssessmentAction,
  editTechAssessmentAction,
  getTechAssessmentAction,
  getTechAssessmentResultsAction,
  deleteTechAssessmentAction,
  getTechAssessmentsComparisonAction,
} from 'store/reducers/techAssessment/actionTypes';
import {
  getAllTechAssessments,
  httpCompleteTechAssessment,
  httpEditTechAssessment,
  httpGetTechAssessment,
  httpGetTechAssessmentResults,
  httpDeleteTechAssessment,
  httpGetTechAssessmentsComparison,
} from 'services/requests/techAssessment';

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

export const deleteTechAssessment = createAsyncThunk(deleteTechAssessmentAction, (id: string) => {
  return httpDeleteTechAssessment(id);
});

export const getTechAssessmentsComparison = createAsyncThunk(getTechAssessmentsComparisonAction, (id: string) => {
  return httpGetTechAssessmentsComparison(id);
});
