import { createAsyncThunk } from '@reduxjs/toolkit';

import { generatePdf, getTemplate } from 'services/requests/cvGeneration';
import { generateCv, loadCvTemplate, loadGroupOfTemplates } from './actionTypes';

export const fetchCvGenerationTemplate = createAsyncThunk(loadCvTemplate, async (templateName: string) => {
  const template = await getTemplate(templateName);
  return { [templateName]: template || '' };
});

export const fetchGroupOfTemplates = createAsyncThunk(loadGroupOfTemplates, async (templatesNames: string[]) => {
  const result: Record<string, string> = {};

  const templates: string[] = await Promise.all(templatesNames.map((templateName) => getTemplate(templateName)));

  templatesNames.forEach((templateName, index) => {
    result[templateName] = templates[index];
  });
  return result;
});

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
