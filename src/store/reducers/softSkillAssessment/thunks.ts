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
import { IFormSoftSkillsMatrix } from 'models/ISoftSkillsMatrix';

import {
  completeSoftSkillAssessment,
  loadAllSoftSkillAssessments,
  loadAOneSoftSkillAssessment,
  editSoftSkillAssessment,
  deleteSoftSkillAssessmentAction,
  getSoftAssessmentResultsAction,
  getSoftAssessmentsComparisonAction,
} from './actionTypes';
import { ISoftAssessment } from 'models/ISoftAssessment';

export const getAllSoftSkillAssessments = createAsyncThunk(loadAllSoftSkillAssessments, (employeeId: string) => {
  return httpGetAllSoftAssessments(employeeId);
});

export const getOneSoftAssessment = createAsyncThunk(loadAOneSoftSkillAssessment, (assessmentId: string) => {
  return httpGetSoftAssessment(assessmentId);
});

export const completeSoftAssessment = createAsyncThunk(
  completeSoftSkillAssessment,
  (assessment: IFormSoftSkillsMatrix) => {
    return httpCompleteSoftAssessment(assessment);
  }
);

export const editSoftAssessment = createAsyncThunk(editSoftSkillAssessment, (assessment: ISoftAssessment) => {
  return httpEditSoftAssessment(assessment);
});

export const deleteSoftAssessment = createAsyncThunk(deleteSoftSkillAssessmentAction, (id: string) => {
  return httpDeleteSoftAssessment(id);
});

export const getSoftAssessmentResults = createAsyncThunk(getSoftAssessmentResultsAction, (id: string) => {
  return httpGetSoftAssessmentResults(id);
});

export const getSoftAssessmentsComparison = createAsyncThunk(getSoftAssessmentsComparisonAction, (id: string) => {
  return httpGetSoftAssessmentsComparison(id);
});
