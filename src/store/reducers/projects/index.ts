import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

import { appStoreName } from './actionTypes';
import { getProjectsList, createProject, editProject } from './thunks';

import { IProject, IProjectFromDB, IProjectsState } from 'models/IProject';

import { formatProjectFromDb } from 'store/helpers/formatProjectFromDb';

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
  },
});

export default projects.reducer;

export const projectsSelector = (state: RootState): IProjectsState => state.projects;

export const { setProjectsList, setProjectId, setCurrentProject } = projects.actions;
