export interface ISoftSkill {
  isActive: boolean;
  id?: string;
  value: string;
  question?: string;
  comment?: string;
}
interface ISoftSkillID {
  id: string;
  value: string;
  comment: string;
}

export interface ISoftSkillFromDB {
  isActive: boolean;
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
  positionId: string;
  levelId: string;
  position?: IPositionOrLevel;
  level?: IPositionOrLevel;
  successfullySaved?: boolean;
}

export interface ISoftSkillsInterviewState {
  isLoading: boolean;
  softSkillsList: ISoftSkill[] | [];
  softskillsInterview: ISoftSkillInterview;
}
