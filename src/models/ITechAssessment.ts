import { IDBLevels, IDBPosition } from './IUser';
import { IEmployee } from './IEmployee';
import { IInterviewAnswers } from './IInterview';
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
  type: 'Assessment',
  answers?: IInterviewAnswers
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
}
