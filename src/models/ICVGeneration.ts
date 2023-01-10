import { NullableField } from 'models/TNullableField';

export interface ICvEducation {
  id?: string;
  university?: string;
  specialization?: string;
  startYear?: number;
  endYear?: number;
  employeeId?: string;
}

export interface IProfSkill {
  name?: string;
  level?: string;
}

export interface ICvProfSkill {
  groupName?: string;
  skills?: IProfSkill[];
}

export interface ICvLanguage {
  id?: string;
  value?: string;
  level?: string;
  employeeId?: string;
}

export interface ICvProject {
  id?: string;
  team_size?: string;
  employeeId?: string;
  name?: string;
  duration?: string;
  position?: string;
  teamSize?: number;
  description?: string;
  responsibilities?: string[];
  tools?: string[];
}

export interface CvInfoForm {
  description?: string;
  education?: ICvEducation[];
  languages?: ICvLanguage[];
  softSkills?: string[];
  level?: NullableField<string>;
  position?: NullableField<string>;
  yearsOfExperience?: NullableField<number>;
  avatarUrl?: NullableField<string>;
  male?: boolean;
  firstName?: string;
  profSkills?: ICvProfSkill[];
  projects?: ICvProject[];
}
