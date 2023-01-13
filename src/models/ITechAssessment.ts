import { IDBLevels, IDBPosition } from './IUser';
import { IEmployee } from './IEmployee';
import { IInterviewAnswers, IInterviewQuestion, LevelTypesEnum } from './IInterview';
import { NullableField } from './TNullableField';
import { IAssessmentHistoryRecord, IAssessmentFromDB, IAssessmentsComparison } from './ICommon';

export interface IAssessmentEmployee {
  employee: IEmployee;
  level: IDBLevels;
  position: IDBPosition;
}

export interface IAssessmentDetailedLevel {
  id?: string;
  value?: string;
  level_id?: {
    id?: string;
    name?: string;
  };
}

export interface IAssessmentDetailedSkill {
  id?: string;
  value?: string;
  levels?: IAssessmentDetailedLevel[];
  questions?: {
    id?: string;
    value?: string;
  }[];
  currentSkillLevel?: {
    id?: string;
    value?: string;
  };
}

export interface IAssessmentDetailedGroup {
  id: string;
  value: string;
  skills: IAssessmentDetailedSkill[];
}

export interface IAssessmentDetailedResult {
  id?: string;
  position?: IDBPosition;
  level?: IDBLevels;
  created: string;
  comment: string;
  skillGroups: IAssessmentDetailedGroup[];
}

export interface ITechAssessmentState {
  assessments: IAssessmentFromDB[];
  assessmentsHistory: IAssessmentHistoryRecord[];
  isLoading: boolean;
  isHistoryLoading: boolean;
  pageSize: number;
  currentPage: number;
  chosenPosition?: string;
  chosenLevel?: string;
  skillId?: string;
  assessmentResult: NullableField<IAssessmentDetailedResult>;
  assessmentShortResult: NullableField<IAssessmentFromDB>;
  assessmentsComparison: NullableField<IAssessmentsComparison>;
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

export interface IFormAssessmentResult {
  employeeId: string;
  positionId: string;
  levelId: string;
  grades: { value: string; skillId: string }[];
  comment: string;
}
