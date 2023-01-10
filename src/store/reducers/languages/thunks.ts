import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICvLanguage } from 'models/ICVGeneration';

import { httpGetLanguages, httpPostLanguage, httpPutLanguage, httpDeleteLanguage } from 'services/requests/languages';

import { loadLanguagesListAction, createLanguageAction, editLanguageAction, deleteLanguageAction } from './actionTypes';

export const getLanguages = createAsyncThunk(loadLanguagesListAction, (employeeId: string) => {
  return httpGetLanguages(employeeId);
});

export const createLanguage = createAsyncThunk(createLanguageAction, (language: ICvLanguage) => {
  return httpPostLanguage(language);
});

export const editLanguage = createAsyncThunk(editLanguageAction, (language: ICvLanguage) => {
  return httpPutLanguage(language);
});

export const deleteLanguage = createAsyncThunk(deleteLanguageAction, (language: ICvLanguage) => {
  return httpDeleteLanguage(String(language.id));
});
