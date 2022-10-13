import { createAsyncThunk } from '@reduxjs/toolkit';

import { httpGetProjectsList } from 'services/requests/projects';
import { loadAllEmployeeProjects } from './actionTypes';

export const getProjectsList = createAsyncThunk(loadAllEmployeeProjects, (employeeId: string) => {
  return httpGetProjectsList(employeeId);
});
