import { LevelTypesEnum } from 'models/IInterview';

export const levelTypes: { [key in LevelTypesEnum]: string } = {
  [LevelTypesEnum.None]: 'None',
  [LevelTypesEnum.Basic]: 'Basic',
  [LevelTypesEnum.Expert]: 'Expert',
  [LevelTypesEnum.Advanced]: 'Advanced',
};
