import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

import { appStoreName } from './actionTypes';
import {
  createProject,
  createProjectAndUpdateList,
  deleteProjectAndUpdateList,
  editProject,
  editProjectAndUpdateList,
  getProjectsList,
} from './thunks';

import { IProject, IProjectFromDB, IProjectsState } from 'models/IProject';

import { formatProjectFromDb } from '../../helpers/formatProjectFromDb';

const initialState: IProjectsState = {
  projects: [],
  isLoading: false,
  currentProjectId: null,
  currentProject: null,
};

const projects = createSlice({
  name: appStoreName,
  initialState,
  reducers: {
    setProjectsList: (state, { payload }: PayloadAction<IProject[]>) => {
      state.projects = payload;
    },
    setProjectId: (state, { payload }: PayloadAction<string>) => {
      state.currentProjectId = payload;
    },
    setCurrentProject: (state, { payload }: PayloadAction<IProject | null>) => {
      state.currentProject = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProjectsList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProjectsList.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getProjectsList.fulfilled, (state, { payload }) => {
      const processedProjects: IProject[] = payload.map((project: IProjectFromDB) => {
        return formatProjectFromDb(project);
      });
      state.projects = processedProjects;
      state.isLoading = false;
    });
    builder.addCase(createProject.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editProject.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(editProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editProjectAndUpdateList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editProjectAndUpdateList.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(editProjectAndUpdateList.fulfilled, (state, { payload }) => {
      state.projects = payload.map((project: IProjectFromDB) => {
        return formatProjectFromDb(project);
      });
      state.isLoading = false;
    });
    builder.addCase(createProjectAndUpdateList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProjectAndUpdateList.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createProjectAndUpdateList.fulfilled, (state, { payload }) => {
      const processedProjects = payload.map((project: IProjectFromDB) => {
        return formatProjectFromDb(project);
      });
      processedProjects.sort((a: IProject, b: IProject) => {
        if (a.order && b.order) {
          return a.order - b.order;
        }
      });
      state.projects = processedProjects;
      state.isLoading = false;
    });
    builder.addCase(deleteProjectAndUpdateList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProjectAndUpdateList.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteProjectAndUpdateList.fulfilled, (state, { payload }) => {
      state.projects = payload.map((project: IProjectFromDB) => {
        return formatProjectFromDb(project);
      });
      state.isLoading = false;
    });
    builder.addCase(createProject.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(editProject.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export default projects.reducer;

export const projectsSelector = (state: RootState): IProjectsState => state.projects;

export const { setProjectsList, setProjectId, setCurrentProject } = projects.actions;
