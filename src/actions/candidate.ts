import { SortOrder } from 'antd/es/table/interface';
import { message } from 'antd';

import { ICandidateTable, ICandidate } from 'models/ICandidate';
import endpoints from 'config/endpoint.json';

import Helper from 'helper';
import { apiClient } from 'services/apiService';

export interface ILoadCandidateProps {
  limit?: number;
  page?: number;
  sorter?: { order?: SortOrder; field: string };
  fullName?: string;
  woInterview?: boolean;
  woSoftInterview?: boolean;
}

export const getAllCandidates = async ({
  limit,
  page,
  sorter,
  fullName = '',
  woInterview = false,
  woSoftInterview = false,
}: ILoadCandidateProps) => {
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
  const [candidates, count]: [ICandidateTable[], number] = await fetch(`${endpoints.apiUrl}/candidates?${params}`, {
    method: 'GET',
    mode: 'cors',
    headers: Helper.headerWithJWT(),
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => error);
  return { candidates, count };
};

export const getCandidate = async (id: string): Promise<ICandidate> => {
  const candidate = await fetch(`${endpoints.apiUrl}/candidates/${id}`, {
    method: 'GET',
    mode: 'cors',
    headers: Helper.headerWithJWT(),
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => error);

  return { ...candidate };
};

export const updateCandidate = async (candidateInfo: Partial<ICandidate>) => {
  const candidate = await fetch(`${endpoints.apiUrl}/candidates/${candidateInfo.id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: Helper.headerWithJWT(),
    body: JSON.stringify(candidateInfo),
  })
    .then((data) => {
      return data.json();
    })
    .catch((error) => error);

  return { ...candidate };
};
