import { message } from 'antd';

import { apiClient } from 'services/apiService';
import Helper from '../helper';
import endpoints from '../config/endpoint.json';

import { ICompleteInterview } from 'models/IInterview';

export const completeInterview = async (interview: ICompleteInterview) => {
  try {
    const { data } = await apiClient.post(endpoints.interviews, interview);
    return { ...data };
  } catch (error) {
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const editInterview = async (interview: ICompleteInterview) => {
  try {
    const { data } = await apiClient.put(endpoints.interviews, interview);
    return { ...data };
  } catch (error) {
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const loadInterviewResultRequest = async (
  candidateId: string,
) => {
  try {
    const { data } = await apiClient.get(`${endpoints.interviews}/${candidateId}`);
    return data;
  } catch (error) {
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};