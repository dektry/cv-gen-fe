import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

import { appStoreName } from './actionTypes';
import { getTechnologiesList } from './thunks';

import { ITechnologiesState, ITechnology } from 'models/ITechnology';

const initialState: ITechnologiesState = {
  technologiesList: [],
  technologiesNames: [],
  isLoading: false,
};

const technologies = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    setTechnologiesList: (state, { payload }: PayloadAction<ITechnology[]>) => {
      state.technologiesList = payload;
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTechnologiesList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTechnologiesList.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getTechnologiesList.fulfilled, (state, { payload }) => {
      if (payload && payload.technologies) {
        const { technologies } = payload;
        state.technologiesList = technologies;

        const technologiesNames = technologies.map((el) => el.name);
        state.technologiesNames = technologiesNames;
      }
    });
  },
});

export default technologies.reducer;

export const technologiesSelector = (state: RootState): ITechnologiesState => state.technologies;

export const { setTechnologiesList, setIsLoading } = technologies.actions;
