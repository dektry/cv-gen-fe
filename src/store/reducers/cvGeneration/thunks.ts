import { createAsyncThunk } from '@reduxjs/toolkit';

import { loadCvTemplate } from 'store/reducers/cvGeneration/actionTypes';
import { getTemplate } from 'actions/cvGeneration';

export const fetchCvGenerationTemplate = createAsyncThunk(loadCvTemplate, getTemplate);
