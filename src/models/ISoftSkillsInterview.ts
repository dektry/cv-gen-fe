export interface ISoftSkillScore {
  id: string;
  key: string;
  value: string;
  title: string;
}

interface ISoftSkillID {
  id: string;
  value: string;
  comment: string;
  question: string;
  score: ISoftSkillScore
}

export interface ISoftSkill {
  id?: string;
  value: string;
  question?: string;
  comment?: string;
  score?: ISoftSkillScore;
  softSkillScoreId?: string;
}

export interface ISoftSkillFromDB {
  comment?: string;
  softSkillScoreId?: string;
  soft_skill_id: ISoftSkillID;
}

export interface IPositionOrLevel {
  id?: string;
  name?: string;
}

export interface ISoftSkillInterview {
  hobby?: string;
  comment?: string;
  candidateId?: string;
  softSkills?: ISoftSkill[];
  successfullySaved?: boolean;
}

export interface ISoftSkillsInterviewState {
  isLoading: boolean;
  softSkillsList: ISoftSkill[] | [];
  scores: ISoftSkillScore[] | [];
  softskillsInterview: ISoftSkillInterview;
}
