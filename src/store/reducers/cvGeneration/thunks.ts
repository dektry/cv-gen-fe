import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';

import { apiClient } from 'services/apiService';
import endpoints from '../../../config/endpoint.json';
import { loadCvTemplate } from 'store/reducers/cvGeneration/actionTypes';
import { getTemplate } from 'actions/cvGeneration';

export const fetchCvGenerationTemplate = createAsyncThunk(loadCvTemplate, getTemplate);

export const generateCv = createAsyncThunk('cvGeneration/generateCv', async (template: string) => {
  try {
    const { data } = await apiClient.post(`${endpoints.cvGeneration}`, { template }, { responseType: 'blob' });

    const blob = new Blob([data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `cv.pdf`;
    link.href = url;
    link.click();
    link.remove();

    return data;
  } catch (error) {
    console.error('[API_CLIENT_CV_GENERATION_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
});
