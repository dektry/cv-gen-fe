import { IDBPosition } from './IUser';

export enum SoftLevelTypesEnum {
  None = 'None',
  A = 'A',
  A1 = 'A1',
  B = 'B',
  C = 'C',
  D = 'D',
}

export const levelTypes: { [key in SoftLevelTypesEnum]: string } = {
  [SoftLevelTypesEnum.None]: 'None',
  [SoftLevelTypesEnum.D]: 'D',
  [SoftLevelTypesEnum.C]: 'C',
  [SoftLevelTypesEnum.B]: 'B',
  [SoftLevelTypesEnum.A]: 'A',
  [SoftLevelTypesEnum.A1]: 'A1',
};

export const levelTypesPriority: { [key in SoftLevelTypesEnum]: number } = {
  [SoftLevelTypesEnum.None]: 1,
  [SoftLevelTypesEnum.D]: 2,
  [SoftLevelTypesEnum.C]: 3,
  [SoftLevelTypesEnum.B]: 4,
  [SoftLevelTypesEnum.A]: 5,
  [SoftLevelTypesEnum.A1]: 6,
};

export interface ILevel {
  value: string;
  description: string;
  id: string;
  level_id: {
    id: string;
    name: string;
  };
}

export interface ISkill {
  value: string;
  id?: string;
  levels: ILevel[];
}

export interface ISoftSkillsMatrix {
  id?: string;
  position: IDBPosition;
  skills: ISkill[];
}

export interface ISoftSkillsMatrixState {
  matrix: ISoftSkillsMatrix[];
  currentMatrix: IFormSoftSkillsMatrix;
  softSkillMatrixLoading: boolean;
  isAssessmentPage: boolean;
}

export interface IFormGrade {
  value?: string;
  levelId?: string;
}

export interface IFormPosition {
  id?: string;
  name?: string;
}

export interface IFormLevel {
  value?: string;
  id?: string;
  description?: string;
  level_id?: {
    id?: string;
    name?: string;
  };
}

export interface IFormSkill {
  value?: string;
  id?: string;
  levels?: IFormLevel[];
}

export interface IFormSoftSkillsMatrix {
  id?: string;
  position?: IFormPosition;
  skills?: IFormSkill[];
}

export interface ICopySoftSkillsMatrixProps {
  positionId: string;
  skillMatrixId: string;
}
