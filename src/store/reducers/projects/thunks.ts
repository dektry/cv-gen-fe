import { createAsyncThunk } from '@reduxjs/toolkit';

import { IProjectFromDB } from 'models/IProject';

import { httpGetProjectsList, httpDeleteProject, httpCreateProject, httpEditProject } from 'services/requests/projects';
import {
  loadAllEmployeeProjectsAction,
  deleteProjectAction,
  createProjectAction,
  editProjectAction,
  editProjectAndUpdateListAction,
  createProjectAndUpdateListAction,
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

export type TUpdateProjectListPayload = { project: IProjectFromDB; employeeId: string };

export const editProjectAndUpdateList = createAsyncThunk(
  editProjectAndUpdateListAction,
  async (payload: TUpdateProjectListPayload) => {
    await httpEditProject(payload.project);

    return await httpGetProjectsList(payload.employeeId);
  }
);

export const createProjectAndUpdateList = createAsyncThunk(
  createProjectAndUpdateListAction,
  async (payload: TUpdateProjectListPayload) => {
    await httpCreateProject(payload.project);

    return await httpGetProjectsList(payload.employeeId);
  }
);
