import { message } from 'antd';
import { apiClient } from '../apiService';
import Helper from 'helper';
import endpoints from 'config/endpoint.json';
import { IProject } from 'models/IProject';

export interface ILoadTechnologiesProps {
  limit?: number;
  page?: number;
  query: string;
}

export const httpGetTechnologiesList = async ({ limit = 10, page = 1, query }: ILoadTechnologiesProps) => {
  const sort: {
    order: 'ASC' | 'DESC';
    field: string;
  } = {
    order: 'ASC',
    field: 'name',
  };

  const params = Helper.getQueryString({ limit, page, ...sort, query });

  try {
    const { data } = await apiClient.get(`${endpoints.technologies}?${params}`);
    const [technologies, count]: [IProject[], number] = data;
    return { technologies, count };
  } catch (error) {
    console.error('[API_CLIENT_GET_TECHNOLOGIES_LIST_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};
