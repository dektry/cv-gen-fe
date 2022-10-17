import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';

import { appStoreName } from './actionTypes';
import { getProjectsList, createProject, editProject } from './thunks';

import { IProject, IProjectFromDB, IProjectsState } from 'models/IProject';
import { ITechnology } from 'models/ITechnology';

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
      state.isLoading = false;
    });
    builder.addCase(createProject.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(createProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProject.fulfilled, (state, { payload }) => {
      if (payload) {
        const teamSize = payload.team_size ? parseInt(payload.team_size) : 0;
        const tools = payload.technologies.map((el: ITechnology) => el.name);
        const processedProject: IProject = {
          id: payload.id,
          employeeId: payload.employee?.id,
          name: payload.name,
          duration: payload.duration,
          position: payload.role,
          teamSize,
          description: payload.description,
          responsibilities: payload.responsibilities,
          tools,
        };

        state.projects = [...state.projects, processedProject];
      }

      state.isLoading = false;
    });
    builder.addCase(editProject.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(editProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editProject.fulfilled, (state, { payload }) => {
      if (payload) {
        const teamSize = payload.team_size ? parseInt(payload.team_size) : 0;
        const tools = payload.technologies.map((el: ITechnology) => el.name);
        const processedProject: IProject = {
          id: payload.id,
          employeeId: payload.employee?.id,
          name: payload.name,
          duration: payload.duration,
          position: payload.role,
          teamSize,
          description: payload.description,
          responsibilities: payload.responsibilities,
          tools,
        };

        state.projects = state.projects.map((el) => {
          if (el.id === processedProject.id) {
            return processedProject;
          } else {
            return el;
          }
        });
      }

      state.isLoading = false;
    });
  },
});

export default projects.reducer;

export const projectsSelector = (state: RootState): IProjectsState => state.projects;

export const { setProjectsList, setProjectId, setCurrentProject } = projects.actions;
