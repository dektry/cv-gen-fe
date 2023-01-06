import { LevelTypesEnum } from 'models/IInterview';

export function pickStartLevel() {
  const levelsOptions = Object.values(LevelTypesEnum).map((level) => level);

  return levelsOptions[0];
}
