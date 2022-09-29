import { createAsyncThunk } from '@reduxjs/toolkit';

import { generatePdf, getTemplate } from 'services/requests/cvGeneration';
import { generateCv, loadCvTemplate } from './actionTypes';

export const fetchCvGenerationTemplate = createAsyncThunk(loadCvTemplate, getTemplate);

export const downloadCv = createAsyncThunk(generateCv, async (template: string) => {
  const data = await generatePdf(template);

  const blob = new Blob([data], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `cv.pdf`;
  link.href = url;
  link.click();
  link.remove();
});
