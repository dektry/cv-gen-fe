import { SortOrder } from 'antd/es/table/interface';
import { message } from 'antd';

import { IEmployee } from 'models/IEmployee';
import endpoints from 'config/endpoint.json';

import Helper from 'helper';
import { apiClient } from 'services/apiService';

export interface ILoadEmployeeProps {
  limit?: number;
  page?: number;
  sorter?: { order?: SortOrder; field: string };
  fullName?: string;
}

export const getAllEmployees = async ({ limit = 10, page = 1, sorter, fullName = '' }: ILoadEmployeeProps) => {
  const sort: {
    order?: 'ASC' | 'DESC';
    field?: string;
  } = {};

  if (sorter?.order) {
    sort.order = sorter.order === 'ascend' ? 'ASC' : 'DESC';
    sort.field = sorter.field;
  }

  const params = Helper.getQueryString({ limit, page, ...sort, query: fullName });
  try {
    const { data } = await apiClient.get(`${endpoints.employee}?${params}`);
    const [employees, count]: [IEmployee[], number] = data;
    return { employees, count };
  } catch (error) {
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const getEmployee = async (id: string) => {
  try {
    const { data } = await apiClient.get(`${endpoints.employee}/${id}`);
    return data;
  } catch (error) {
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const updateEmployee = async (employee: IEmployee) => {
  try {
    const { data } = await apiClient.put(`${endpoints.employee}/${employee.id}`, employee);
    return data;
  } catch (error) {
    console.error('[API CLIENT ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};
