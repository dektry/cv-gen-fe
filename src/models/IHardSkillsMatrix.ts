import { IDBPosition } from './IUser';

export interface IFormPosition {
  id?: string;
  name?: string;
}

export interface IQuestion {
  id?: string;
  value: string;
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
  id?: string;
  currentLevel?: string;
  questions: IQuestion[];
  levels: ILevel[];
}

export interface ISkillGroup {
  id?: string;
  value: string;
  skills: ISkill[];
}

export interface IHardSkillsMatrix {
  id?: string;
  position: IDBPosition;
  skillGroups: ISkillGroup[];
}

export interface IHardSkillsMatrixState {
  matrix: IHardSkillsMatrix[];
  currentMatrix: IFormHardSkillsMatrix;
  hardSkillMatrixLoading: boolean;
  isAssessmentPage: boolean;
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
}

export interface IFormSkill {
  value?: string;
  id?: string;
  grades?: IFormGrade[];
  questions?: IFormQuestion[];
  levels?: IFormLevel[];
}

export interface IFormSkillGroup {
  id?: string;
  value?: string;
  skills?: IFormSkill[];
}

export interface IFormHardSkillsMatrix {
  id?: string;
  position?: IFormPosition;
  skillGroups?: IFormSkillGroup[];
}
