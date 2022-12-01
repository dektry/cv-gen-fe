import { message } from 'antd';
import { apiClient } from '../apiService';
import endpoints from 'config/endpoint.json';
import { ILanguage } from 'models/ILanguage';
import { ICvLanguage } from 'Pages/CVGeneration/components/CVGenerationInfo';

export const httpGetLanguages = async (employeeId: string) => {
  try {
    const { data } = await apiClient.get(`${endpoints.language}/${employeeId}`);

    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_LANGUAGES_LIST_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpPostLanguage = async (language: ICvLanguage) => {
  try {
    await apiClient.post(endpoints.language, language);
  } catch (error) {
    console.error('[API_CLIENT_POST_LANGUAGE_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpPutLanguage = async (language: ICvLanguage) => {
  try {
    await apiClient.put(endpoints.language, language);
  } catch (error) {
    console.error('[API_CLIENT_PUT_LANGUAGE_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpDeleteLanguage = async (languageId: string) => {
  try {
    await apiClient.delete(`${endpoints.language}/${languageId}`);
  } catch (error) {
    console.error('[API_CLIENT_DELETE_LANGUAGE_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};
