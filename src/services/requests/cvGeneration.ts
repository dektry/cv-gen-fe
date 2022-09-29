import { message } from 'antd';

import { apiClient } from 'services/apiService';
import endpoints from 'config/endpoint.json';

export const getTemplate = async (templateName: string) => {
  try {
    const { data } = await apiClient.get(`${endpoints.cvGeneration}/template/${templateName}`);
    return data;
  } catch (error) {
    console.error('[API_CLIENT_CV_GENERATION_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const generatePdf = async (template: string) => {
  try {
    const { data } = await apiClient.post(`${endpoints.cvGeneration}`, { template }, { responseType: 'blob' });

    return data;
  } catch (error) {
    console.error('[API_CLIENT_CV_GENERATION_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};
