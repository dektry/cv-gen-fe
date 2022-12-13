import { message } from 'antd';

import { apiClient } from 'services/apiService';
import endpoints from 'config/endpoint.json';
import { ICopyHardSkillsMatrixProps, IFormHardSkillsMatrix } from 'models/IHardSkillsMatrix';

export const httpGetAllHardSkillsMatrix = async () => {
  try {
    const { data } = await apiClient.get(endpoints.hardSkillsMatrix);
    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_HARD_SKILLS_MATRIX_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpGetOneHardSkillsMatrix = async (id: string) => {
  try {
    const { data } = await apiClient.get(`${endpoints.hardSkillsMatrix}/${id}`);
    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_ONE_HARD_SKILLS_MATRIX_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpCreateHardSkillsMatrix = async (matrix: IFormHardSkillsMatrix, positionId: string) => {
  try {
    const { data } = await apiClient.post(endpoints.hardSkillsMatrix, {
      skillGroups: matrix.skillGroups,
      positionId: positionId,
    });
    return data;
  } catch (error) {
    console.error('[API_CLIENT_CREATE_HARD_SKILLS_MATRIX_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpEditHardSkillsMatrix = async (matrix: IFormHardSkillsMatrix, positionId: string) => {
  try {
    const { data } = await apiClient.put(`${endpoints.hardSkillsMatrix}/${matrix.id}`, {
      skillGroups: matrix.skillGroups,
      positionId: positionId,
    });
    return data;
  } catch (error) {
    console.error('[API_CLIENT_CREATE_HARD_SKILLS_MATRIX_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpDeleteHardSkillsMatrix = async (id: string) => {
  try {
    await apiClient.delete(`${endpoints.hardSkillsMatrix}/${id}`);
  } catch (error) {
    console.error('[API_CLIENT_DELETE_HARD_SKILLS_MATRIX_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpCopyHardSkillsMatrix = async (props: ICopyHardSkillsMatrixProps) => {
  try {
    const data = await apiClient.post(`${endpoints.hardSkillsMatrix}/copy`, props);

    return data;
  } catch (error) {
    console.error('[API_CLIENT_COPY_HARD_SKILLS_MATRIX_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};
