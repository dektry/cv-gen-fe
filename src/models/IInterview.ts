import {
  IDBLevels,
  IDBPosition,
  IQuestion,
  ISkill,
  ISkillGroup,
} from './IUser';
import { ICandidate, ICandidateTable } from './ICandidate';
import { NullableField } from './TNullableField';

export interface IInterviewState {
  isLoading: boolean;
  interviewMatrix: IInterviewMatrix;
  candidate: NullableField<ICandidate>;
  chosenPosition?: string;
  chosenLevel?: string;
  interviewResult: NullableField<IInterviewResult>;
  skillId?: string;
}

export interface IInterviewQuestion extends Omit<IQuestion, 'uuid'> {
  id: string;
}

export interface IInterviewSkill
  extends Omit<ISkill, 'uuid' | 'questions' | 'levels'> {
  id: string;
  questions: IInterviewQuestion[];
  levels: Array<{ value: LevelTypesEnum }>;
}

export interface IInterviewSkillGroup
  extends Omit<ISkillGroup, 'uuid' | 'skills' | 'position_id'> {
  id: string;
  skills: IInterviewSkill[];
}

export type IInterviewMatrix = IInterviewSkillGroup[];

export enum LevelTypesEnum {
  None = 'None',
  Basic = 'Basic',
  Regular = 'Regular',
  Advanced = 'Advanced',
}

export interface IInterviewAnswers {
  [key: string]: LevelTypesEnum;
}

export interface ICompleteInterview {
  candidateId: string | undefined;
  levelId: string;
  positionId: string;
  comment?: string;
  isOffered?: boolean;
  answers: IInterviewAnswers;
}

export interface IInterviewCandidate {
  candidate: ICandidateTable;
  createdAt: string;
  id: string;
  result: number;
  level: IDBLevels;
  position: IDBPosition;
}

export interface IInterviewResultAnswers {
  desired: LevelTypesEnum;
  actual: LevelTypesEnum;
  skill: string;
  id: string;
}

export interface IInterviewResult extends IInterviewCandidate {
  answers: IInterviewResultAnswers[];
  comment?: string;
  isOffered?: boolean;
}
