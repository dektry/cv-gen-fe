import { message } from 'antd';
import { apiClient } from '../apiService';
import Helper from 'helper';
import endpoints from 'config/endpoint.json';

import { ILoadSoftSkillsToCvProps } from 'models/ISoftSkillToCv';

export const httpGetSoftSkillsToCvList = async ({ limit = 10, page = 1, query }: ILoadSoftSkillsToCvProps) => {
  const sort: {
    order: 'ASC' | 'DESC';
    field: string;
  } = {
    order: 'ASC',
    field: 'name',
  };

  const params = Helper.getQueryString({ limit, page, ...sort, query });

  try {
    const { data } = await apiClient.get(`${endpoints.softSkillToCv}?${params}`);
    const [softSkillsToCv, count]: [{ id: string; name: string }[], number] = data;
    return { softSkillsToCv, count };
  } catch (error) {
    console.error('[API_CLIENT_GET_SOFT_SKILLS_TO_CV_LIST_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpGetSoftSkillsToCvOfEmployee = async (employeeId: string) => {
  try {
    const { data } = await apiClient.get(`${endpoints.softSkillToCv}/${employeeId}`);

    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_SOFT_SKILLS_TO_CV_OF_EMPLOYEE_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpCreateSoftSkillsToCv = async (skills: string[], employeeId: string) => {
  try {
    const response = await apiClient.post(`${endpoints.softSkillToCv}/${employeeId}`, skills);

    return response.status;
  } catch (error) {
    console.error('[API_CLIENT_CREATE_SOFT_SKILLS_TO_CV_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};
