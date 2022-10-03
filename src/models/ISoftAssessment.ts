import { NullableField } from './TNullableField';

export interface ISoftSkill {
  id: string;
  value: string;
  softSkillScoreId: string;
  comment: string;
  questions?: Array<{ id: string; value: string }>;
  soft_skill_id: { id: string; value: string };
}

export interface ISoftAssessment {
  id?: string;
  employeeId: string;
  positionId?: string;
  levelId?: string;
  comment?: string;
  softSkills: Array<ISoftSkill>;
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
}
