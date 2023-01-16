import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  httpCompleteSoftAssessment,
  httpEditSoftAssessment,
  httpGetAllSoftAssessments,
  httpGetSoftAssessment,
  httpDeleteSoftAssessment,
  httpGetSoftAssessmentResults,
  httpGetSoftAssessmentsComparison,
} from 'services/requests/softAssessment';

import {
  completeSoftSkillAssessment,
  loadAllSoftSkillAssessments,
  loadAOneSoftSkillAssessment,
  editSoftSkillAssessment,
  deleteSoftSkillAssessmentAction,
  getSoftAssessmentResultsAction,
  getSoftAssessmentsComparisonAction,
} from './actionTypes';
import { IFormSoftAssessmentResult } from 'models/ISoftAssessment';

export const getAllSoftSkillAssessments = createAsyncThunk(loadAllSoftSkillAssessments, (employeeId: string) => {
  return httpGetAllSoftAssessments(employeeId);
});

export const getOneSoftAssessment = createAsyncThunk(loadAOneSoftSkillAssessment, (assessmentId: string) => {
  return httpGetSoftAssessment(assessmentId);
});

export const completeSoftAssessment = createAsyncThunk(
  completeSoftSkillAssessment,
  (assessment: IFormSoftAssessmentResult) => {
    return httpCompleteSoftAssessment(assessment);
  }
);

export const editSoftAssessment = createAsyncThunk(
  editSoftSkillAssessment,
  ({ assessment, assessmentId }: { assessment: IFormSoftAssessmentResult; assessmentId: string }) => {
    return httpEditSoftAssessment(assessment, assessmentId);
  }
);

export const deleteSoftAssessment = createAsyncThunk(deleteSoftSkillAssessmentAction, (id: string) => {
  return httpDeleteSoftAssessment(id);
});

export const getSoftAssessmentResults = createAsyncThunk(getSoftAssessmentResultsAction, (id: string) => {
  return httpGetSoftAssessmentResults(id);
});

export const getSoftAssessmentsComparison = createAsyncThunk(getSoftAssessmentsComparisonAction, (id: string) => {
  return httpGetSoftAssessmentsComparison(id);
});
