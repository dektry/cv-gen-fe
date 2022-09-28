import { createSlice } from '@reduxjs/toolkit';

import { appStoreName } from 'store/reducers/cvGeneration/actionTypes';
import { RootState } from 'store/index';
import { fetchCvGenerationTemplate } from 'store/reducers/cvGeneration/thunks';

type InitialStateCvGeneration = {
  template: string;
  description: string;
  isLoading: boolean;
};

const initialState: InitialStateCvGeneration = {
  template: '',
  description: '',
  isLoading: false,
};

const cvGeneration = createSlice({
  name: appStoreName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCvGenerationTemplate.fulfilled, (state, { payload }) => {
      state.template = payload;
    });
  },
});

export const cvGenerationSelector = (state: RootState) => state.cvGeneration;

export default cvGeneration.reducer;
