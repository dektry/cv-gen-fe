import { IDBLevels, IDBPosition } from './IUser';
import { IEmployee } from './IEmployee';
import { IInterviewAnswers, IInterviewQuestion, LevelTypesEnum, IInterviewResultAnswers } from './IInterview';
import { NullableField } from './TNullableField';

export interface IAssessmentEmployee {
  employee: IEmployee;
  level: IDBLevels;
  position: IDBPosition;
}

export interface IAssessmentFromDB {
  id: string;
  createdAt: string;
  level: IDBLevels;
  position: IDBPosition;
  type: 'Assessment';
  answers?: IInterviewResultAnswers[];
  comment?: string;
}

export interface IAssessmentHistoryRecord {
  id: string;
  created: string;
  updated: string;
  level: string;
  position: string;
  type: 'Assessment' | 'Interview';
}

export interface ITechAssessmentState {
  assessments: IAssessmentFromDB[];
  assessmentsHistory: IAssessmentHistoryRecord[];
  isLoading: boolean;
  pageSize: number;
  currentPage: number;
  chosenPosition?: string;
  chosenLevel?: string;
  skillId?: string;
  assessmentResult: NullableField<IAssessmentFromDB>;
}

export interface ICompleteAssessment {
  id?: string;
  employeeId: NullableField<string>;
  levelId?: string;
  positionId?: string;
  answers: IInterviewAnswers;
  comment?: string;
}

export interface IAssessmentSkillGroup {
  uuid: string;
  position_id: string;
  value: string;
  skills: IAssessmentSkill[];
}

export type IAssessmentMatrix = IAssessmentSkillGroup[];

export interface IAssessmentSkill {
  id?: string;
  value: string;
  questions: IInterviewQuestion[];
  levels: Array<{ value: LevelTypesEnum; id?: string; name?: string }>;
}

export interface IExtendEventTarget extends EventTarget {
  id: string;
}
export interface IExtendElement extends React.MouseEvent<HTMLDivElement> {
  target: IExtendEventTarget;
}

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
