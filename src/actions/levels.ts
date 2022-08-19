import { message } from 'antd';

import { apiClient } from 'services/apiService';
import Helper from '../helper';
import endpoints from '../config/endpoint.json';
import { IDBLevels } from 'models/IUser';

const { headerWithJWT } = Helper;

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

export const updateLevelRequest = async (name: string, data: IDBLevels) => {
  const response = await fetch(`${process.env.REACT_APP_BE_URI}/levels`, {
    method: 'PUT',
    mode: 'cors',
    headers: headerWithJWT(),
    body: JSON.stringify(data),
  });
  return response.json();
};

export const createLevelRequest = async (data: IDBLevels) => {
  const response = await fetch(`${process.env.REACT_APP_BE_URI}/levels`, {
    method: 'POST',
    mode: 'cors',
    headers: headerWithJWT(),
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteLevel = async (id: string) => {
  const response = await fetch(`${process.env.REACT_APP_BE_URI}/levels/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: headerWithJWT(),
  });
  return response.json();
};