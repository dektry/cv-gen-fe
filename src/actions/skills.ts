import { message } from 'antd';

import { apiClient } from 'services/apiService';
import Helper from 'helper';
import endpoints from 'config/endpoint.json';

import { ISoftSkillInterview, ISoftSkill } from 'models/ISoftSkillsInterview';
import { IMatrixUpdate } from 'models/IUser';

const { headerWithJWT } = Helper;

export const getSkillMatrixByPositionId = async (positionId: string) => {
  try {
    const { data } = await apiClient.get(
      `${endpoints.getSkillMatrix}/${positionId}`,
    );
    if (data.length) {
      return data;
    }
    return null;
  } catch (error) {
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const getSkillMatrixByIds = async (
  positionId: string,
  levelId: string,
) => {
  try {
    const { data } = await apiClient.get(
      `${endpoints.getSkillMatrix}/${positionId}/${levelId}`,
    );

    return data;
  } catch (error) {
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const getSoftSkillsList = async () => {
  try {
    const { data } = await apiClient.get(endpoints.softSkill);

    return data;
  } catch (error) {
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const getSoftSkillInterview = async (id: string) => {
  try {
    const { data } = await apiClient.get(
      `${endpoints.softSkillInterview}/${id}`,
    );

    return data;
  } catch (error) {
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const completeSoftSkillsInterview = async (
  data: ISoftSkillInterview,
) => {
  try {
    const response = await apiClient.post(endpoints.softSkillInterview, data);

    return response.data;
  } catch (error) {
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const editSoftSkillsInterview = async (data: ISoftSkillInterview) => {
  try {
    return apiClient.put(endpoints.softSkillInterview, data);
  } catch (error) {
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const uploadNewSkill = async (data: Partial<ISoftSkill>) => {
  try {
    const response = await apiClient.post(endpoints.softSkill, data);

    return response.data;
  } catch (error) {
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const createSkillMatrix = async (data: IMatrixUpdate) => {
  const response = await fetch(`${process.env.REACT_APP_BE_URI}/skillgroups`, {
    method: 'POST',
    mode: 'cors',
    headers: headerWithJWT(),
    body: JSON.stringify(data),
  });
  return response.json();
};

