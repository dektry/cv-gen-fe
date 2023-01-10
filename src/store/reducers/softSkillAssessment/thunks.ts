import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  httpCompleteSoftAssessment,
  httpEditSoftAssessment,
  httpGetAllSoftAssessments,
  httpGetSoftAssessment,
  httpDeleteSoftAssessment,
  httpGetSoftAssessmentResults,
} from 'services/requests/softAssessment';
import { ISoftAssessment } from 'models/ISoftAssessment';

import {
  completeSoftSkillAssessment,
  loadAllSoftSkillAssessments,
  loadAOneSoftSkillAssessment,
  editSoftSkillAssessment,
  deleteSoftSkillAssessmentAction,
  getSoftAssessmentResultsAction,
} from './actionTypes';

export const getAllSoftSkillAssessments = createAsyncThunk(loadAllSoftSkillAssessments, (employeeId: string) => {
  return httpGetAllSoftAssessments(employeeId);
});

export const getOneSoftAssessment = createAsyncThunk(loadAOneSoftSkillAssessment, (assessmentId: string) => {
  return httpGetSoftAssessment(assessmentId);
});

export const completeSoftAssessment = createAsyncThunk(completeSoftSkillAssessment, (assessment: ISoftAssessment) => {
  return httpCompleteSoftAssessment(assessment);
});

export const editSoftAssessment = createAsyncThunk(editSoftSkillAssessment, (assessment: ISoftAssessment) => {
  return httpEditSoftAssessment(assessment);
});

export const deleteSoftAssessment = createAsyncThunk(deleteSoftSkillAssessmentAction, (id: string) => {
  return httpDeleteSoftAssessment(id);
});

export const getSoftAssessmentResults = createAsyncThunk(getSoftAssessmentResultsAction, (id: string) => {
  return httpGetSoftAssessmentResults(id);
});
