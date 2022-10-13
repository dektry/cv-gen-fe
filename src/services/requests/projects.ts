import { message } from 'antd';

import { apiClient } from '../apiService';

import endpoints from 'config/endpoint.json';

export const httpGetProjectsList = async (employeeId: string) => {
  try {
    const { data } = await apiClient.get(`${endpoints.projects}/${employeeId}/all`);

    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_SKILL_MATRIX_BY_POSITION_ID_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};
