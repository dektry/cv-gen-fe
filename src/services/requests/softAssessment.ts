import { message } from 'antd';

import { apiClient } from 'services/apiService';
import endpoints from 'config/endpoint.json';

import { ISoftAssessment } from 'models/ISoftAssessment';

export const httpGetAllSoftAssessments = async (id: string) => {
  try {
    const { data } = await apiClient.get(`${endpoints.employeeSoftAssessments}/${id}/all`);

    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_ALL_SOFT_ASSESSMENTS_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpGetSoftAssessment = async (id: string) => {
  try {
    const { data } = await apiClient.get(`${endpoints.employeeSoftAssessments}/${id}`);

    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_SOFT_OFTASSESSMENT_ERROR]', error);
    message.error('Server error. Please contact admin');
  }
};

export const httpGetSoftAssessmentResults = async (id: string) => {
  try {
    const { data } = await apiClient.get(`${endpoints.employeeSoftAssessments}/${id}/result`);

    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_SOFT_ASSESSMENT_RESULT_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpCompleteSoftAssessment = async (assessment: ISoftAssessment) => {
  try {
    const { data } = await apiClient.post(endpoints.employeeSoftAssessments, assessment);

    return data;
  } catch (error) {
    console.error('[API_CLIENT_COMPLETE_SOFT_ASSESSMENTS_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpEditSoftAssessment = async (assessment: ISoftAssessment) => {
  try {
    const { data } = await apiClient.put(`${endpoints.employeeInterviews}/${assessment.id}`, assessment);

    return data;
  } catch (error) {
    console.error('[API_CLIENT_EDIT_SOFT_ASSESSMENTS_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpDeleteSoftAssessment = async (id: string) => {
  try {
    await apiClient.delete(`${endpoints.employeeSoftAssessments}/${id}`);
  } catch (error) {
    console.error('[API_CLIENT_DELETE_SOFT_ASSESSMENT_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};
