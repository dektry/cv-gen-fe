import { createAsyncThunk } from '@reduxjs/toolkit';

import { IProjectFromDB } from 'models/IProject';

import { httpGetProjectsList, httpDeleteProject, httpCreateProject, httpEditProject } from 'services/requests/projects';
import {
  loadAllEmployeeProjectsAction,
  deleteProjectAction,
  createProjectAction,
  editProjectAction,
} from './actionTypes';

export const getProjectsList = createAsyncThunk(loadAllEmployeeProjectsAction, (employeeId: string) => {
  return httpGetProjectsList(employeeId);
});

export const deleteProject = createAsyncThunk(deleteProjectAction, (projectId: string) => {
  return httpDeleteProject(projectId);
});

export const createProject = createAsyncThunk(createProjectAction, (project: IProjectFromDB) => {
  return httpCreateProject(project);
});

export const editProject = createAsyncThunk(editProjectAction, (project: IProjectFromDB) => {
  return httpEditProject(project);
});
