import { message } from 'antd';

import { apiClient } from 'services/apiService';
import Helper from '../helper';
import endpoints from '../config/endpoint.json';
import { IDBPosition } from 'models/IUser';

const { headerWithJWT } = Helper;

export const getAllPositionGroups = async () => {
  try {
    const { data } = await apiClient.get(endpoints.positionGroups);

    if (data.length > 1) {
      return data;
    }
    return [
      {
        name: 'none',
        color: 'green',
      },
    ];
  } catch(error) {
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }


};

export const getAllPositions = async () => {
  try {
    const { data } = await apiClient.get(endpoints.positions);
  
    if (data.length > 1) {
      return data;
    }
    return [
      {
        name: 'Front-end developer',
        duties: 'Some duties',
        requirements: 'Some skills',
        salaryMinLimit: 100,
        salaryMaxLimit: 1000,
        group: {
          name: 'none',
          color: 'green',
        },
      },
      {
        name: 'Back-end developer',
        duties: 'Some duties',
        requirements: 'Some skills',
        salaryMinLimit: 100,
        salaryMaxLimit: 1000,
        group: {
          name: 'none',
          color: 'green',
        },
      },
    ];
  } catch (error) {
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const updatePositionRequest = async (id: string, data: IDBPosition) => {
  const transformedPosition = {
    ...data,
    group: data.group?.id,
  };
  const response = await fetch(`${process.env.PUBLIC_URL}/positions/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: headerWithJWT(),
    body: JSON.stringify(transformedPosition),
  });
  return response.json();
};

export const createPositionRequest = async (data: IDBPosition) => {
  const response = await fetch(`${process.env.REACT_APP_BE_URI}/positions`, {
    method: 'POST',
    mode: 'cors',
    headers: headerWithJWT(),
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deletePosition = async (id: string) => {
  const response = await fetch(`${process.env.REACT_APP_BE_URI}/positions/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: headerWithJWT(),
  });
  return response.json();
};