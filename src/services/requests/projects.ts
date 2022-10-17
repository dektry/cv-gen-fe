import { message } from 'antd';

import { apiClient } from '../apiService';

import endpoints from 'config/endpoint.json';
import { IProjectFromDB } from 'models/IProject';

export const httpGetProjectsList = async (employeeId: string) => {
  try {
    const { data } = await apiClient.get(`${endpoints.projects}/${employeeId}/all`);

    return data;
  } catch (error) {
    console.error('[API_CLIENT_GET_PROJECTS_LIST_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpCreateProject = async (project: Partial<IProjectFromDB>) => {
  try {
    const { data } = await apiClient.post(endpoints.projects, project);

    return data;
  } catch (error) {
    console.error('[API_CLIENT_CREATE_PROJECT_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpEditProject = async (project: IProjectFromDB) => {
  try {
    const { data } = await apiClient.put(endpoints.projects, project);

    return data;
  } catch (error) {
    console.error('[API_CLIENT_EDIT_PROJECT_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};

export const httpDeleteProject = async (projectId: string) => {
  try {
    const response = await apiClient.delete(`${endpoints.projects}/${projectId}`);

    return response.status;
  } catch (error) {
    console.error('[API_CLIENT_DELETE_RPOJECT_ERROR]', error);
    message.error(`Server error. Please contact admin`);
  }
};
