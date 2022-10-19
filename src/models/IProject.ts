import { NullableField } from './TNullableField';
import { IEmployee } from './IEmployee';

export interface IProject {
  id: string;
  team_size?: string;
  employeeId: string;
  name: string;
  duration: string;
  position: string;
  teamSize: number;
  description: string;
  responsibilities: string[];
  tools: string[];
}

export interface IProjectFromDB {
  id: string;
  employee?: IEmployee;
  employeeId?: string;
  team_size: string;
  name: string;
  duration: string;
  role: string;
  description: string;
  responsibilities: string[];
  technologies: { id?: string; name: string }[];
}

export interface IProjectsState {
  projects: IProject[] | [];
  currentProjectId: NullableField<string>;
  currentProject: NullableField<IProject>;
  isLoading: boolean;
}
