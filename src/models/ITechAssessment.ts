import { IDBLevels, IDBPosition } from './IUser';
import { IEmployee } from './IEmployee';

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
  chosenPosition?: string;
  chosenLevel?: string;
  skillId?: string;
}