import { IDBPosition } from './IUser';

export interface IFormPosition {
  id?: string;
  name?: string;
}

export interface IQuestion {
  id?: string;
  value: string;
}

export interface ISkill {
  value: string;
  id?: string;
  questions: IQuestion[];
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
  currentMatrix: IHardSkillsMatrix;
  isLoading: boolean;
}

export interface ICopyHardSkillsMatrixProps {
  positionId: string;
  hardSkillMatrixId: string;
}

export interface IFormQuestion {
  id?: string;
  value?: string;
}

export interface IFormSkill {
  value?: string;
  id?: string;
  questions?: IFormQuestion[];
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
