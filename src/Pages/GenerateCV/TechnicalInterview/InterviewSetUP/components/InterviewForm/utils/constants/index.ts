import { LevelTypesEnum } from 'models/IInterview';

export const levelTypes: { [key in LevelTypesEnum]: string } = {
  [LevelTypesEnum.None]: 'None',
  [LevelTypesEnum.Novice]: 'Novice',
  [LevelTypesEnum.Basic]: 'Basic',
  [LevelTypesEnum.Intermediate]: 'Intermediate',
  [LevelTypesEnum.Expert]: 'Expert',
  [LevelTypesEnum.Advanced]: 'Advanced',
};

export const levelTypesPriority: { [key in LevelTypesEnum]: number } = {
  [LevelTypesEnum.None]: 1,
  [LevelTypesEnum.Novice]: 2,
  [LevelTypesEnum.Basic]: 3,
  [LevelTypesEnum.Intermediate]: 4,
  [LevelTypesEnum.Advanced]: 5,
  [LevelTypesEnum.Expert]: 6,
};

export const INTERVIEW = {
  TITLE: 'Tech Interview',
  START: 'Start tech interview',
  FINISH: 'Finish tech interview',
  START_EDIT: 'Edit skills',
  STOP_EDIT: 'Disable edit',
  SAVE_CHANGES: 'Save changes',
  LEVEL_PLACEHOLDER: 'Choose level',
  POSITION_PLACEHOLDER: 'Choose position',
  SUMMARY_RESULT: 'Summary',
  CANDIDATE: 'Candidate: ',
  INTERVIEW: 'Interview: ',
  POSITION: 'Position: ',
  LEVEL: 'Level: ',
  CHANGE_SKILL_MATRIX: 'Change skill matrix',
};
