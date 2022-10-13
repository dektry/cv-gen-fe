import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../..';

import { appStoreName } from './actionTypes';
import { getProjectsList } from './thunks';

import { IProject, IProjectsState } from 'models/IProject';

const initialState: IProjectsState = {
  projects: [],
  isLoading: false,
  currentProjectId: null,
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
  },
  extraReducers: (builder) => {
    builder.addCase(getProjectsList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProjectsList.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getProjectsList.fulfilled, (state, { payload }) => {
      const processedProjects: IProject[] = payload.map((el: IProject) => {
        return {
          employeeId: el.employee?.id,
          name: el.name,
          duration: el.duration,
          role: el.role,
          teamSize: el.team_size,
          description: el.description,
          responsibilities: el.responsibilities,
          technologies: el.technologies,
        };
      });

      state.projects = processedProjects;
    });
  },
});

export default projects.reducer;

export const projectsSelector = (state: RootState): IProjectsState => state.projects;

export const { setProjectsList, setProjectId } = projects.actions;
