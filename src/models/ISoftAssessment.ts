import { IDBPosition, IDBLevels } from './IUser';
import { NullableField } from './TNullableField';
import { IAssessmentHistoryRecord, IAssessmentFromDB } from './ICommon';

export interface ISoftSkill {
  id: string;
  value: string;
  softSkillScoreId: string;
  comment: string;
  questions?: Array<{ id: string; value: string }>;
  soft_skill_id: { id: string; value: string };
}

export interface ISoftAssessment {
  id: NullableField<string>;
  createdAt: string;
  type: 'Assessment';
  employeeId: string;
  position?: IDBPosition;
  level?: IDBLevels;
  comment?: string;
  softSkills: Array<ISoftSkill>;
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
}
