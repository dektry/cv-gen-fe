import { IDBLevels, IDBPosition, IQuestion, ISkill, ISkillGroup } from './IUser';
import { IInterviewSkill, IInterviewSkillGroup, IInterviewQuestion, IInterviewMatrix, LevelTypesEnum } from './IInterview';
import { IEmployee } from './IEmployee';
import { NullableField } from './TNullableField';

export interface IAssessmentEmployee {
  employee: IEmployee,
  level: IDBLevels;
  position: IDBPosition;
}

export interface IAssessmentFromDB {
  id: string;
  createdAt: string;
  level: IDBLevels;
  position: IDBPosition;
  type: 'Assessment'
}

export interface ITechAssessmentState {
  assessments: IAssessmentFromDB[];
  isLoading: boolean;
  pageSize: number;
  currentPage: number;
}