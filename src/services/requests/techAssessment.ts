import { message } from 'antd';

import { apiClient } from 'services/apiService';
import endpoints from 'config/endpoint.json';
import { IFormAssessmentResult } from 'models/ITechAssessment';

export const getAllTechAssessments = async (id: string) => {
  try {
    const { data } = await apiClient.get(`${endpoints.employeeInterviews}/${id}/all`);

    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_ALL_TECH_ASSESSMENTS_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpGetTechAssessment = async (id: string) => {
  try {
    const { data } = await apiClient.get(`${endpoints.employeeInterviews}/${id}`);

    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_TECH_ASSESSMENT_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpGetTechAssessmentResults = async (id: string) => {
  try {
    const { data } = await apiClient.get(`${endpoints.employeeInterviews}/${id}/result`);

    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_TECH_ASSESSMENT_RESULT_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpCompleteTechAssessment = async (assessment: IFormAssessmentResult) => {
  try {
    const { data } = await apiClient.post(endpoints.employeeInterviews, assessment);

    return data;
  } catch (error) {
    console.error('[API_CLIENT_COMPLETE_TECH_ASSESSMENTS_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpEditTechAssessment = async (assessment: IFormAssessmentResult, id: string) => {
  try {
    const { data } = await apiClient.put(`${endpoints.employeeInterviews}/${id}`, assessment);

    return data;
  } catch (error) {
    console.error('[API_CLIENT_EDIT_TECH_ASSESSMENTS_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};
