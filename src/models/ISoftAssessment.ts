export interface ISoftSkill {
  id: string;
  value: string;
  softSkillScoreId: string;
  comment: string;
  questions?: Array<{ id: string; value: string }>;
  soft_skill_id: { id: string; value: string };
}

export interface ICompleteSoftAssessment {
  id?: string;
  employeeId: string;
  positionId?: string;
  levelId?: string;
  comment?: string;
  softSkills: Array<ISoftSkill>;
}
