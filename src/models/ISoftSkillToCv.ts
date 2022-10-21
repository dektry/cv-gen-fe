export interface ISoftSkillToCv {
  id: string;
  name: string;
}

export interface ILoadSoftSkillsToCvProps {
  query?: string;
  limit?: number;
  page?: number;
}

export interface ICreateSoftSkillsToCvProps {
  skills: string[];
  employeeId: string;
}

export interface ISoftSkillsToCvState {
  skillsOfEmployee: string[] | [];
  skills: string[] | [];
  softSkillsToCvLoading: boolean;
}
