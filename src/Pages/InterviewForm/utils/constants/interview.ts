import { LevelTypesEnum } from 'models/IInterview';

export const levelTypes: { [key in LevelTypesEnum]: string } = {
  [LevelTypesEnum.None]: 'None',
  [LevelTypesEnum.Basic]: 'Basic',
  [LevelTypesEnum.Regular]: 'Regular',
  [LevelTypesEnum.Advanced]: 'Advanced',
};

export const levelTypesPriority: { [key in LevelTypesEnum]: number } = {
  [LevelTypesEnum.None]: 1,
  [LevelTypesEnum.Basic]: 2,
  [LevelTypesEnum.Regular]: 3,
  [LevelTypesEnum.Advanced]: 4,
};
