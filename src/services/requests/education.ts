import { message } from 'antd';
import { apiClient } from '../apiService';
import endpoints from 'config/endpoint.json';
import { ICvEducation } from 'Pages/CVGeneration/components/CVGenerationInfo';

export const httpGetEducation = async (employeeId: string) => {
  try {
    const { data } = await apiClient.get(`${endpoints.education}/${employeeId}`);

    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_EDUCATION_LIST_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpPostEducation = async (education: ICvEducation) => {
  try {
    await apiClient.post(endpoints.education, education);
  } catch (error) {
    console.error('[API_CLIENT_POST_EDUCATION_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpPutEducation = async (education: ICvEducation) => {
  try {
    await apiClient.put(endpoints.education, education);
  } catch (error) {
    console.error('[API_CLIENT_PUT_EDUCATION_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpDeleteEducation = async (educationId: string) => {
  try {
    await apiClient.delete(`${endpoints.education}/${educationId}`);
  } catch (error) {
    console.error('[API_CLIENT_DELETE_EDUCATION_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};
