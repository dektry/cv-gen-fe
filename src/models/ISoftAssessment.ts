import { IDBPosition, IDBLevels } from './IUser';
import { NullableField } from './TNullableField';
import { IAssessmentHistoryRecord, IAssessmentFromDB, IAssessmentsComparison } from './ICommon';

export interface ISoftSkillLevel {
  id: string;
  description: string;
  value: string;
  level_id: { id: string; value: string };
}

export interface IFormSoftSkillLevel {
  id?: string;
  description?: string;
  value?: string;
  level_id?: { id?: string; value?: string };
}

export interface ISoftSkill {
  id: string;
  value: string;
  currentLevel?: string;
  comment?: string;
  levels: ISoftSkillLevel[];
  currentSkillLevel?: {
    comment: string;
    id: string;
    value: string;
  };
}

export interface IFormSoftSkill {
  id?: string;
  value?: string;
  currentLevel?: string;
  comment?: string;
  levels?: IFormSoftSkillLevel[];
  currentSkillLevel?: {
    comment?: string;
    id?: string;
    value?: string;
  };
}

export interface ISoftAssessment {
  id: NullableField<string>;
  created: string;
  type: 'Assessment';
  employeeId: string;
  position?: IDBPosition;
  level?: IDBLevels;
  skills: Array<ISoftSkill>;
  chosenPosition?: string;
  chosenLevel?: string;
}

export interface ISoftAssessmentState {
  assessments: ISoftAssessment[] | [];
  softSkillsList: ISoftSkill[] | [];
  isLoading: boolean;
  pageSize: number;
  currentPage: number;
  chosenPosition?: string;
  chosenLevel?: string;
  skillId?: string;
  assessmentResult: NullableField<ISoftAssessment>;
  isHistoryLoading: boolean;
  assessmentsHistory: IAssessmentHistoryRecord[];
  assessmentShortResult: NullableField<IAssessmentFromDB>;
  assessmentsComparison: NullableField<IAssessmentsComparison>;
}

export interface IFormSoftAssessmentResult {
  employeeId: string;
  positionId: string;
  levelId: string;
  grades: { gradeId: string; value: string; comment: string; skillId: string }[] | undefined;
}
