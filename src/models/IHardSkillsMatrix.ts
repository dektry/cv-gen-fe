import { IDBPosition } from './IUser';

export interface IFormPosition {
  id?: string;
  name?: string;
}

export interface IQuestion {
  id?: string;
  value: string;
  order: number;
}

export interface ILevel {
  value: string;
  id: string;
  level_id: {
    id: string;
    name: string;
  };
}

export interface ISkill {
  value: string;
  order: number;
  id?: string;
  currentLevel?: string;
  questions: IQuestion[];
  levels: ILevel[];
}

export interface ISkillGroup {
  id?: string;
  value: string;
  order: number;
  skills: ISkill[];
}

export interface IHardSkillsMatrix {
  id?: string;
  position: IDBPosition;
  skillGroups: ISkillGroup[];
}

export type TSkillLevel = {
  id: number;
  name: string;
  value: string;
  label: string;
};

export interface IHardSkillsMatrixState {
  matrix: IHardSkillsMatrix[];
  currentMatrix: IFormHardSkillsMatrix;
  hardSkillMatrixLoading: boolean;
  isAssessmentPage: boolean;
  skillLevels: TSkillLevel[];
}

export interface ICopyHardSkillsMatrixProps {
  positionId: string;
  skillMatrixId: string;
}

export interface IFormGrade {
  value?: string;
  levelId?: string;
}

export interface IFormLevel {
  value?: string;
  id?: string;
  level_id?: {
    id?: string;
    name?: string;
  };
}

export interface IFormQuestion {
  id?: string;
  value?: string;
  order?: number;
}

export interface IFormSkill {
  value?: string;
  id?: string;
  grades?: IFormGrade[];
  questions?: IFormQuestion[];
  levels?: IFormLevel[];
  order?: number;
}

export interface IFormSkillGroup {
  id?: string;
  value?: string;
  skills?: IFormSkill[];
  order?: number;
}

export interface IFormHardSkillsMatrix {
  id?: string;
  position?: IFormPosition;
  skillGroups?: IFormSkillGroup[];
}
