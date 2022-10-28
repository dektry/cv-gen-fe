import { createAsyncThunk } from '@reduxjs/toolkit';
import { IEmployee, ICreateEmployee } from 'models/IEmployee';

import {
  getAllEmployees,
  ILoadEmployeeProps,
  getEmployee,
  updateEmployee,
  httpDeleteEmployee,
  httpCreateEmployee,
} from 'services/requests/employee';

import {
  loadEmployeeAction,
  loadEmployeesListAction,
  updateEmployeeAction,
  deleteEmployeeAction,
  createEmployeeAction,
} from './actionTypes';

export const getEmployeesList = createAsyncThunk(
  loadEmployeesListAction,
  ({ limit, page, sorter, fullName }: ILoadEmployeeProps) => {
    return getAllEmployees({ limit, page, sorter, fullName });
  }
);

export const loadEmployee = createAsyncThunk(loadEmployeeAction, (id: string) => getEmployee(id));

export const saveChangesToEmployee = createAsyncThunk(updateEmployeeAction, (employee: IEmployee) => {
  return updateEmployee(employee);
});

export const deleteEmployee = createAsyncThunk(deleteEmployeeAction, (employee: IEmployee) => {
  return httpDeleteEmployee(employee);
});

export const createEmployee = createAsyncThunk(createEmployeeAction, (employee: ICreateEmployee) => {
  return httpCreateEmployee(employee);
});
