import { createAsyncThunk } from '@reduxjs/toolkit';

import { loadCvTemplate } from 'store/reducers/cvGeneration/actionTypes';
import { generatePdf, getTemplate } from 'actions/cvGeneration';

export const fetchCvGenerationTemplate = createAsyncThunk(loadCvTemplate, getTemplate);

export const generateCv = createAsyncThunk('cvGeneration/generateCv', async (template: string) => {
  const data = await generatePdf(template);

  const blob = new Blob([data], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `cv.pdf`;
  link.href = url;
  link.click();
  link.remove();
});
