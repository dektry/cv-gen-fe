import { message } from 'antd';

import { apiClient } from 'services/apiService';
import Helper from '../helper';
import endpoints from '../config/endpoint.json';

const { headerWithJWT } = Helper;

export const getAllPositionGroups = async () => {
  const allGroups = await fetch(`${apiUrl}/position-groups`, {
    method: 'GET',
    mode: 'cors',
  })
    .then(data => {
      return data.json();
    })
    .catch(error => error);

  if (allGroups.length > 1) {
    return allGroups;
  }
  return [
    {
      name: 'none',
      color: 'green',
    },
  ];
};

export const getAllPositions = async () => {
  const allPositions = await fetch(`${apiUrl}/positions`, {
    method: 'GET',
    mode: 'cors',
    headers: headerWithJWT(),
  }).then(getAuthCheckedResponse);

  if (allPositions.length > 1) {
    return allPositions;
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
};

export const updatePositionRequest = async (id: string, data: any) => {
  const transformedPosition = {
    ...data,
    group: data.group.id,
  };
  const response = await fetch(`${REACT_APP_BE_URI}/positions/${id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: headerWithJWT(),
    body: JSON.stringify(transformedPosition),
  });
  return response.json();
};

export const createPositionRequest = async (data: any) => {
  const response = await fetch(`${REACT_APP_BE_URI}/positions`, {
    method: 'POST',
    mode: 'cors',
    headers: headerWithJWT(),
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deletePosition = async (id: string) => {
  const response = await fetch(`${REACT_APP_BE_URI}/positions/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: headerWithJWT(),
  });
  return response.json();
};