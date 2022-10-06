import { IDBPosition, IDBLevels } from './IUser';
import { NullableField } from './TNullableField';
import { ISoftSkillScore } from './ISoftSkillsInterview';

export interface IQuestion {
  id: string;
  value: string;
}

export interface ISoftSkill {
  id: string;
  value: string;
  score: ISoftSkillScore;
  comment: string;
  questions: IQuestion[];
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
  successfullySaved: boolean;
}

export interface ISoftAssessmentState {
  assessments: ISoftAssessment[] | [];
  softSkillsList: ISoftSkill[] | [];
  scores: ISoftSkillScore[] | [];
  isLoading: boolean;
  pageSize: number;
  currentPage: number;
  chosenPosition?: string;
  chosenLevel?: string;
  skillId?: string;
  assessmentResult: NullableField<ISoftAssessment>;
  currentAssessment: NullableField<ISoftAssessment>;
}
