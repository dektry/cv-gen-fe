import { createAsyncThunk } from '@reduxjs/toolkit';

import { httpGetProjectsList, httpDeleteProject } from 'services/requests/projects';
import { loadAllEmployeeProjectsAction, deleteProjectAction } from './actionTypes';

export const getProjectsList = createAsyncThunk(loadAllEmployeeProjectsAction, (employeeId: string) => {
  return httpGetProjectsList(employeeId);
});

export const deleteProject = createAsyncThunk(deleteProjectAction, (projectId: string) => {
  return httpDeleteProject(projectId);
});
