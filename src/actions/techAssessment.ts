import { message } from 'antd';

import { apiClient } from 'services/apiService';
import endpoints from 'config/endpoint.json';

export const getAllTechAssessments = async (id: string) => {
  try {
    const { data } = await apiClient.get(`${endpoints.employeeInterviews}/${id}/all`);

    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_ALL_TECH_ASSESSMENTS_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
}