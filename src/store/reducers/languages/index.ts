import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

import { appStoreName } from './actionTypes';

import { getLanguages } from './thunks';

import { ILanguageState, ILanguage } from 'models/ILanguage';

const initialState: ILanguageState = {
  isLanguagesLoading: false,
  languages: [],
};

const languages = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    setLanguagesList: (state, { payload }: PayloadAction<ILanguage[]>) => {
      state.languages = payload;
    },
    setIsLanguagesLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLanguagesLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLanguages.pending, (state) => {
      state.isLanguagesLoading = true;
    });
    builder.addCase(getLanguages.rejected, (state) => {
      state.isLanguagesLoading = false;
    });
    builder.addCase(getLanguages.fulfilled, (state, { payload }) => {
      if (payload) {
        state.languages = payload;
      }
    });
  },
});

export default languages.reducer;

export const languagesSelector = (state: RootState): ILanguageState => state.languages;

export const { setLanguagesList, setIsLanguagesLoading } = languages.actions;
