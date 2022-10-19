import { message } from 'antd';
import { apiClient } from '../apiService';
import Helper from 'helper';
import endpoints from 'config/endpoint.json';

export interface ILoadSoftSkillsToCvProps {
  limit?: number;
  page?: number;
  query: string;
}

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
    const { data } = await apiClient.get(`${endpoints.softSkillsToCv}?${params}`);
    const [softSkillsToCv, count]: [{ id: string; name: string }[], number] = data;
    return { softSkillsToCv, count };
  } catch (error) {
    console.error('[API_CLIENT_GET_SOFT_SKILLS_TO_CV_LIST_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};
