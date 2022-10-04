import { IDBLevels, IDBPosition } from './IUser';
import { IEmployee } from './IEmployee';
import { IInterviewAnswers, IInterviewQuestion, LevelTypesEnum } from './IInterview';
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
  answers?: IInterviewAnswers;
  comment?: string;
}

export interface ITechAssessmentState {
  assessments: IAssessmentFromDB[];
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
