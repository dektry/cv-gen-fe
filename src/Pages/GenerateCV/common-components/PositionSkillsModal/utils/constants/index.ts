import { LevelTypesEnum } from 'models/IInterview';

export const levelTypes: { [key in LevelTypesEnum]: string } = {
  [LevelTypesEnum.None]: 'None',
  [LevelTypesEnum.Novice]: 'Novice',
  [LevelTypesEnum.Basic]: 'Basic',
  [LevelTypesEnum.Intermediate]: 'Intermediate',
  [LevelTypesEnum.Advanced]: 'Advanced',
  [LevelTypesEnum.Expert]: 'Expert',
};
