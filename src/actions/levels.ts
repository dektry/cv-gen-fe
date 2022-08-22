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
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const updateLevelRequest = async (id: string, request: IDBLevels) => {
  try {
    const { data } = await apiClient.put(`${endpoints.levels}/${id}`, request);
    return data;
  } catch (error) {
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const createLevelRequest = async (request: IDBLevels) => {
  try {
    const { data } = await apiClient.post(endpoints.levels, request);
    return data;
  } catch (error) {
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};
