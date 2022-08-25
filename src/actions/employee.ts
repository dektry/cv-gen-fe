import { message } from 'antd';
import { SortOrder, Key } from 'antd/lib/table/interface';

import { IEmployee } from 'models/IEmployee';
import endpoints from 'config/endpoint.json';

import Helper from 'helper';
import { apiClient } from 'services/apiService';

export interface ILoadEmployeeProps {
  limit?: number;
  page?: number;
  sorter?: { order: SortOrder; field: Key | readonly Key[] | undefined };
  fullName?: string;
}

export const getAllEmployees = async ({ limit = 10, page = 1, sorter, fullName = '' }: ILoadEmployeeProps) => {
  const sort: {
    order: 'ASC' | 'DESC';
    field: Key | readonly Key[] | undefined;
  } = {
    order: 'ASC',
    field: 'fullName'
  };

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
    console.error('[API_CLIENT_GET_ALL_EMPLOYEES_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const getEmployee = async (id: string) => {
  try {
    const { data } = await apiClient.get(`${endpoints.employee}/${id}`);
    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_EMPLOYEE_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const updateEmployee = async (employee: IEmployee) => {
  try {
    const { data } = await apiClient.put(`${endpoints.employee}/${employee.id}`, employee);
    return data;
  } catch (error) {
    console.error('[API_CLIENT_UPDATE_EMPLOYEE_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};
