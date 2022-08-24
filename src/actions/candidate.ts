import { message } from 'antd';

import { ICandidate, ICandidateTable } from 'models/ICandidate';
import endpoints from 'config/endpoint.json';

import Helper from 'helper';
import { apiClient } from 'services/apiService';

export interface ILoadCandidateProps {
  limit?: number;
  page?: number;
  sorter?: { order: string; field: string };
  fullName?: string;
  woInterview?: boolean;
  woSoftInterview?: boolean;
}

export const getAllCandidates = async ({
  limit = 10,
  page = 1,
  sorter = { order: 'ascend', field: 'name' },
  fullName = '',
  woInterview = false,
  woSoftInterview = false,
}) => {
  try {
    const sort: {
      order?: 'ASC' | 'DESC';
      field?: string;
    } = {};

    if (sorter?.order) {
      sort.order = sorter.order === 'ascend' ? 'ASC' : 'DESC';
      sort.field = sorter.field;
    }

    const params = Helper.getQueryString({
      limit,
      page,
      fullName,
      woInterview,
      woSoftInterview,
      ...sort,
    });

    const { data } = await apiClient.get(`${endpoints.candidates}?${params}`);
    const [candidates, count]: [ICandidateTable[], number] = data;
    return { candidates, count };
  } catch (error) {
    console.error('[API_CLIENT_GET_ALL_CANDIDATES_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const getCandidate = async (id: string): Promise<ICandidate | undefined> => {
  try {
    const { data } = await apiClient.get(`${endpoints.candidates}/${id}`);
    return { ...data };
  } catch (error) {
    console.error('[API_CLIENT_GET_CANDIDATE_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const updateCandidate = async (candidateInfo: Partial<ICandidate>) => {
  try {
    const { data } = await apiClient.put(`${endpoints.candidates}/${candidateInfo.id}`, candidateInfo);
    return { ...data };
  } catch (error) {
    console.error('[API_CLIENT_UPDATE_CANDIDATE_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};
