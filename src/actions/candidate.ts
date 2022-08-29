import { message } from 'antd';
import { Key, SortOrder } from 'antd/es/table/interface';

import { ICandidate, ICandidateTable } from 'models/ICandidate';
import endpoints from 'config/endpoint.json';

import Helper from 'helper';
import { apiClient } from 'services/apiService';

export interface ILoadCandidateProps {
  limit?: number;
  page?: number;
  sorter?: { order?: SortOrder; field: Key | readonly Key[] | undefined };
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
}: ILoadCandidateProps) => {
  try {
    const sort: {
      order?: 'ASC' | 'DESC' | null | undefined;
      field?: Key | readonly Key[] | undefined;
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
    message.success('Candidate has been successfully updated!');
    return { ...data };
  } catch (error) {
    console.error('[API_CLIENT_UPDATE_CANDIDATE_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};
