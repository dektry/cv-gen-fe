import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILanguage } from 'models/ILanguage';

import { httpGetLanguages, httpPostLanguage, httpPutLanguage, httpDeleteLanguage } from 'services/requests/languages';

import { loadLanguagesListAction, createLanguageAction, editLanguageAction, deleteLanguageAction } from './actionTypes';

export const getLanguages = createAsyncThunk(loadLanguagesListAction, (employeeId: string) => {
  return httpGetLanguages(employeeId);
});

export const createLanguage = createAsyncThunk(createLanguageAction, (language: ILanguage) => {
  return httpPostLanguage(language);
});

export const editLanguage = createAsyncThunk(editLanguageAction, (language: ILanguage) => {
  return httpPutLanguage(language);
});

export const deleteLanguage = createAsyncThunk(deleteLanguageAction, (languageId: string) => {
  return httpDeleteLanguage(languageId);
});
