import { message } from 'antd';

import { apiClient } from 'services/apiService';

import endpoints from 'config/endpoint.json';
import { IDBPosition } from 'models/IUser';

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
    console.error('[API_CLIENT_GET_ALL_POSITIONS_GROUPS_ERROR]', error);
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
    console.error('[API_CLIENT_GET_ALL_POSITIONS_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const updatePositionRequest = async (id: string, request: IDBPosition) => {
  try {
    const transformedPosition = {
      ...request,
      group: request.group?.id,
    };
    const { data } = await apiClient.post(`${endpoints.positions}/${id}`, transformedPosition);
    return data;
  } catch (error) {
    console.error('[API_CLIENT_UPDATE_POSITION_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const createPositionRequest = async (request: IDBPosition) => {
  try {
    const { data } = await apiClient.post(endpoints.positions, request);
    return data;
  } catch (error) {
    console.error('[API_CLIENT_CREATE_POSITION_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};
