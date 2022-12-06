import { message } from 'antd';

import { apiClient } from 'services/apiService';
import endpoints from 'config/endpoint.json';
import { IDBLevels } from 'models/IUser';

export const getAllLevels = async () => {
  try {
    const { data } = await apiClient.get(endpoints.getAllLevels);

    if (data.length > 1) {
      return data;
    }
  } catch (error) {
    console.error('[API_CLIENT_GET_ALL_LEVELS_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const updateLevelRequest = async (request: IDBLevels) => {
  try {
    const { data } = await apiClient.put(`${endpoints.levels}/${request.id}`, request);
    return data;
  } catch (error) {
    console.error('[API_CLIENT_UPDATE_LEVEL_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const createLevelRequest = async (request: IDBLevels) => {
  try {
    const { data } = await apiClient.post(endpoints.levels, request);
    return data;
  } catch (error) {
    console.error('[API_CLIENT_CREATE_LEVEL_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const deleteLevelRequest = async (id: string) => {
  try {
    await apiClient.delete(`${endpoints.levels}/${id}`);
  } catch (error) {
    console.error('[API_CLIENT_DELETE_LEVEL_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};
