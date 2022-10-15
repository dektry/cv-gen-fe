import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

import { appStoreName } from './actionTypes';
import { getProjectsList } from './thunks';

import { IProject, IProjectFromDB, IProjectsState } from 'models/IProject';

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
      const processedProjects: IProject[] = payload.map((project: IProjectFromDB) => {
        const teamSize = project.team_size ? parseInt(project.team_size) : 0;
        const tools = project.technologies.map((el) => el.name);

        return {
          id: project.id,
          employeeId: project.employee?.id,
          name: project.name,
          duration: project.duration,
          position: project.role,
          teamSize,
          description: project.description,
          responsibilities: project.responsibilities,
          technologies: project.technologies,
          tools,
        };
      });

      state.projects = processedProjects;
    });
  },
});

export default projects.reducer;

export const projectsSelector = (state: RootState): IProjectsState => state.projects;

export const { setProjectsList, setProjectId } = projects.actions;
