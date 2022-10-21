import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  httpGetSoftSkillsToCvList,
  httpGetSoftSkillsToCvOfEmployee,
  httpCreateSoftSkillsToCv,
} from 'services/requests/softSkillToCv';

import {
  loadSoftSkillsToCvListAction,
  loadSoftSkillsToCvOfEmployeeAction,
  createSoftSkillsToCvAction,
} from './actionTypes';

import { ILoadSoftSkillsToCvProps, ICreateSoftSkillsToCvProps } from 'models/ISoftSkillToCv';

export const getSoftSkillsToCvList = createAsyncThunk(
  loadSoftSkillsToCvListAction,
  ({ query }: ILoadSoftSkillsToCvProps) => {
    return httpGetSoftSkillsToCvList({ query });
  }
);

export const getSoftSkillsToCvOfEmployee = createAsyncThunk(
  loadSoftSkillsToCvOfEmployeeAction,
  (employeeId: string) => {
    return httpGetSoftSkillsToCvOfEmployee(employeeId);
  }
);

export const createSoftSkillsToCv = createAsyncThunk(
  createSoftSkillsToCvAction,
  ({ skills, employeeId }: ICreateSoftSkillsToCvProps) => {
    return httpCreateSoftSkillsToCv(skills, employeeId);
  }
);
