import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  httpCompleteSoftAssessment,
  httpEditSoftAssessment,
  httpGetAllSoftAssessments,
  httpGetSoftAssessment,
} from 'actions/softAssessment';
import { ICompleteSoftAssessment } from 'models/ISoftAssessment';

import {
  completeSoftSkillAssessment,
  loadAllSoftSkillAssessments,
  loadAOneSoftSkillAssessment,
  editSoftSkillAssessment,
} from './actionTypes';

export const getAllSoftSkillAssessments = createAsyncThunk(loadAllSoftSkillAssessments, (employeeId: string) => {
  return httpGetAllSoftAssessments(employeeId);
});

export const getOneSoftAssessment = createAsyncThunk(loadAOneSoftSkillAssessment, (assessmentId: string) => {
  return httpGetSoftAssessment(assessmentId);
});

export const completeSoftAssessment = createAsyncThunk(
  completeSoftSkillAssessment,
  (assessment: ICompleteSoftAssessment) => {
    return httpCompleteSoftAssessment(assessment);
  }
);

export const editSoftAssessment = createAsyncThunk(editSoftSkillAssessment, (assessment: ICompleteSoftAssessment) => {
  return httpEditSoftAssessment(assessment);
});
