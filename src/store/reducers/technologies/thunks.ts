import { createAsyncThunk } from '@reduxjs/toolkit';

import { httpGetTechnologiesList } from 'services/requests/technologies';
import { loadTechnologiesList } from './actionTypes';

export const getTechnologiesList = createAsyncThunk(loadTechnologiesList, (query: string) => {
  return httpGetTechnologiesList({ query });
});
