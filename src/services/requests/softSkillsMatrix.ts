import { message } from 'antd';

import { apiClient } from 'services/apiService';
import endpoints from 'config/endpoint.json';
import { ICopySoftSkillsMatrixProps, IFormSoftSkillsMatrix } from 'models/ISoftSkillsMatrix';

export const httpGetAllSoftSkillsMatrix = async () => {
  try {
    const { data } = await apiClient.get(endpoints.softSkillsMatrix);
    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_HARD_SKILLS_MATRIX_ERROR]', error);
    if (500 <= error.status && error.status <= 599) {
      message.error(`Server error: ${error.message}`);
    } else {
      message.error(`Server error. Please, contact admin`);
    }
  }
};

export const httpGetOneSoftSkillsMatrix = async (id: string) => {
  try {
    const { data } = await apiClient.get(`${endpoints.softSkillsMatrix}/${id}`);
    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_ONE_SOFT_SKILLS_MATRIX_ERROR]', error);
    if (500 <= error.status && error.status <= 599) {
      message.error(`Server error: ${error.message}`);
    } else {
      message.error(`Server error. Please, contact admin`);
    }
  }
};

export const httpDeleteSoftSkillsMatrix = async (id: string) => {
  try {
    await apiClient.delete(`${endpoints.softSkillsMatrix}/${id}`);
  } catch (error) {
    console.error('[API_CLIENT_DELETE_SOFT_SKILLS_MATRIX_ERROR]', error);
    if (500 <= error.status && error.status <= 599) {
      message.error(`Server error: ${error.message}`);
    } else {
      message.error(`Server error. Please, contact admin`);
    }
  }
};

export const httpCopySoftSkillsMatrix = async (
  props: ICopySoftSkillsMatrixProps
): Promise<{ softSkillMatrixId: string } | undefined> => {
  try {
    const { data } = await apiClient.post(`${endpoints.softSkillsMatrix}/copy`, {
      positionId: props.positionId,
      softSkillMatrixId: props.skillMatrixId,
    });

    return data;
  } catch (error) {
    console.error('[API_CLIENT_COPY_SOFT_SKILLS_MATRIX_ERROR]', error);
    if (500 <= error.status && error.status <= 599) {
      message.error(`Server error: ${error.message}`);
    } else {
      message.error(`Server error. Please, contact admin`);
    }
  }
};

export const httpCreateSoftSkillsMatrix = async (matrix: IFormSoftSkillsMatrix, positionId: string) => {
  try {
    const { data } = await apiClient.post(endpoints.softSkillsMatrix, {
      skills: matrix.skills,
      positionId: positionId,
    });
    return data;
  } catch (error) {
    console.error('[API_CLIENT_CREATE_SOFT_SKILLS_MATRIX_ERROR]', error);
    if (500 <= error.status && error.status <= 599) {
      message.error(`Server error: ${error.message}`);
    } else {
      message.error(`Server error. Please, contact admin`);
    }
  }
};

export const httpEditSoftSkillsMatrix = async (matrix: IFormSoftSkillsMatrix, positionId: string) => {
  try {
    const { data } = await apiClient.put(`${endpoints.softSkillsMatrix}/${matrix.id}`, {
      skills: matrix.skills,
      positionId: positionId,
    });
    return data;
  } catch (error) {
    console.error('[API_CLIENT_CREATE_SOFT_SKILLS_MATRIX_ERROR]', error);
    if (500 <= error.status && error.status <= 599) {
      message.error(`Server error: ${error.message}`);
    } else {
      message.error(`Server error. Please, contact admin`);
    }
  }
};
