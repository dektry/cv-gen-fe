import { message } from 'antd';

import { apiClient } from 'services/apiService';
import endpoints from 'config/endpoint.json';

export const httpGetAllSoftSkillsMatrix = async () => {
  try {
    const { data } = await apiClient.get(endpoints.softSkillsMatrix);
    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_HARD_SKILLS_MATRIX_ERROR]', error);
    if (500 <= error.status && error.status <= 599) {
      message.error(`Server error: ${error.message}`);
    } else {
      message.error(`Server error. Please, contact admin`);
    }
  }
};

export const httpGetOneSoftSkillsMatrix = async (id: string) => {
  try {
    const { data } = await apiClient.get(`${endpoints.softSkillsMatrix}/${id}`);
    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_ONE_SOFT_SKILLS_MATRIX_ERROR]', error);
    if (500 <= error.status && error.status <= 599) {
      message.error(`Server error: ${error.message}`);
    } else {
      message.error(`Server error. Please, contact admin`);
    }
  }
};

export const httpDeleteSoftSkillsMatrix = async (id: string) => {
  try {
    await apiClient.delete(`${endpoints.softSkillsMatrix}/${id}`);
  } catch (error) {
    console.error('[API_CLIENT_DELETE_SOFT_SKILLS_MATRIX_ERROR]', error);
    if (500 <= error.status && error.status <= 599) {
      message.error(`Server error: ${error.message}`);
    } else {
      message.error(`Server error. Please, contact admin`);
    }
  }
};
