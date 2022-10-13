import { NullableField } from './TNullableField';
import { IEmployee } from './IEmployee';

export interface IProject {
  id?: string;
  employee?: IEmployee;
  team_size?: string;
  employeeId: string;
  name: string;
  duration: string;
  role: string;
  teamSize: string;
  description: string;
  responsibilities: string[];
  technologies: { id?: string; name: string }[];
}

export interface IProjectsState {
  projects: IProject[] | [];
  currentProjectId: NullableField<string>;
  isLoading: boolean;
}
