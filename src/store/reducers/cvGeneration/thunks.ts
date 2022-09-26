import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';

import { loadCvTemplate } from './actions';
import { apiClient } from '../../../services/apiService';
import endpoints from '../../../config/endpoint.json';

export const fetchCvGenerationTemplate = createAsyncThunk(loadCvTemplate, async (templateName: string) => {
  try {
    const { data } = await apiClient.get(`${endpoints.cvGeneration}/template/${templateName}`);
    return data;
  } catch (error) {
    console.error('[API_CLIENT_CV_GENERATION_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
});
