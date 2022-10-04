import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  httpCompleteSoftAssessment,
  httpEditSoftAssessment,
  httpGetAllSoftAssessments,
  httpGetSoftAssessment,
} from 'services/requests/softAssessment';
import { getSoftSkillsList, uploadNewSkill, getSoftSkillScores } from 'services/requests/skills';
import { ISoftAssessment, ISoftSkill } from 'models/ISoftAssessment';

import {
  completeSoftSkillAssessment,
  loadAllSoftSkillAssessments,
  loadAOneSoftSkillAssessment,
  editSoftSkillAssessment,
  loadSoftSkillsListAction,
  loadSoftSkillScores,
  addNewSkillAction,
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

export const addNewSkillToDB = createAsyncThunk(addNewSkillAction, (data: Partial<ISoftSkill>) => uploadNewSkill(data));

export const softSkillScores = createAsyncThunk(loadSoftSkillScores, () => getSoftSkillScores());

export const loadSoftSkillsList = createAsyncThunk(loadSoftSkillsListAction, () => getSoftSkillsList());
